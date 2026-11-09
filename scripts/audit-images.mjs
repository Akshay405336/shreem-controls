import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(e.name)) continue;
      walk(p, acc);
    } else {
      acc.push(p);
    }
  }
  return acc;
}

const codeFiles = walk(path.join(root, "src")).filter((f) =>
  /\.(tsx?|jsx?|mjs|css)$/.test(f),
);

const re =
  /(?:['"`])(\/(?:images|logo)\/[^'"`\s?#]+?\.(?:png|jpe?g|webp|avif|gif|svg))(?:['"`])|(?:url\(\s*['"]?)(\/(?:images|logo)\/[^'"\s)]+?\.(?:png|jpe?g|webp|avif|gif|svg))/gi;

const refs = new Map();
for (const f of codeFiles) {
  const t = fs.readFileSync(f, "utf8");
  let m;
  while ((m = re.exec(t))) {
    const src = m[1] || m[2];
    if (!refs.has(src)) refs.set(src, []);
    refs.get(src).push(path.relative(root, f).replaceAll("\\", "/"));
  }
}

const publicAssets = [];
function walkPub(dir, base = "") {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = `${base}/${e.name}`.replaceAll("\\", "/");
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkPub(p, rel);
    else if (/\.(png|jpe?g|webp|avif|gif|svg|ico)$/i.test(e.name)) publicAssets.push(rel);
  }
}
walkPub(path.join(root, "public"));

const pubSet = new Set(publicAssets);
const missing = [];
const present = [];
for (const [src, files] of [...refs.entries()].sort()) {
  const entry = { src, count: files.length, files: [...new Set(files)] };
  if (pubSet.has(src)) present.push(entry);
  else missing.push(entry);
}

const unused = publicAssets
  .filter((a) => !refs.has(a) && !a.startsWith("/file") && !a.startsWith("/globe") && !a.startsWith("/next") && !a.startsWith("/vercel") && !a.startsWith("/window"))
  .sort();

console.log(
  JSON.stringify(
    {
      totalRefOccurrences: [...refs.values()].reduce((a, b) => a + b.length, 0),
      uniqueRefs: refs.size,
      publicAssets: publicAssets.length,
      missing,
      present: present.map((p) => p.src),
      unusedInCode: unused,
    },
    null,
    2,
  ),
);
