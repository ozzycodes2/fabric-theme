import { parse } from "yaml";
import { contrast, deriveBright, parseHex } from "./color.ts";
import type { Color } from "./color.ts";

export type Variant = { slug: "dusk" | "dawn"; id: string; name: string; appearance: "dark" | "light" };
export type Role = { slug: string; name: string; use: string; dusk: Color; dawn: Color };
export type Palette = { version: string; variants: Variant[]; ui: Role[]; terminal: Role[] };

const SLUGS = ["dusk", "dawn"] as const;
const UI = [
  "primary", "on-primary", "primary-hover", "primary-focus",
  "ink", "ink-muted", "ink-subtle",
  "canvas", "surface-1", "surface-2", "surface-3", "surface-4",
  "hairline", "hairline-strong", "hairline-tertiary",
  "inverse-canvas", "inverse-ink",
];
const DECLARED = ["black", "red", "green", "yellow", "blue", "magenta", "cyan", "white", "bright-black", "bright-white"];
const DERIVED = ["red", "green", "yellow", "blue", "magenta", "cyan"];
const TERMINAL = [
  ...DECLARED.slice(0, 8), "bright-black",
  ...DERIVED.map((s) => `bright-${s}`), "bright-white",
];

const title = (slug: string) => slug.replace(/(^|-)(\w)/g, (_, d, c) => (d ? " " : "") + c.toUpperCase());

type Doc = {
  themes: Record<string, Record<string, string>>;
  terminal: Record<string, Record<string, string>>;
  uses: Record<string, string>;
};

function section(doc: Doc, group: "themes" | "terminal", variant: string, keys: string[]) {
  const src = doc[group]?.[variant];
  const out: Record<string, Color> = {};
  for (const key of keys) {
    if (src?.[key] === undefined) throw new Error(`${group}.${variant}: missing ${key}`);
    out[key] = parseHex(src[key], `${group}.${variant}.${key}`);
  }
  return out;
}

export function parseDesign(markdown: string, version: string): Palette {
  const m = /^---\n([\s\S]*?)\n---/.exec(markdown);
  if (!m) throw new Error("DESIGN: missing YAML front matter");
  const doc = parse(m[1]) as Doc;

  for (const slug of [...UI, ...DECLARED]) {
    if (!doc.uses?.[slug]) throw new Error(`uses: missing ${slug}`);
  }

  const ui = {} as Record<(typeof SLUGS)[number], Record<string, Color>>;
  const term = {} as typeof ui;
  for (const v of SLUGS) {
    ui[v] = section(doc, "themes", v, UI);
    term[v] = section(doc, "terminal", v, DECLARED);
    for (const base of DERIVED) {
      term[v][`bright-${base}`] = parseHex(
        deriveBright(term[v][base].hex, v, ui[v].canvas.hex),
        `terminal.${v}.bright-${base}`,
      );
    }
  }

  const role = (slug: string, set: typeof ui, useKey: string): Role => ({
    slug,
    name: title(slug),
    use: doc.uses[useKey],
    dusk: set.dusk[slug],
    dawn: set.dawn[slug],
  });

  return {
    version,
    variants: [
      { slug: "dusk", id: "fabric-dusk", name: "Fabric Dusk", appearance: "dark" },
      { slug: "dawn", id: "fabric-dawn", name: "Fabric Dawn", appearance: "light" },
    ],
    ui: UI.map((s) => role(s, ui, s)),
    terminal: TERMINAL.map((s) => role(s, term, DERIVED.includes(s.slice(7)) ? s.slice(7) : s)),
  };
}

const MIN = 4.5;

export function checkContrast(p: Palette): string[] {
  const out: string[] = [];
  for (const { slug: variant } of p.variants) {
    const ui = (s: string) => p.ui.find((r) => r.slug === s)![variant].hex;
    const check = (role: Role, surface: string, bg: string) => {
      const fg = role[variant].hex;
      const ratio = contrast(fg, bg);
      if (ratio < MIN) {
        out.push(`${role.slug} (${variant}): ${fg} on ${surface} ${bg} is ${ratio.toFixed(2)}:1, needs ${MIN}:1`);
      }
    };
    const canvas = ui("canvas");
    for (const r of p.terminal.slice(1)) check(r, "canvas", canvas);
    for (const slug of ["ink", "ink-muted", "ink-subtle"]) {
      const r = p.ui.find((x) => x.slug === slug)!;
      check(r, "canvas", canvas);
      for (let i = 1; i <= 4; i++) check(r, `surface-${i}`, ui(`surface-${i}`));
    }
  }
  return out;
}
