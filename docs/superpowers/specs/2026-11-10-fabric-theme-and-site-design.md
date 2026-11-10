# Fabric theme and site — design

## Intent

Fabric is a personal design system (`design-preview/systems/DESIGN-fabric.md`)
built after the colour discipline of Dieter Rams' Braun products: near-neutral
grounds, one signal orange `#ef6306`, colour only where it signals. This
project turns it into a theme ecosystem modelled on Rosé Pine
(`github.com/rose-pine`, `rosepinetheme.com`): a brand hub repo, one repo per
app port, and a site that lists the ports and documents the palette.

The site uses the stack of the author's reference sites (rauno.me and
itsjay.us run Next.js on Vercel) because the author's own future personal site
will follow those sites and may link to or reuse parts of this one.

Success for the first release: any Ghostty user can find Fabric on the site,
download the theme, and switch between dusk and dawn automatically with their
OS appearance.

## Goals

- A theme hub repo holding the canonical palette and brand assets.
- A Ghostty port, the first and only port in this release.
- A site with Rosé Pine's flow: home → themes → palette → create → submit.
- New ports appear on the site without editing the site.

## Non-goals

- Translations. English only, no locale routing.
- A Bloom-style generator CLI. Comes with the second port.
- Submitting Fabric to iTerm2-Color-Schemes (which would make it built into
  Ghostty). Later.
- Photography and "Made with" collections.
- A GitHub organisation. Repos live on the author's account and migrate later.

## Anti-goals

- A second chroma in the UI. The terminal palette exists for ports only; no
  site component may use it except the palette page that documents it.
- Two hand-maintained copies of the palette. Rosé Pine keeps one in the site
  and one in Bloom's Go source; Fabric has one source.
- Accent-coloured text. `#ef6306` is 3.06:1 on the dawn canvas; it is a fill,
  edge, ring or underline, never type (see `DESIGN-fabric.md` → Accent).

## Decided

### Naming

- Variants are **dusk** (the existing `dark` theme) and **dawn** (the existing
  `light` theme). The words `dark` and `light` do not appear in tokens, file
  names, or UI copy. They appear only where a host app's syntax requires them,
  e.g. Ghostty's `theme = dark:fabric-dusk,light:fabric-dawn`.

### Repos

All public, on GitHub user `ozzycodes2`:

| Repo | Role | Rosé Pine analogue |
|---|---|---|
| `fabric-theme` | Brand hub: canonical `DESIGN-fabric.md`, generated `dist/palette.json`, logo, README, MIT license | `rose-pine-theme` |
| `fabric-site` | The website | `rose-pine-site` |
| `fabric-ghostty` | The Ghostty port | `rose-pine/ghostty` |

The repos migrate to an organisation later. GitHub redirects transferred
repos, so links keep working; the site's discovery owner is one constant.

### Terminal palette

A new `terminal` group in `DESIGN-fabric.md`, separate from the UI roles,
values per variant. Chosen direction: "Braun catalogue" — red, yellow and
green from Braun signal colours; blue, magenta and cyan from the 1970s colour
products (KF 20, HLD dryers), held below the signal hues' saturation.

| ANSI | Source | Dusk | Dawn |
|---|---|---|---|
| 0 black | `surface-3` / `surface-4` | `#18191a` | `#dbdbdb` |
| 1 red | record red | `#e04a3c` | `#b02f24` |
| 2 green | olive pilot green | `#8db05a` | `#4a6f1f` |
| 3 yellow | ET 66 "=" key | `#f0b92a` | `#8a5f00` |
| 4 blue | KF 20 lacquer blue | `#6f93c0` | `#2f5a8f` |
| 5 magenta | dusty rose | `#c08a9a` | `#8a4a5c` |
| 6 cyan | sage teal | `#6aaea6` | `#22665f` |
| 7 white | `ink-muted` | `#d0d6e0` | `#4d4d4d` |
| 8 bright black | `ink-subtle` | `#8a8f98` | `#606060` |
| 15 bright white | `ink` | `#f7f8f8` | `#171717` |

- On dawn, "black" is a light surface and "white" is ink, so text a program
  prints in `white` stays legible. Rosé Pine Dawn uses the same convention.
- Background is `canvas`, foreground is `ink`. Cursor is `primary`, cursor
  text `on-primary`. Selection is `primary` with `on-primary` text, matching
  Fabric's `selection` component.
- Every ANSI colour 1–15 clears 4.5:1 on its variant's canvas. ANSI 0 is
  exempt (it is a background tone by design).

### Palette source of truth

`fabric-theme/DESIGN-fabric.md` is canonical. A build script in `fabric-theme`
parses its front matter and emits `dist/palette.json` (both variants, UI roles
and terminal group, hex/rgb/hsl per colour). Ports and the site consume
`palette.json`; nothing else re-declares colour values.

- The front matter's `themes.dark` / `themes.light` keys become
  `themes.dusk` / `themes.dawn`. `design-preview/build.py` reads theme names
  generically, so its copy keeps working.
- `terminal` is a top-level front-matter map keyed `dusk` / `dawn`.
- Every UI role and terminal colour gets a short `use:` line in the front
  matter, written in dusk/dawn terms and carried into `palette.json`. The
  palette pages show it. The document's body prose is not UI copy and is
  left as written.
- `fabric-theme` releases are tagged. Ports pin a tag; the site's sync job
  copies `palette.json` from the latest tag, never from `main`, so the site
  never shows values no released port ships.

`design-preview/systems/DESIGN-fabric.md` is the origin; after this project it
is a copy of the canonical file. Pointing `design-preview` at the canonical
file is out of scope.

### Ghostty port

- `template/fabric` with `$token` placeholders, Bloom-style
  (`$canvas`, `$ink`, `$terminal.red`, `$id`, `$name`).
- A build script substitutes from `palette.json` at a pinned `fabric-theme`
  tag and writes `dist/fabric-dusk` and `dist/fabric-dawn`.
- README follows the Rosé Pine port format: install (copy `dist/*` to
  `~/.config/ghostty/themes/`, then
  `theme = dark:fabric-dusk,light:fabric-dawn`), a gallery with one screenshot
  per variant, thanks, and how it was built.

### Site

- **Stack:** Next.js (latest stable, App Router), Tailwind CSS v4, TypeScript,
  pnpm, deployed on Vercel. Statically generated; the data it shows is
  committed to the repo.
- **Styled in Fabric:** the site's CSS custom properties come from
  `palette.json`, dusk and dawn following `prefers-color-scheme`, with a manual
  toggle. Type, radius, spacing and component rules from `DESIGN-fabric.md`
  apply. The site is the first thing wearing the theme.
- **Pages (Rosé Pine flow):**
  - Home: what Fabric is, the two variants, port count, links onward.
  - Themes: searchable directory with category filter; one page per port with
    install link, contributors and last update.
  - Palette: every UI role and terminal colour for both variants, copy as
    hex/rgb/hsl, a CSS export, and one page per colour stating its use.
  - Create: markdown guides — Create a port, Contributing, Code of Conduct.
  - Submit: `/new` redirects to a GitHub issue form in `fabric-site`.
- **Discovery:** a daily GitHub Action in `fabric-site` lists `ozzycodes2`
  public, non-archived repos with topic `fabric-theme`, reads each repo's
  `fabric.json` manifest (`{ "name": "Ghostty", "category": "terminal" }`),
  fetches contributors, writes one JSON file per port under the site's
  content directory, and commits. Personal accounts have no custom properties,
  which is why the manifest replaces them. The same job copies the latest
  `fabric-theme` `dist/palette.json`. Community ports outside the account are
  JSON files added by hand; the job only refreshes them.
- **Categories:** Rosé Pine's set — browser, editor, library, social, system,
  terminal.

### Quality

- Unit tests (Vitest) for the palette build, the Ghostty build, and the sync
  script, at 90% coverage of that code.
- A contrast test fails the palette build if any terminal colour 1–15 falls
  under 4.5:1 on its canvas, or any ink tier under 4.5:1 on any surface of its
  own variant (the claim `DESIGN-fabric.md` → Text makes).
- Dawn `ink-subtle` moves from `#616161` to `#606060`. `#616161` measures
  4.47:1 on dawn `surface-4` `#dbdbdb`, not the 4.50:1 the document states;
  `#606060` measures 4.54:1. The document's two mentions of the value and
  ratio are updated to match.

## Left to the builder

- Bright ANSI 9–14: one lightness step from each base colour (lighter on dusk,
  darker on dawn), held to 4.5:1.
- Visual layout of every site page, within Fabric's rules and the spirit of
  the reference sites. Show the home page as a mockup before building the
  rest.
- The logo: a placeholder wordmark is acceptable for the first release.
- The Vercel project name and default `*.vercel.app` domain.
- Build order, as a tracer bullet: `palette.json` → Ghostty dist → a site with
  home, palette and a themes list showing Ghostty, deployed → feedback → the
  remaining pages, sync job and submission form.
