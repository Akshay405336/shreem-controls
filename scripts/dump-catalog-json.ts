import { catalogProducts } from "../src/data/catalog/index";
import { writeFileSync } from "node:fs";

writeFileSync(
  "scripts/catalog-dump.json",
  JSON.stringify(catalogProducts, null, 2),
  "utf8",
);
console.log("Wrote", catalogProducts.length, "products");
