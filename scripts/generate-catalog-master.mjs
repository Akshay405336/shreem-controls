/**
 * One-off helper: reads compiled catalog via ts import is not available here.
 * This script is NOT part of runtime — used only if regenerating master from brand files.
 */
import fs from "fs";
import path from "path";

const brandFiles = ["akubela", "mdt", "theben", "moorgen", "basalte"];
const root = path.resolve("src/data/catalog");

console.log(
  "Use catalog-master.ts as the single source of truth. Brand shard files are deprecated.",
);
