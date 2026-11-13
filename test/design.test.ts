import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { checkContrast, parseDesign } from "../src/design.ts";

const doc = readFileSync(new URL("../DESIGN-fabric.md", import.meta.url), "utf8");
const real = parseDesign(doc, "0.1.0");

describe("parseDesign (real document)", () => {
  it("reads both variants", () => {
    expect(real.version).toBe("0.1.0");
    expect(real.variants).toEqual([
      { slug: "dusk", id: "fabric-dusk", name: "Fabric Dusk", appearance: "dark" },
      { slug: "dawn", id: "fabric-dawn", name: "Fabric Dawn", appearance: "light" },
    ]);
  });

  it("reads 17 ui roles and 16 ordered terminal roles", () => {
    expect(real.ui).toHaveLength(17);
    expect(real.terminal.map((r) => r.slug)).toEqual([
      "black", "red", "green", "yellow", "blue", "magenta", "cyan", "white",
      "bright-black", "bright-red", "bright-green", "bright-yellow",
      "bright-blue", "bright-magenta", "bright-cyan", "bright-white",
    ]);
    expect(real.ui.find((r) => r.slug === "ink-subtle")?.name).toBe("Ink Subtle");
    expect(real.ui.find((r) => r.slug === "surface-1")?.name).toBe("Surface 1");
    expect(real.terminal[8].name).toBe("Bright Black");
  });

  it("gives every role a use, bright colors inheriting their base", () => {
    for (const r of [...real.ui, ...real.terminal]) expect(r.use).not.toBe("");
    const red = real.terminal[1];
    expect(real.terminal[9].use).toBe(red.use);
    expect(real.terminal[9].dusk.hex).not.toBe(red.dusk.hex);
  });

  it("passes the contrast gate", () => {
    expect(checkContrast(real)).toEqual([]);
  });
});

describe("parseDesign (fixtures)", () => {
  it("throws when a role is missing", () => {
    const bad = doc.replace(/^( {4})hairline: "#cbcdd4"\n/m, "");
    expect(bad).not.toBe(doc);
    expect(() => parseDesign(bad, "0.1.0")).toThrow(/themes\.dawn: missing hairline/);
  });

  it("throws when a terminal color is missing", () => {
    const bad = doc.replace(/^( {4})cyan: "#22665f"\n/m, "");
    expect(() => parseDesign(bad, "0.1.0")).toThrow(/terminal\.dawn: missing cyan/);
  });

  it("throws naming the slug when a use is missing", () => {
    const bad = doc.replace(/^ {2}hairline-strong: ".*"\n/m, "");
    expect(bad).not.toBe(doc);
    expect(() => parseDesign(bad, "0.1.0")).toThrow(/uses: missing hairline-strong/);
  });

  it("throws without front matter", () => {
    expect(() => parseDesign("# nothing", "0.1.0")).toThrow(/front matter/);
  });

  it("reports a failing ink on the surface", () => {
    const bad = doc.replace('ink: "#f7f8f8"', 'ink: "#333333"');
    const msgs = checkContrast(parseDesign(bad, "0.1.0"));
    const m = msgs.find((s) => s.includes("ink") && s.includes("dusk"));
    expect(m).toBeDefined();
    expect(m).toContain("#333333");
    expect(m).toContain("canvas");
  });

  it("reports a failing terminal color", () => {
    const bad = doc.replace('red: "#e04a3c"', 'red: "#101010"');
    const msgs = checkContrast(parseDesign(bad, "0.1.0"));
    expect(msgs.some((s) => s.includes("red") && s.includes("dusk") && s.includes("#101010"))).toBe(true);
  });
});
