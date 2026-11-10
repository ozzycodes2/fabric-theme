import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { checkContrast, parseDesign } from "./design.ts";

const root = new URL("../", import.meta.url);

export function main(outDir = "dist"): void {
  const markdown = readFileSync(new URL("DESIGN-fabric.md", root), "utf8");
  const { version } = JSON.parse(readFileSync(new URL("package.json", root), "utf8"));
  const palette = parseDesign(markdown, version);
  const failures = checkContrast(palette);
  if (failures.length > 0) {
    for (const f of failures) console.error(f);
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "palette.json"), JSON.stringify(palette, null, "\t") + "\n");
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
