# Fabric first slice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the tracer bullet: canonical palette → Ghostty theme files → a locally served site with home, palette and a themes list showing Ghostty, then stop for feedback.

**Architecture:** `fabric-theme` parses the front matter of its canonical `DESIGN-fabric.md` into `dist/palette.json`, released by git tag. `fabric-ghostty` renders a `$token` template against a pinned `palette.json` into two Ghostty theme files. `fabric-site` is a statically generated Next.js app that vendors `palette.json`, derives its CSS custom properties from it, and lists ports from committed JSON files.

**Tech Stack:** Node 26 (runs `.ts` natively), TypeScript, pnpm 12, Vitest 5 with `@vitest/coverage-v8`, `yaml` 2.x, Next.js 16 (App Router), Tailwind CSS 4.

**Spec:** `fabric-theme/docs/superpowers/specs/2026-11-10-fabric-theme-and-site-design.md`

## Global Constraints

- Variant names are `dusk` and `dawn`. `dark`/`light` appear only where host syntax requires them (Ghostty `theme = dark:…,light:…`, CSS `prefers-color-scheme`, the `appearance` field consumed by host apps).
- Variant ids `fabric-dusk`, `fabric-dawn`; display names `Fabric Dusk`, `Fabric Dawn`.
- Accent `#ef6306` is shared by both variants and never sets text color.
- Every terminal color 1–15 ≥ 4.5:1 on its variant's canvas; every ink tier ≥ 4.5:1 on canvas and `surface-1`…`surface-4` of its own variant. Ratios are compared unrounded.
- Dawn `ink-subtle` is `#606060` (was `#616161`).
- Repos are public on GitHub user `ozzycodes2`: `fabric-theme`, `fabric-ghostty`, `fabric-site`. All repo paths below are under `~/personal/`.
- Commit messages: `<prefix>: <lowercase message>`, prefixes from the conventional set; no ticket prefix.
- Tests at ≥ 90% line and branch coverage on `src/` and `scripts/` of each repo (`vitest run --coverage` with thresholds set in `vitest.config.ts`).
- English only. No locale routing.

## Review Focus

1. **A front-matter hex that is shorthand, upper-case or malformed** (`#FFF`, `#EF6306`, `ef6306`). Expected: upper-case normalized to lower-case; anything not `#` + 6 hex digits fails the build with an error naming the token path. Pinned in Task 2.
2. **A variant missing a role the other declares.** Expected: the build fails naming the role and variant, rather than emitting `undefined` into `palette.json`. Pinned in Task 2.
3. **A reader whose OS is dawn but who chose dusk on a previous visit.** Expected: dusk paints on first frame with no flash; with JS disabled the site follows `prefers-color-scheme`. Pinned in Task 6.
4. **Copy-to-clipboard where the Clipboard API is unavailable or rejected.** Expected: no "Copied" confirmation; the value is selected for manual copy. Pinned in Task 7.
5. **A Ghostty theme with fewer than 16 palette entries or a leftover `$token`.** Expected: the build fails rather than writing a file Ghostty silently half-applies. Pinned in Task 4.

---

### Task 1: `fabric-theme` repo and canonical design document

**Files:**
- Create: `fabric-theme/DESIGN-fabric.md` (copy of `design-preview/systems/DESIGN-fabric.md`, then edited)
- Create: `fabric-theme/package.json`, `fabric-theme/vitest.config.ts`, `fabric-theme/tsconfig.json`, `fabric-theme/.gitignore`, `fabric-theme/LICENSE` (MIT, holder `Osniel Quintana`, 2026)

**Interfaces:**
- Produces: front-matter shape consumed by Task 2:

```yaml
themes:
  dusk: { <17 UI roles>: "#rrggbb" }
  dawn: { <17 UI roles>: "#rrggbb" }
terminal:
  dusk: { black, red, green, yellow, blue, magenta, cyan, white, bright-black, bright-white: "#rrggbb" }
  dawn: { same keys }
uses:
  <each UI role and each terminal key>: "<one line>"
```

- [ ] **Step 1:** `git init` in `fabric-theme` (the `docs/` folder already exists), add the config files. `package.json`: `"type": "module"`, `"version": "0.1.0"`, scripts `build: node src/build.ts`, `test: vitest run --coverage`; dev deps `vitest`, `@vitest/coverage-v8`, `typescript`, `@types/node`; dep `yaml`.
- [ ] **Step 2:** Copy the design document. Rename `themes.dark` → `themes.dusk`, `themes.light` → `themes.dawn`. Set dawn `ink-subtle` to `#606060` and update every prose mention of `#616161` and of its `4.50:1` ratio to `#606060` / `4.54:1`.
- [ ] **Step 3:** Add the `terminal` map with the spec's table values (bright-black dawn `#606060`). Bright red…cyan are derived in Task 2, not declared.
- [ ] **Step 4:** Add the `uses` map. UI roles: one line each distilled from the document's Colors section, in dusk/dawn terms. Terminal: `black` "Background tone for blocks and badges", `red` "Errors, deletions, failing tests", `green` "Success, additions, passing tests", `yellow` "Warnings, modified files", `blue` "Directories, links, info", `magenta` "Keywords, branches, special files", `cyan` "Hunks, types, secondary info", `white` "Secondary text", `bright-black` "Comments, hints, autosuggestions", `bright-white` "Emphasised text".
- [ ] **Step 5:** Add a short `## Terminal` section to the body stating the terminal palette is for ports only and documenting the bright-color rule from Task 2.
- [ ] **Step 6:** `pnpm install`; commit `docs: add canonical fabric design document`.

### Task 2: palette build with contrast gate

**Files:**
- Create: `fabric-theme/src/color.ts`, `fabric-theme/src/design.ts`, `fabric-theme/src/build.ts`
- Test: `fabric-theme/test/color.test.ts`, `fabric-theme/test/design.test.ts`, `fabric-theme/test/build.test.ts`

**Interfaces:**
- Consumes: Task 1 front-matter shape.
- Produces (`src/color.ts`):
  - `type Rgb = [number, number, number]`, `type Hsl = [number, number, number]` (degrees, percent, percent; integers)
  - `type Color = { hex: string; rgb: Rgb; hsl: Hsl }`
  - `parseHex(hex: string, path: string): Color` — throws `Error("<path>: expected #rrggbb, got <hex>")`
  - `contrast(a: string, b: string): number` — WCAG 2.x ratio, unrounded
  - `deriveBright(hex: string, variant: "dusk" | "dawn", canvas: string): string`
- Produces (`src/design.ts`):
  - `type Variant = { slug: "dusk" | "dawn"; id: string; name: string; appearance: "dark" | "light" }`
  - `type Role = { slug: string; name: string; use: string; dusk: Color; dawn: Color }`
  - `type Palette = { version: string; variants: Variant[]; ui: Role[]; terminal: Role[] }` — `terminal` has exactly 16 entries in ANSI order 0–15
  - `parseDesign(markdown: string, version: string): Palette`
  - `checkContrast(p: Palette): string[]` — one message per violation, empty when clean
- Produces (`src/build.ts`): writes `dist/palette.json` (tab-indented) or exits 1 printing `checkContrast` messages.
- Terminal slugs, in order: `black red green yellow blue magenta cyan white bright-black bright-red bright-green bright-yellow bright-blue bright-magenta bright-cyan bright-white`. Role `name` is title case of the slug with spaces (`Bright Black`, `Ink Subtle`, `Surface 1`).

- [ ] **Step 1: Write failing tests.**
  - `color.test.ts`: `parseHex("#EF6306","x").hex === "#ef6306"`; `parseHex("#ef6306","x").rgb` equals `[239, 99, 6]`; `parseHex("#fff","themes.dusk.ink")` throws `/themes\.dusk\.ink: expected #rrggbb/`; `contrast("#616161","#dbdbdb")` < 4.5 and `contrast("#606060","#dbdbdb")` > 4.5; `contrast("#171717","#ef6306")` ≈ 5.51 (`toBeCloseTo(5.51, 2)`); `deriveBright(red, "dusk", "#010102")` is lighter than its input and `deriveBright(red, "dawn", "#f8f8f8")` darker, both ≥ 4.5:1 on that canvas.
  - `design.test.ts`, against the real `DESIGN-fabric.md`: two variants with ids `fabric-dusk`/`fabric-dawn` and appearances `dark`/`light`; `ui.length === 17`; `terminal.length === 16` with slugs in the order above; every role has a non-empty `use`; `checkContrast` returns `[]`. Against inline fixtures: a dawn missing `hairline` throws `/themes\.dawn: missing hairline/`; a missing `uses` entry throws naming the slug; a dusk ink of `#333333` yields a `checkContrast` message containing `ink` and `dusk`.
  - `build.test.ts`: running `main(outDir)` on the real document writes `palette.json` whose `version` equals `package.json` version.
- [ ] **Step 2:** Run `pnpm test`; expect failures for missing modules.
- [ ] **Step 3:** Implement `color.ts`. `deriveBright`: shift HSL lightness by +8 (dusk) or −8 (dawn) points, then keep stepping 2 points in the same direction until contrast with `canvas` ≥ 4.5 or lightness hits 0/100.
- [ ] **Step 4:** Implement `design.ts` with `yaml`'s `parse` on the text between the leading `---` fences. Terminal 9–14 come from `deriveBright` on 1–6; 0, 7, 8, 15 are declared. Contrast rule: terminal 1–15 vs `canvas`; `ink`, `ink-muted`, `ink-subtle` vs `canvas` and `surface-1`…`surface-4`, per variant.
- [ ] **Step 5:** Implement `build.ts` exporting `main(outDir = "dist")`, run when invoked directly.
- [ ] **Step 6:** `pnpm test` passes with coverage ≥ 90%; `pnpm build` writes `dist/palette.json`.
- [ ] **Step 7:** Commit `feat: build palette.json from the design document` including `dist/palette.json`.

### Task 3: publish `fabric-theme` v0.1.0

**Files:**
- Create: `fabric-theme/README.md`, `fabric-theme/assets/wordmark.svg`, `fabric-theme/.github/ISSUE_TEMPLATE/config.yml`

- [ ] **Step 1:** README in the Rosé Pine hub format: wordmark, one-line description ("Braun-quiet color for the classy minimalist" is a placeholder the author may replace), links to Themes / Palette / Contributing on the site, a Resources list, a Contributing paragraph pointing at the site's submission form. Site links point at `https://github.com/ozzycodes2/fabric-site` until the site is hosted.
- [ ] **Step 2:** `wordmark.svg`: "fabric" set in Inter 600, `#171717`, with a 6px `#ef6306` square as the dot of the "i". Accent on an object, not on type.
- [ ] **Step 3:** Issue config: `blank_issues_enabled: false`, one contact link "Port submission" → `https://github.com/ozzycodes2/fabric-site/issues/new?template=port.yaml`.
- [ ] **Step 4:** Commit `docs: add readme, wordmark and issue config`.
- [ ] **Step 5:** `gh repo create ozzycodes2/fabric-theme --public --source ~/personal/fabric-theme --push --description "Braun-quiet color, in dusk and dawn"`; `git -C ~/personal/fabric-theme tag v0.1.0 && git -C ~/personal/fabric-theme push origin v0.1.0`.
- [ ] **Step 6:** Verify `curl -sf https://raw.githubusercontent.com/ozzycodes2/fabric-theme/v0.1.0/dist/palette.json | jq '.terminal | length'` prints `16`.

### Task 4: `fabric-ghostty`

**Files:**
- Create: `fabric-ghostty/template/fabric`, `fabric-ghostty/src/render.ts`, `fabric-ghostty/src/build.ts`, `fabric-ghostty/fabric.json`, `fabric-ghostty/README.md`, `fabric-ghostty/LICENSE`, config files as in Task 1
- Create (generated, committed): `fabric-ghostty/dist/fabric-dusk`, `fabric-ghostty/dist/fabric-dawn`
- Test: `fabric-ghostty/test/render.test.ts`, `fabric-ghostty/test/fixtures/palette.json` (copy of v0.1.0)

**Interfaces:**
- Consumes: `Palette` JSON shape from Task 2.
- Produces: `render(template: string, palette: Palette, variant: "dusk" | "dawn"): string`; `build.ts` with `PALETTE_TAG = "v0.1.0"`, fetching `https://raw.githubusercontent.com/ozzycodes2/fabric-theme/${PALETTE_TAG}/dist/palette.json` unless `--palette <path>` is passed.
- Template tokens: `$id`, `$name`, any UI role slug (`$canvas`), any terminal slug prefixed `term.` (`$term.bright-black`). Hex emitted with `#`.
- `fabric.json`: `{ "name": "Ghostty", "category": "terminal" }`.

- [ ] **Step 1:** Template, one line each: `palette = 0=$term.black` … `palette = 15=$term.bright-white`, `background = $canvas`, `foreground = $ink`, `cursor-color = $primary`, `cursor-text = $on-primary`, `selection-background = $primary`, `selection-foreground = $on-primary`. A leading `# $name` comment.
- [ ] **Step 2: Write failing tests:** rendering dusk from the fixture contains `background = #010102`, `palette = 1=#e04a3c`, `selection-foreground = #171717`; rendering dawn contains `palette = 8=#606060`; output has exactly 16 `palette =` lines; a template containing `$nope` throws `/unknown token \$nope/`; output ends with a single `\n`.
- [ ] **Step 3:** Run `pnpm test`; expect failure.
- [ ] **Step 4:** Implement `render` (token regex `\$[a-z][a-z0-9.-]*`, longest match) and `build.ts` (fails if any rendered file has ≠ 16 palette lines).
- [ ] **Step 5:** `pnpm test` passes at ≥ 90%; `pnpm build` writes both files.
- [ ] **Step 6:** Verify with Ghostty: for each file, `ghostty +validate-config --config-file=<tmp>` where `<tmp>` contains `theme = ~/personal/fabric-ghostty/dist/fabric-dusk` (absolute path). Expected: exit 0, no output.
- [ ] **Step 7:** README in the Rosé Pine port format: install (copy `dist/*` to `~/.config/ghostty/themes/`, then `theme = dark:fabric-dusk,light:fabric-dawn`, or one variant alone); Gallery heading with a note that screenshots follow; Thanks; Contributing with the exact build command.
- [ ] **Step 8:** Commit `feat: add ghostty theme for dusk and dawn`; `gh repo create ozzycodes2/fabric-ghostty --public --source ~/personal/fabric-ghostty --push --description "Fabric for Ghostty"`; `gh repo edit ozzycodes2/fabric-ghostty --add-topic fabric-theme --add-topic ghostty`.

### Task 5: home page mockup — feedback gate

- [ ] **Step 1:** In the brainstorming visual companion, show the home page in Fabric's tokens at desktop and mobile widths, dusk and dawn: wordmark, one-paragraph intro, the two variants as swatch strips, port count, links to Themes / Palette / Create. Layout in the spirit of rauno.me and itsjay.us: single column, generous whitespace, small type, no hero imagery.
- [ ] **Step 2:** Stop. Do not start Task 6 until the author approves or revises the mockup. Carry approved layout decisions into Tasks 6–7.

### Task 6: `fabric-site` scaffold, tokens and variant toggle

**Files:**
- Create: `fabric-site/` via `pnpm create next-app@latest fabric-site --ts --tailwind --app --src-dir --no-eslint --import-alias "@/*" --use-pnpm`
- Create: `fabric-site/data/palette.json` (copy of v0.1.0), `fabric-site/src/lib/palette.ts`, `fabric-site/src/lib/tokens.ts`, `fabric-site/src/components/variant-toggle.tsx`, `fabric-site/src/components/variant-script.tsx`
- Modify: `fabric-site/src/app/layout.tsx`, `fabric-site/src/app/globals.css`, `fabric-site/next.config.ts` (`output: "export"`)
- Test: `fabric-site/test/tokens.test.ts`, `fabric-site/test/variant-script.test.ts`

**Interfaces:**
- Consumes: `Palette` shape (re-declare the types in `src/lib/palette.ts`; do not import across repos).
- Produces: `palette: Palette` (typed import of `data/palette.json`); `tokensCss(p: Palette): string`; `<VariantScript />` and `<VariantToggle />`; `localStorage` key `fabric-variant` with values `"dusk" | "dawn"`; `data-variant` attribute on `<html>`.

- [ ] **Step 1: Write failing tests.** `tokensCss`: contains `--canvas: #010102` inside the dusk block and `--canvas: #f8f8f8` inside the dawn block; contains `--term-red`; has an `@media (prefers-color-scheme: light)` block applying dawn when `<html>` has no `data-variant`; `[data-variant="dusk"]` and `[data-variant="dawn"]` blocks override media. The variant script, evaluated in a stub with `localStorage` `fabric-variant=dusk` and a `matchMedia` reporting light, sets `data-variant="dusk"`; with storage empty it leaves the attribute unset; with `localStorage` throwing it leaves the attribute unset.
- [ ] **Step 2:** Run `pnpm vitest run`; expect failure.
- [ ] **Step 3:** Implement. `tokensCss` emits `--<ui-slug>` and `--term-<slug>` custom properties. `VariantScript` renders an inline `<script>` in `<head>` before paint. Tailwind v4 `@theme inline` in `globals.css` maps colors (`--color-canvas: var(--canvas)` …), radii, spacing and the eight type steps from `DESIGN-fabric.md`. Inter via `next/font/google` weights 400/500/600; mono stack `"SF Mono", ui-monospace, SFMono-Regular, Menlo, monospace`. Transitions 150ms `ease` on color/background only, inside `prefers-reduced-motion: no-preference`.
- [ ] **Step 4:** `pnpm vitest run --coverage` passes at ≥ 90% on `src/lib` and `src/components`; `pnpm build` succeeds.
- [ ] **Step 5:** Commit `feat: scaffold site with fabric tokens and variant toggle`.

### Task 7: home, palette and themes pages

**Files:**
- Create: `fabric-site/content/ports/ghostty.json`, `fabric-site/src/lib/ports.ts`, `fabric-site/src/lib/color-format.ts`, `fabric-site/src/components/copy-button.tsx`, `fabric-site/src/components/site-header.tsx`, `fabric-site/src/components/site-footer.tsx`
- Create: `fabric-site/src/app/page.tsx`, `fabric-site/src/app/palette/page.tsx`, `fabric-site/src/app/themes/page.tsx`
- Test: `fabric-site/test/ports.test.ts`, `fabric-site/test/color-format.test.ts`, `fabric-site/test/copy-button.test.tsx` (add `@testing-library/react` and `jsdom`)

**Interfaces:**
- Consumes: `palette`, `Role`, `Color` from Task 6.
- Produces: `type Port = { slug: string; type: "official" | "community"; name: string; url: string; category: string; tags: string[]; contributors: { name: string; url: string; image?: string }[]; updatedAt?: string }` — the same shape the later sync job writes; `getPorts(): Port[]` sorted by name; `formatColor(c: Color, f: "hex" | "rgb" | "hsl"): string` → `#ef6306`, `rgb(239 99 6)`, `hsl(24 95% 48%)`; `<CopyButton value label />`.
- `ghostty.json`: `type` `official`, `name` `Ghostty`, `url` `https://github.com/ozzycodes2/fabric-ghostty`, `category` `terminal`, `tags` `["ghostty"]`, contributors `[{ name: "ozzycodes2", url: "https://github.com/ozzycodes2" }]`.

- [ ] **Step 1: Write failing tests.** `getPorts()` returns Ghostty with `slug` `ghostty`; a port file missing `url` throws naming the file. `formatColor` returns the three strings above for the accent. `CopyButton`: with `navigator.clipboard.writeText` resolving, shows "Copied"; with it rejecting or absent, does not show "Copied" and selects the value text.
- [ ] **Step 2:** Run; expect failure.
- [ ] **Step 3:** Implement the libs and `CopyButton`.
- [ ] **Step 4:** Implement pages per the approved mockup. Home: as Task 5. Palette: per variant, UI roles grouped Accent / Surface / Structure / Text, then Terminal; each swatch shows name, `use`, hex/rgb/hsl with copy; a format toggle and a "Copy CSS" button for the whole variant. Themes: port count, category filter, list of `getPorts()` linking to each repo. Header nav Home / Themes / Palette with `<VariantToggle />`; footer with GitHub links. No component uses `--term-*` outside the palette page.
- [ ] **Step 5:** `pnpm vitest run --coverage` ≥ 90%; `pnpm build` succeeds; `pnpm start` (or serving `out/`) and checking `/`, `/palette`, `/themes` render in both variants.
- [ ] **Step 6:** Commit `feat: add home, palette and themes pages`.

### Task 8: publish and serve locally — feedback gate

No hosting in this slice.

- [ ] **Step 1:** `gh repo create ozzycodes2/fabric-site --public --source ~/personal/fabric-site --push --description "The Fabric theme site"`.
- [ ] **Step 2:** Site links in `fabric-theme/README.md` point at `https://github.com/ozzycodes2/fabric-site` until the site is hosted; commit `docs: point readme at the site repo` and push.
- [ ] **Step 3:** `pnpm --dir ~/personal/fabric-site build && pnpm --dir ~/personal/fabric-site dlx serve out -l 3000` in the background; confirm `/`, `/palette`, `/themes` return 200.
- [ ] **Step 4:** Stop for feedback. Out of this slice, for the next plan: hosting, per-port and per-color pages, Create guides, `/new` submission form, daily sync job, Ghostty screenshots.
