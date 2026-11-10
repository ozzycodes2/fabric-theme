import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { main } from "../src/build.ts";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
let dir = "";
afterEach(() => rmSync(dir, { recursive: true, force: true }));

describe("main", () => {
  it("writes palette.json with the package version", () => {
    dir = mkdtempSync(join(tmpdir(), "fabric-"));
    main(dir);
    const out = JSON.parse(readFileSync(join(dir, "palette.json"), "utf8"));
    expect(out.version).toBe(pkg.version);
    expect(out.ui).toHaveLength(17);
    expect(out.terminal).toHaveLength(16);
  });

  it("creates the output directory", () => {
    dir = mkdtempSync(join(tmpdir(), "fabric-"));
    main(join(dir, "nested"));
    expect(readFileSync(join(dir, "nested", "palette.json"), "utf8")).toContain("\t");
  });
});
