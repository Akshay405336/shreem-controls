/**
 * Lightweight, robust HTML sanitizer for blog rich-text content.
 * Strips dangerous tags, scripts, event handlers, and protocol exploits.
 */

const ALLOWED_TAGS = new Set([
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "strong", "b", "em", "i", "u", "s", "strike",
  "ul", "ol", "li",
  "blockquote", "pre", "code",
  "a", "span", "div",
  "table", "thead", "tbody", "tr", "th", "td",
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "title", "target", "rel", "class"]),
  span: new Set(["class"]),
  div: new Set(["class"]),
  p: new Set(["class"]),
  h1: new Set(["class"]),
  h2: new Set(["class"]),
  h3: new Set(["class"]),
  h4: new Set(["class"]),
  blockquote: new Set(["class"]),
  ul: new Set(["class"]),
  ol: new Set(["class", "start", "type"]),
  li: new Set(["class"]),
  table: new Set(["class"]),
  th: new Set(["class", "colspan", "rowspan", "align"]),
  td: new Set(["class", "colspan", "rowspan", "align"]),
};

function isSafeUrl(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  if (
    trimmed.startsWith("javascript:") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("vbscript:")
  ) {
    return false;
  }
  return (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("#")
  );
}

/**
 * Sanitizes rich text HTML for safe rendering.
 */
export function sanitizeBlogContent(html: string): string {
  if (!html) return "";

  // 1. Remove script, style, iframe, object, embed, applet tags and their contents
  let clean = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  clean = clean.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
  clean = clean.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");
  clean = clean.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "");
  clean = clean.replace(/<embed\b[^>]*>/gi, "");

  // 2. Parse tags and strip disallowed tags and attributes
  clean = clean.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (match, tagName: string, rawAttrs: string) => {
    const lowerTag = tagName.toLowerCase();

    // Check tag whitelist
    if (!ALLOWED_TAGS.has(lowerTag)) {
      return "";
    }

    // Closing tag
    if (match.startsWith("</")) {
      return `</${lowerTag}>`;
    }

    // Process attributes
    const allowedForTag = ALLOWED_ATTRS[lowerTag] || new Set();
    const sanitizedAttrs: string[] = [];

    // Parse attributes: attr="value" or attr='value' or bare attr
    const attrRegex = /([a-zA-Z0-9_-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    let attrMatch: RegExpExecArray | null;

    let hasTargetBlank = false;
    let hasRel = false;

    while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
      const attrName = attrMatch[1].toLowerCase();
      const attrVal = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "";

      // Reject all event handlers (onclick, onload, onerror, etc.)
      if (attrName.startsWith("on")) {
        continue;
      }

      // Check attribute whitelist
      if (!allowedForTag.has(attrName)) {
        continue;
      }

      // Special handling for href
      if (lowerTag === "a" && attrName === "href") {
        if (!isSafeUrl(attrVal)) {
          continue;
        }
        sanitizedAttrs.push(`href="${attrVal.replace(/"/g, "&quot;")}"`);
      } else if (lowerTag === "a" && attrName === "target") {
        if (attrVal === "_blank") {
          hasTargetBlank = true;
          sanitizedAttrs.push('target="_blank"');
        }
      } else if (lowerTag === "a" && attrName === "rel") {
        hasRel = true;
        sanitizedAttrs.push(`rel="${attrVal.replace(/"/g, "&quot;")}"`);
      } else if (attrName === "class") {
        // Sanitize class names to alphanumeric, spaces, and dashes
        const safeClass = attrVal.replace(/[^a-zA-Z0-9_\-\s]/g, "").trim();
        if (safeClass) {
          sanitizedAttrs.push(`class="${safeClass}"`);
        }
      } else {
        const safeVal = attrVal.replace(/"/g, "&quot;");
        sanitizedAttrs.push(`${attrName}="${safeVal}"`);
      }
    }

    // Enforce rel="noopener noreferrer" if target="_blank"
    if (lowerTag === "a" && hasTargetBlank && !hasRel) {
      sanitizedAttrs.push('rel="noopener noreferrer"');
    }

    const attrString = sanitizedAttrs.length > 0 ? " " + sanitizedAttrs.join(" ") : "";
    const isSelfClosing = ["br", "hr"].includes(lowerTag);
    return `<${lowerTag}${attrString}${isSelfClosing ? " />" : ">"}`;
  });

  return clean.trim();
}
