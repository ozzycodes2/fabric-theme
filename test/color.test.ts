import { describe, expect, it } from "vitest";
import { contrast, deriveBright, parseHex } from "../src/color.ts";

describe("parseHex", () => {
  it("lowercases and computes rgb and hsl", () => {
    const c = parseHex("#EF6306", "x");
    expect(c.hex).toBe("#ef6306");
    expect(c.rgb).toEqual([239, 99, 6]);
    expect(c.hsl).toEqual([24, 95, 48]);
  });

  it("handles greys and hue sectors", () => {
    expect(parseHex("#808080", "x").hsl).toEqual([0, 0, 50]);
    expect(parseHex("#00ff00", "x").hsl).toEqual([120, 100, 50]);
    expect(parseHex("#0000ff", "x").hsl).toEqual([240, 100, 50]);
    expect(parseHex("#ff0080", "x").hsl).toEqual([330, 100, 50]);
  });

  it("names the path on malformed input", () => {
    expect(() => parseHex("#fff", "themes.dusk.ink")).toThrow(/themes\.dusk\.ink: expected #rrggbb, got #fff/);
    expect(() => parseHex(12 as unknown as string, "p")).toThrow(/p: expected #rrggbb/);
  });
});

describe("contrast", () => {
  it("matches WCAG thresholds", () => {
    expect(contrast("#616161", "#dbdbdb")).toBeLessThan(4.5);
    expect(contrast("#606060", "#dbdbdb")).toBeGreaterThan(4.5);
    expect(contrast("#171717", "#ef6306")).toBeCloseTo(5.51, 2);
    expect(contrast("#000000", "#ffffff")).toBeCloseTo(21, 5);
  });
});

describe("deriveBright", () => {
  it("lightens on dusk", () => {
    const out = deriveBright("#e04a3c", "dusk", "#010102");
    expect(parseHex(out, "x").hsl[2]).toBeGreaterThan(parseHex("#e04a3c", "x").hsl[2]);
    expect(contrast(out, "#010102")).toBeGreaterThanOrEqual(4.5);
  });

  it("darkens on dawn", () => {
    const out = deriveBright("#b02f24", "dawn", "#f8f8f8");
    expect(parseHex(out, "x").hsl[2]).toBeLessThan(parseHex("#b02f24", "x").hsl[2]);
    expect(contrast(out, "#f8f8f8")).toBeGreaterThanOrEqual(4.5);
  });

  it("keeps stepping until contrast is met", () => {
    const out = deriveBright("#202020", "dusk", "#010102");
    expect(contrast(out, "#010102")).toBeGreaterThanOrEqual(4.5);
  });

  it("stops at the lightness limit", () => {
    expect(deriveBright("#808080", "dusk", "#ffffff")).toBe("#ffffff");
    expect(deriveBright("#808080", "dawn", "#000000")).toBe("#000000");
  });
});
