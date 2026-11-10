export type Rgb = [number, number, number];
export type Hsl = [number, number, number];
export type Color = { hex: string; rgb: Rgb; hsl: Hsl };

export function parseHex(hex: string, path: string): Color {
  if (typeof hex !== "string" || !/^#[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error(`${path}: expected #rrggbb, got ${hex}`);
  }
  const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
  return { hex: hex.toLowerCase(), rgb, hsl: rgbToHsl(rgb) };
}

function rgbToHsl([r8, g8, b8]: Rgb): Hsl {
  const [r, g, b] = [r8 / 255, g8 / 255, b8 / 255];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return [0, 0, Math.round(l * 100)];
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / d + 6) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [Math.round(h * 60) % 360, Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const lig = l / 100;
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return lig - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return "#" + [f(0), f(8), f(4)].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
}

function luminance(hex: string): number {
  const [r, g, b] = parseHex(hex, "luminance").rgb.map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// Bright variants move away from the canvas: lighter on dusk, darker on dawn.
export function deriveBright(hex: string, variant: "dusk" | "dawn", canvas: string): string {
  const [h, s, l] = parseHex(hex, "deriveBright").hsl;
  const dir = variant === "dusk" ? 1 : -1;
  let lightness = Math.min(100, Math.max(0, l + dir * 8));
  let out = hslToHex(h, s, lightness);
  while (contrast(out, canvas) < 4.5 && lightness > 0 && lightness < 100) {
    lightness = Math.min(100, Math.max(0, lightness + dir * 2));
    out = hslToHex(h, s, lightness);
  }
  return out;
}
