// Writes assets/wordmark*.svg and assets/mark*.svg as outlines, so no viewer
// needs Inter installed. Usage: pnpm logo path/to/InterVariable.ttf
// (rsms/inter's variable TTF; fontkit cannot instance the WOFF2 files).
// Geometry is the wordmark spec in DESIGN-fabric.md; colors come from
// dist/palette.json, so rerun after a palette change.
import * as fontkit from "fontkit";
import fs from "node:fs";
const [fontPath] = process.argv.slice(2);
if (!fontPath) throw new Error("usage: pnpm logo path/to/InterVariable.ttf");
const palette = JSON.parse(fs.readFileSync(new URL("../dist/palette.json", import.meta.url), "utf8"));
const ui = (slug, variant) => palette.ui.find((r) => r.slug === slug)[variant].hex;
const base = fontkit.openSync(fontPath);
const font = base.getVariation({ wght: 700, opsz: 32 });
const UPM = font.unitsPerEm, TRACK = -0.03 * UPM, SQ = 0.15 * UPM, SQ_TOP = 0.734 * UPM;
const ACCENT = ui("primary", "dusk");
const r = (n) => Math.round(n * 100) / 100;

function run(text) {
  const { glyphs, positions } = font.layout(text);
  let x = 0; const parts = [];
  glyphs.forEach((g, i) => { parts.push({ g, x, adv: positions[i].xAdvance }); x += positions[i].xAdvance + TRACK; });
  return { parts, width: x - TRACK };
}
// Glyph path in a y-down space with the baseline at y=0.
const pathOf = (g, dx) => g.path.translate(dx, 0).scale(1, -1).toSVG();

function wordmark(ink) {
  const { parts } = run("fabrıc");
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const p of parts) { const b = p.g.path.bbox; minX = Math.min(minX, p.x + b.minX); maxX = Math.max(maxX, p.x + b.maxX); minY = Math.min(minY, -b.maxY); maxY = Math.max(maxY, -b.minY); }
  const i = parts[4], sqX = i.x + i.adv / 2 - SQ / 2, sqY = -SQ_TOP;
  minY = Math.min(minY, sqY);
  const pad = 0.08 * UPM, vx = minX - pad, vy = minY - pad, vw = maxX - minX + 2 * pad, vh = maxY - minY + 2 * pad;
  const d = parts.map((p) => pathOf(p.g, p.x)).join("");
  const h = 100, w = Math.round((vw / vh) * h);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${r(vx)} ${r(vy)} ${r(vw)} ${r(vh)}" width="${w}" height="${h}" role="img" aria-label="fabric">
  <title>fabric</title>
  <path fill="${ink}" d="${d}"/>
  <rect fill="${ACCENT}" x="${r(sqX)}" y="${r(sqY)}" width="${r(SQ)}" height="${r(SQ)}"/>
</svg>
`;
}

// The f with the square at tittle height beside it, centred on a tile.
function mark({ ground, ink, radius }) {
  const f = font.glyphForCodePoint(0x66), b = f.path.bbox;
  const gap = 0.05 * UPM, sqX = b.maxX + gap, sqY = -SQ_TOP;
  const left = b.minX, right = sqX + SQ, top = Math.min(-b.maxY, sqY), bottom = -b.minY;
  const gw = right - left, gh = bottom - top, size = gh / 0.68, ox = (size - gw) / 2 - left, oy = (size - gh) / 2 - top;
  const d = f.path.translate(ox, 0).scale(1, -1).translate(0, oy).toSVG();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(size)} ${r(size)}" width="512" height="512" role="img" aria-label="fabric">
  <title>fabric</title>
  <rect fill="${ground}" width="${r(size)}" height="${r(size)}"${radius ? ` rx="${r(size * radius)}"` : ""}/>
  <path fill="${ink}" d="${d}"/>
  <rect fill="${ACCENT}" x="${r(sqX + ox)}" y="${r(sqY + oy)}" width="${r(SQ)}" height="${r(SQ)}"/>
</svg>
`;
}

// The mark always sits on the dusk tile: one icon that holds on light and dark
// browser chrome alike. mark-square is full-bleed for platforms that round it.
const out = new URL("../assets/", import.meta.url);
const tile = { ground: ui("canvas", "dusk"), ink: ui("ink", "dusk") };
fs.writeFileSync(new URL("wordmark.svg", out), wordmark(ui("ink", "dawn")));
fs.writeFileSync(new URL("wordmark-dusk.svg", out), wordmark(ui("ink", "dusk")));
fs.writeFileSync(new URL("mark.svg", out), mark({ ...tile, radius: 0.22 }));
fs.writeFileSync(new URL("mark-square.svg", out), mark({ ...tile, radius: 0 }));
