---
version: alpha
name: Fabric
description: "One system in two polarities. Mine's near-black ground and Mine v2's light ground are the same seventeen color roles at two sets of values, so a component is declared once and renders on either. The accent is the exception: all four of its roles are shared, replacing Mine's lavender and v2's signal red with one signal orange, #ff6a13. Both inherited accents were legible on both grounds, so the reason for one value is not contrast — it is that a brand hue which changes with the reader's OS setting is not one brand, and that is the only conflict in the merge neither source could settle. The orange is bright enough to carry dark text rather than white, which is why `{colors.on-primary}` is #171717 and why the accent is now a fill, an edge and a ring but never type. The component vocabulary is the union of both: Apple's pill CTAs, edge-to-edge product tiles and frosted sub-nav from Mine, v2's page, prose, rule, avatar and permanently-underlined link, with the four overlapping pairs collapsed to one entry each. Type is Mine's eight steps on Inter with v2's weights on the three display steps, since 500 was chosen for a dark ground and 600 has to survive both."
themes:
  dusk:
    primary: "#ff6a13"
    on-primary: "#171717"
    primary-hover: "#ff7422"
    primary-focus: "#de5100"
    ink: "#f7f8f8"
    ink-muted: "#d0d6e0"
    ink-subtle: "#8a8f98"
    canvas: "#010102"
    surface-1: "#0f1011"
    surface-2: "#141516"
    surface-3: "#18191a"
    surface-4: "#191a1b"
    hairline: "#23252a"
    hairline-strong: "#34343a"
    hairline-tertiary: "#3e3e44"
    inverse-canvas: "#ffffff"
    inverse-ink: "#000000"
  dawn:
    primary: "#ff6a13"
    on-primary: "#171717"
    primary-hover: "#ff7422"
    primary-focus: "#de5100"
    ink: "#171717"
    ink-muted: "#2c2c2c"
    ink-subtle: "#606060"
    canvas: "#eceef0"
    surface-1: "#f7f8f8"
    surface-2: "#e3e4e6"
    surface-3: "#e0e1e3"
    surface-4: "#dfe0e1"
    hairline: "#cbcdd4"
    hairline-strong: "#b8b8bf"
    hairline-tertiary: "#ababb3"
    inverse-canvas: "#171717"
    inverse-ink: "#ffffff"

terminal:
  dusk:
    black: "#18191a"
    red: "#e04a3c"
    green: "#8db05a"
    yellow: "#f0b92a"
    blue: "#6f93c0"
    magenta: "#c08a9a"
    cyan: "#6aaea6"
    white: "#d0d6e0"
    bright-black: "#8a8f98"
    bright-white: "#f7f8f8"
  dawn:
    black: "#dbdbdb"
    red: "#b02f24"
    green: "#4a6f1f"
    yellow: "#8a5f00"
    blue: "#2f5a8f"
    magenta: "#8a4a5c"
    cyan: "#22665f"
    white: "#2c2c2c"
    bright-black: "#606060"
    bright-white: "#171717"

uses:
  primary: "Accent fill for the CTA, emphasis edge, focus ring and selection; never type"
  on-primary: "Text and icons on a primary fill, the same near-black on dusk and dawn"
  primary-hover: "Primary fill while hovered, one step brighter"
  primary-focus: "Primary fill while pressed or focused, the deepest step"
  ink: "Headings and body text"
  ink-muted: "Secondary prose, unselected chips, code"
  ink-subtle: "Footer links, capsule labels, metadata"
  canvas: "Page ground: near-black on dusk, off-white on dawn"
  surface-1: "First lift off the canvas, for tiles and cards"
  surface-2: "Second surface step, for nested panels"
  surface-3: "Third surface step, for wells and inset blocks"
  surface-4: "Deepest surface step, for the strongest separation"
  hairline: "Default 1px border and divider"
  hairline-strong: "Border that needs more presence than a hairline"
  hairline-tertiary: "Strongest border, for controls and emphasis rules"
  inverse-canvas: "Ground for inverted bands: white on dusk, near-black on dawn"
  inverse-ink: "Text on an inverted band: black on dusk, white on dawn"
  black: "Background tone for blocks and badges"
  red: "Errors, deletions, failing tests"
  green: "Success, additions, passing tests"
  yellow: "Warnings, modified files"
  blue: "Directories, links, info"
  magenta: "Keywords, branches, special files"
  cyan: "Hunks, types, secondary info"
  white: "Secondary text"
  bright-black: "Comments, hints, autosuggestions"
  bright-white: "Emphasised text"

typography:
  display:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: -0.8px
  headline:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.8px
  heading:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.2px
  subhead:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: 0
  caption:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0
  eyebrow:
    fontFamily: "Inter, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.5px
  mono:
    fontFamily: "SF Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0

rounded:
  none: 0px
  xs: 5px
  sm: 8px
  md: 11px
  lg: 18px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 17px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px

components:
  page:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "{spacing.section}"
  global-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.eyebrow}"
    height: 44px
    padding: "{spacing.xs}"
  sub-nav-frosted:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.subhead}"
    height: 52px
  page-title:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.display}"
  section-heading:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.heading}"
  prose:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    maxWidth: 592px
  caption-meta:
    backgroundColor: transparent
    textColor: "{colors.ink-subtle}"
    typography: "{typography.caption}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: 11px 22px
  button-primary-focus:
    backgroundColor: "{colors.primary-focus}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  button-primary-active:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
  button-secondary-pill:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    borderColor: "{colors.primary}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: 11px 22px
    border: 1px solid {colors.primary}
  button-inverse-utility:
    backgroundColor: "{colors.inverse-canvas}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: 8px 15px
  button-lifted-capsule:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: 8px 14px
  button-store-hero:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.subhead}"
    rounded: "{rounded.full}"
    padding: 14px 28px
  button-icon-circular:
    backgroundColor: "{colors.hairline-tertiary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: 44px
  text-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    textDecoration: underline 1px
  text-link-emphasis:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    textDecoration: underline 2px {colors.primary}
  focus-ring:
    backgroundColor: transparent
    borderColor: "{colors.primary-focus}"
    rounded: "{rounded.md}"
    border: 2px solid {colors.primary-focus}
  selection:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  search-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: 12px 20px
    height: 44px
  configurator-option-chip:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm}"
  configurator-option-chip-selected:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm}"
  card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.subhead}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    border: 1px solid {colors.hairline}
  card-bleed:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.subhead}"
    rounded: "{rounded.none}"
    padding: "{spacing.lg}"
  card-pricing-featured:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
    border: 1px solid {colors.primary}
  product-tile-base:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "{spacing.section}"
  product-tile-lifted:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "{spacing.section}"
  product-tile-deep:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "{spacing.section}"
  product-tile-deep-2:
    backgroundColor: "{colors.surface-4}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  product-tile-deep-3:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  environment-quote-card:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    rounded: "{rounded.none}"
    padding: "{spacing.section}"
  testimonial-card-feature:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    rounded: "{rounded.lg}"
    padding: "{spacing.section}"
  founder-quote-card:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.heading}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
    border: 1px solid {colors.hairline-strong}
  floating-sticky-bar:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    height: 64px
    padding: 12px 32px
  code-block:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
    border: 1px solid {colors.hairline}
  code-inline:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.xs}"
    padding: "{spacing.xxs}"
  rule:
    backgroundColor: "{colors.hairline}"
    height: 1px
    margin: "{spacing.xxl}"
  avatar:
    backgroundColor: "{colors.surface-2}"
    rounded: "{rounded.full}"
    size: 40px
  footer:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.caption}"
    padding: 64px
---

## Overview

Mine and Mine v2 were never two systems. They were one component language
rendered on two grounds, kept apart only because each document hard-coded its
own polarity into its color names. Lifting the palette into a `themes` block
removes the reason they were separate: seventeen color roles, two sets of
values, one declaration per component.

What that forced was a vocabulary both grounds can satisfy. Mine's twenty-three
tokens included six nothing referenced; v2's eight could not express a
four-level tile ladder. The merged seventeen are the roles the union of
components actually spends — every one of them is referenced by at least one
entry below, which is the check v2 brought to the merge and the one Mine failed.

**Key characteristics:**
- Two themes, one token vocabulary. `dusk` is Mine's near-black ladder, `dawn`
  is v2's off-white ground extended to four surface levels.
- One accent, shared: signal orange #ff6a13, carrying dark text. Scarce in both
  themes — CTA, emphasis edge, focus, selection. Never type.
- Apple's pill CTAs at `{rounded.full}`, edge-to-edge tiles at `{rounded.none}`.
- Eight type steps on Inter, 40px display to 12px eyebrow, plus SF Mono.
- No shadows in either theme. Depth is surface level plus a 1px edge.
- Links are ink with a permanent underline; the accent is not spent on them by
  default.

### What each half gave up

| Conflict | Resolution | Why |
|---|---|---|
| Display weight: Mine 500, v2 600 | 600 on display, headline, heading | Mine chose 500 for a dark ground and v2 600 for a light one. One scale has to survive both, and 600 is the value that does — 500 is the one that goes thin on #010102, which was Mine's own stated fear |
| Accent hue: lavender vs signal red | Neither — #ff6a13 in both themes | The only role where the two lineages disagreed about hue rather than about brightness, which makes it the only one no measurement can settle: both clear 4:1 on both grounds, so neither is wrong. What is wrong is shipping both, because a hue that changes with the reader's OS setting is not a brand. Between the two, v2's red is already an orange-red descended from Braun's lit-indicator and Mine's lavender is product-chrome blue with no claim on a personal site, so the shared value is the warm one — taken up to full saturation, where a signal color belongs, rather than down to the luminance that would have let it keep setting type |
| `pill` and `full`, both 9999px | One token, `{rounded.full}` | Two names for one value is what v2's token check exists to catch. Mine's components were re-pointed |
| Spacing names colliding at different values | Mine's eight names win | v2's `xs` 4 → `{spacing.xxs}`, `sm` 8 → `{spacing.xs}`, `xl` 40 → `{spacing.xxl}` 48, `section` 120 → `{spacing.section}` 80 |
| v2's third-ink-tier ban | Three tiers, light values pulled down to clear it | `{colors.ink-subtle}` at #606060 measures 4.76:1 on `{colors.surface-4}`, the deepest light surface. v2's objection was to the value, not the tier |
| Four duplicate components | Collapsed to one each | `card` absorbed `store-utility-card`; `global-nav` absorbed `site-nav`; `text-link` took v2's underline and Mine's accent moved to `text-link-emphasis`; `code-block` kept Mine's recessed treatment |

v2's single `button` is the one entry dropped outright rather than merged.
Its argument — a personal site has no decision density to justify a
primary/secondary split — is sound and loses to the fact that the merged set
has a store hero, a configurator and a pricing grid in it.

## Colors

Every role below exists in both themes. The dusk theme is Mine's grounds and
inks unchanged. The dawn theme keeps two of v2's values at their original
roles — `{colors.ink}` #171717 and `{colors.inverse-ink}` #ffffff. v2's canvas
#f8f8f8, surface-1 #ffffff, surface-2 #ededed and hairline #d9d9d9 were re-set
with the rest of the ladder, which mirrors the dark one: each light ground and
rule takes its dark counterpart's cool hue and sits the same contrast from its
canvas, as far as the focus ring allows (see Known Gaps). `{colors.surface-1}`
reuses dusk's ink #f7f8f8, 1.09:1 above `{colors.canvas}` #eceef0 as dusk's
surface-1 is 1.10:1 above its own.
Beyond that there is one move and seven additions. The
move is v2's muted ink, now #606060, which the merged ramp needed a darker tier above, so it
went from `ink-muted` to `{colors.ink-subtle}`. The additions are `surface-3`,
`surface-4`, `hairline-strong`, `hairline-tertiary`, `ink-muted`,
`primary-hover` and `primary-focus`, all derived rather than imported and all
listed in Known Gaps as such.

Neither theme keeps its own accent. That is the one role where values from
either side were the wrong answer, and it is argued below.

### Accent

Four roles, one hue, **signal orange #ff6a13** at hsl(22 100% 54%), and all four
are shared — the accent is the only part of the palette that does not vary by
theme.

Measurement does not decide the hue. Mine's lavender #5e6ad2 reads 4.44:1 on
the dark canvas and 4.43:1 on the light one; v2's signal red #cc3300 reads
4.01:1 and 4.89:1. Both are legible on both grounds, so the per-theme accent the
merge originally shipped was not a contrast failure — it was a brand that
changed hue when the reader changed an OS setting, which is two brands.

Between the two inherited hues the warm one has the better claim: v2's red is an
orange-red descended from Braun's lit-indicator, which both lineages can own,
where the lavender is product-chrome blue borrowed from an issue tracker. The
value is that warmth at full saturation rather than at the deeper luminance a
text-capable accent would need — a signal color that has been darkened until it
can set body type is no longer signaling.

The consequence is the rule below it: **the accent carries dark text, and never
is text.** #171717 on primary measures 6.25:1 and white measures 2.87:1, so
`{colors.on-primary}` is the ink. And at 2.47:1 on the light canvas and 2.70:1 on
`{colors.surface-1}` the accent is at most a fill or an edge, never a word, which
is why `text-link-emphasis` is ink with an accent underline and
`button-secondary-pill` is ink in an accent-edged capsule. Both used to set
their label in the accent. Neither can now.

- **Primary** ({colors.primary}) #ff6a13: CTA fill, the pricing card's emphasis
  edge, the link underline, the selection. 7.28:1 on the dark canvas, 2.47:1 on
  the light one — the asymmetry is real and it is the price of the saturation.
- **Primary Hover** ({colors.primary-hover}) #ff7422: the hovered and active CTA.
  One step brighter, because every use is a fill under dark text and 6.64:1 is
  the best of the three.
- **Primary Focus** ({colors.primary-focus}) #de5100: the focus ring and the
  focused CTA's fill. The *darkest* step, and deliberately so — it is the only
  accent role that has to be seen against the ground rather than under text.
  It is as dark as the hue goes while `{colors.on-primary}` still reads 4.5:1
  on it, and that darkness is what clears 3:1 on every light ground.
- **On Primary** ({colors.on-primary}) #171717: the ink, for text on all three
  fills. 6.25:1, 6.64:1 and 4.51:1 respectively.

#### On dawn, the accent never stands alone

Every accent step clears 3:1 on every dusk ground. On the light grounds only
`{colors.primary-focus}` clears it everywhere:

| Role | canvas #eceef0 | surface-1 #f7f8f8 | surface-2 #e3e4e6 | surface-4 #dfe0e1 | on-primary |
|---|---|---|---|---|---|
| primary #ff6a13 | 2.47 | 2.70 | 2.25 | 2.17 | 6.25 |
| primary-hover #ff7422 | 2.32 | 2.54 | 2.12 | 2.04 | 6.64 |
| primary-focus #de5100 | 3.42 | 3.74 | 3.12 | 3.01 | 4.51 |

The 3:1 floor for an object applies where the object alone identifies a
control or its state. So the rule is about what the accent is asked to carry,
not its value:

- **A fill always carries its label.** The label identifies the control, so
  the number that counts is `{colors.on-primary}` on the fill, 4.51:1 or better.
- **A focus ring is `{colors.primary-focus}`**, the one step that clears 3:1 on
  every light ground.
- **Icons and type are ink.** An icon in the accent is a word in the accent.
- **An edge or underline is emphasis, not identity.** It may sit under 3:1
  because the element is already identified by its ink label.

Darkening the hue until every step cleared every light ground would need a
visibly browner orange on both themes, which trades the signal for a number.

The rule that does not vary is how little of it there is: CTA, emphasis edge,
focus, selection. Both source systems policed that, and it is the one piece of
color discipline the merge inherited unchanged from both.

### Surface

The ladder runs from the page ground upward, four steps, in whichever direction
reads as lifted on that ground.

- **Canvas** ({colors.canvas}): page ground and the base product tile.
- **Surface 1** ({colors.surface-1}): the workhorse lift — cards, inputs, the
  sub-nav, the footer band, secondary pills.
- **Surface 2** ({colors.surface-2}): selected chips, capsules, code, the
  founder quote.
- **Surface 3** ({colors.surface-3}): deep tiles and feature quotes.
- **Surface 4** ({colors.surface-4}): the deepest tile.

On the dark ground every step is lighter than the last. On the light ground
`surface-1` is white — a lift above the off-white canvas — and `surface-2`
through `-4` step down into it. That asymmetry is real and is in Known Gaps.

### Structure

- **Hairline** ({colors.hairline}) → **Hairline Strong**
  ({colors.hairline-strong}) → **Hairline Tertiary**
  ({colors.hairline-tertiary}): 1px borders, ascending in weight. The tertiary
  cut doubles as the icon button's fill.
- **Inverse Canvas** ({colors.inverse-canvas}) / **Inverse Ink**
  ({colors.inverse-ink}): the fill that opposes the ground, and the text on it.
  Near-white on the dark theme, near-black on the light one. A button fill,
  never a surface.

### Text

- **Ink** ({colors.ink}): headings and body.
- **Ink Muted** ({colors.ink-muted}): secondary prose, unselected chips, code.
- **Ink Subtle** ({colors.ink-subtle}): footer links, capsule labels, metadata.

All three clear 4.5:1 against every surface in their own theme. The light
tiers are set so the ladder steps down by the same contrast in both themes:
`{colors.ink-muted}` #2c2c2c reads 12.01:1 on the light canvas against 14.28:1
on the dark one, and `{colors.ink-subtle}` #606060 reads 5.41:1 against 6.42:1.
On `{colors.surface-1}` the pairs are 13.13 and 13.04, 5.91 and 5.86.

## Typography

Eight steps on Inter, 40px down to 12px, plus SF Mono at 14px. Mine's sizes,
tracking and line heights; v2's weight on the three display steps.

### Principles

- **Tracking is negative only above 20px** — -0.8px on `{typography.display}`
  and `{typography.headline}`, -0.2px on `{typography.heading}`, 0 from
  `{typography.subhead}` down. `{typography.eyebrow}` is the one positive value
  at +0.5px, which is what makes 12px nav labels legible rather than cramped.
- **Weight is 600, 500 or 400 — never lighter.** 600 on the three display
  steps, 500 on `{typography.caption}` and `{typography.eyebrow}` because both
  set control labels, 400 on reading text. Thin strokes are the one thing the
  dark ground cannot carry, and the scale has to work on both.
- **One family change, and it is the monospace.** SF Mono resolves natively on
  macOS and falls back through `ui-monospace`. Inter does every other step: an
  open license that actually loads.
- **Body leading is 1.65** at a 592px measure, roughly 70 characters a line.
- **Two steps no longer exist.** v2's 13px caption folded into the 14px one, and
  its five-step scale gained `headline`, `subhead` and `eyebrow`. Nothing in v2
  referenced a size the merged scale cannot express.

## Layout

### Spacing System

4px base with one off-grid value, `{spacing.md}` 17px, inherited from Apple's
scale through Mine. Eight steps: 4 / 8 / 12 / 17 / 24 / 32 / 48 / 80.

`{spacing.section}` 80px is both the product-tile interior padding and the
vertical rhythm between sections. v2's 120px page rhythm does not survive —
120px separates sections on a page whose headings are body-sized, and this scale
puts a 40px title at the top of each.

### Grid & Container

- Prose measure 592px, around 70 characters at 16px.
- Product tiles run edge-to-edge; their 80px padding is the only margin.
- Cards sit on a 3-up grid, 2-up at tablet, 1-up at mobile.
- Nav 44px, sub-nav 52px, sticky bar 64px.
- Full-bleed blocks escape the measure and drop to `{rounded.none}`.

### Whitespace Philosophy

Sections separate by **changing surface level**, not by gaps — the 80px of
unoccupied tile around a subject is the whitespace. On the dark ground that
separation is quieter and all four ladder steps have to work; on the light
ground canvas-against-white carries most of it and `surface-3`/`-4` are for
deliberate weight.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (ground) | `{colors.canvas}`, no border | Page, base tile, global nav |
| 1 (lift) | `{colors.surface-1}` + 1px `{colors.hairline}` | Cards, inputs, sub-nav, footer |
| 2 | `{colors.surface-2}` + 1px `{colors.hairline-strong}` | Selected chips, capsules, code, founder quote |
| 3 | `{colors.surface-3}` | Deep tiles, feature quotes |
| 4 | `{colors.surface-4}` | Deepest tile |
| emphasis | surface-2 + 1px `{colors.primary}` | The one recommended option in a set |
| focus | 2px `{colors.primary-focus}` at 2px offset | Focused button or input |

**There are no shadow tokens.** On the dark ground that is a constraint — a
shadow on #010102 is invisible. On the light ground it is a choice: shadows work
there, and omitting them keeps one depth mechanism across both themes instead of
one per theme. Depth is surface level plus a 1px edge, which is honest about
being a flat medium.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Product tiles and full-bleed cards — never rounded |
| `{rounded.xs}` | 5px | Inline code |
| `{rounded.sm}` | 8px | Inverse utility button, code blocks |
| `{rounded.md}` | 11px | Lifted capsules, focus rings |
| `{rounded.lg}` | 18px | Every card — utility, pricing, quote |
| `{rounded.full}` | 9999px | CTAs, search input, chips, avatars, icon buttons |

**Radius is proportional to element size**: 5 for inline decoration, 11 for
controls, 18 for cards, a capsule for anything you press. The t-shirt names are
Mine's, the rule they encode is v2's — pick the value from what the element is,
not by eye. A 14px corner means the element's role was never decided.

The corollary: **radius exists only while a block is inset.** A block that runs
edge-to-edge takes `{rounded.none}`, because a rounded corner against the
viewport edge describes a boundary that isn't there.

## Components

### Page and navigation

**`page`** — `{colors.canvas}`, `{typography.body}`, `{spacing.section}`
padding. The ground everything sits on.

**`global-nav`** — 44px, `{colors.canvas}`, `{typography.eyebrow}` at 12px with
+0.5px tracking. Visible labels, a real touch target.

**`sub-nav-frosted`** — 52px, `{colors.surface-1}`, `{typography.subhead}`. The
level change is what distinguishes the two bars. The name is inherited; there is
no backdrop blur in the token set.

### Type

**`page-title`** — `{typography.display}` 40px/600 at -0.8px.
**`section-heading`** — `{typography.heading}` 28px/600, `{spacing.section}`
above it.
**`prose`** — `{typography.body}` 16px/1.65 at a 592px measure.
**`caption-meta`** — `{typography.caption}` in `{colors.ink-subtle}`. Dates,
bylines, figure captions.

### Buttons

**`button-primary`** — the accent pill. `{colors.primary}` fill,
`{typography.body}`, 11px 22px padding, `{rounded.full}`. Focus and active
states live in `button-primary-focus` and `button-primary-active`.

**`button-secondary-pill`** — `{colors.surface-1}` fill, `{colors.ink}` text,
1px `{colors.primary}` edge. The accent is the border, not the label: at 2.70:1
on `{colors.surface-1}` it is emphasis, and the ink label identifies the button.

**`button-inverse-utility`** — `{colors.inverse-canvas}` fill,
`{colors.inverse-ink}` text, `{rounded.sm}`. The only element that inverts
polarity against its own theme; use it once per view at most.

**`button-lifted-capsule`** — `{colors.surface-2}` fill, `{colors.ink-subtle}`
text, `{typography.caption}`. Quiet utility actions.

**`button-store-hero`** — the oversized pill: `{typography.subhead}` at weight
400, 14px 28px padding.

**`button-icon-circular`** — 44px square, `{colors.hairline-tertiary}` fill,
`{rounded.full}`.

### Links and state

**`text-link`** — `{colors.ink}` with a permanent 1px underline at 2px offset,
underline color matching the text. Not hover-revealed: a link that looks like
plain text until pointed at is invisible to anyone without a pointer.

**`text-link-emphasis`** — the same link, `{colors.ink}`, with the underline
thickened to 2px in `{colors.primary}`. For links that have to carry against a
deep tile. The promotion is the rule, not the word — the accent cannot set type.

**`focus-ring`** — 2px `{colors.primary-focus}` at 2px offset, `{rounded.md}`.

**`selection`** — `{colors.primary}` fill with `{colors.on-primary}` text.

### Cards and inputs

**`card`** — `{colors.surface-1}`, `{rounded.lg}`, `{spacing.lg}` padding, 1px
`{colors.hairline}`. One card. It is also the unfeatured tier that
`card-pricing-featured` is featured against.

**`card-bleed`** — the same card run edge-to-edge, at `{rounded.none}` and
without the border.

**`card-pricing-featured`** — `{colors.surface-2}`, `{spacing.xl}` padding, 1px
`{colors.primary}` edge. The accent border is the whole emphasis mechanism:
the fill is one step off its siblings, so without the edge the card does not
read as chosen. Never two in one set.

**`search-input`** — pill-rounded, 44px tall, `{colors.surface-1}`.

**`configurator-option-chip`** / **`-selected`** — selection reads as a lift
from surface-1 to surface-2 plus ink going from muted to full. No accent.

**`floating-sticky-bar`** — 64px, `{colors.surface-1}`, 12px 32px padding.

### Tiles and quotes

**`product-tile-base`** / **`-lifted`** / **`-deep`** / **`-deep-2`** /
**`-deep-3`** — the five-tile ladder, all `{rounded.none}` with 80px padding and
`{typography.display}` headlines. Alternate levels down the page; never place
two adjacent tiles on the same level.

**`environment-quote-card`** — `{colors.surface-3}` with a 40px display quote at
tile scale.

**`testimonial-card-feature`** — `{colors.surface-3}`,
`{typography.headline}`, `{spacing.section}` padding. Belongs in the tile
rhythm, not in a card grid.

**`founder-quote-card`** — `{colors.surface-2}`, `{typography.heading}`,
`{spacing.xl}` padding, 1px `{colors.hairline-strong}`. The quiet quote, sized
to sit inside a column.

### Code, rules, avatars, footer

**`code-block`** — `{colors.surface-2}`, `{colors.ink-muted}` text,
`{typography.mono}`, `{rounded.sm}`, `{spacing.md}` padding, 1px
`{colors.hairline}`. Code steps down from `{colors.ink}` to ink-muted so a block
of monospace does not out-shout the prose around it.

**`code-inline`** — `{colors.surface-2}`, `{rounded.xs}`, `{spacing.xxs}`
padding. Recessed: inline code is set into the sentence, not placed on it.

**`rule`** — 1px `{colors.hairline}` with `{spacing.xxl}` margins. Drawn as a
filled 1px box rather than a border, so it can be masked or faded without
changing the element's box model.

**`avatar`** — 40px square at `{rounded.full}` on `{colors.surface-2}`.

**`footer`** — `{colors.surface-1}` band, `{colors.ink-subtle}` text,
`{typography.caption}`, 64px padding.

## Motion

One rule, not a scale. Transitions are 150ms `ease` on color and background
only. Nothing animates `transform`, `opacity`, or `box-shadow`, and nothing
staggers. Any motion that cannot be expressed in that rule does not ship.

Every transition sits behind `prefers-reduced-motion`. A system that specifies
motion it does not gate is not thorough.

The diagram layer is the one gated exception, and figures captured for
publication outside this page run under it in `loop` mode: one decorative token
repeats, the meaning does not change, and the figure is complete without it. The
clock is 160ms fast, 480ms step, 720ms hold, a loop no shorter than 3s, and
travel capped at 24px. Nothing animates in: a loop a reader joins halfway must
carry the whole figure, as must the first frame every static renderer and
reduced-motion viewer paints.

Where the medium carries one bit of alpha, as a GIF does, that rules out opacity
entirely — a half-opaque pixel is absent, so a fade is a blink and a blink is an
element animating in. Two things are left. Translation, capped as above. And a
marching `stroke-dashoffset`, which a single-color figure needs because
illumination has no second tone to read in and must read by stroke weight
instead: the lit path is a heavier copy of a line drawn unconditionally
underneath, so the figure is complete at every instant and the dash only adds to
it. Drawn without that copy, the same dash is a draw-on. The exemption is the
copy, not the property — `stroke-dasharray` in a keyframe stays an automatic
fail.

The 24px cap exists so that a loop joined halfway looks like a loop and not like
a thing that has slid out of place. A periodic field is the one translation it
measures wrongly: a scatter of marks repeating every *p* across the figure,
translated by exactly *p* over the loop, puts every mark where its neighbor
stood, so the last frame is the first and nothing enters, leaves or jumps —
regardless of how large *p* is. Such a field may travel its own period and no
other distance. Capped at 24px it would not drift, it would wobble; translated
by anything but *p* it shunts visibly once per loop, which is worse than either.
The obligation that replaces the cap is to assert the tiling: the field must be
laid a full period past both edges, and every mark inside the figure must have a
counterpart one period behind it.

## Terminal

The `terminal` group is the sixteen-color ANSI palette for ports only: terminal
emulators, editors and anything else that needs more than one chroma. No site or
UI component may use it, except the page that documents it. The UI itself keeps
its single accent.

Background is `{colors.canvas}` and foreground is `{colors.ink}`. Cursor is
`{colors.primary}` with `{colors.on-primary}` text; selection is `{colors.primary}`
with `{colors.on-primary}` text.

Ten colors are declared: `black`, `red`, `green`, `yellow`, `blue`, `magenta`,
`cyan`, `white`, `bright-black` and `bright-white`. The other six are derived by
the build, not declared. Bright red, green, yellow, blue, magenta and cyan each
take their base color's HSL lightness shifted 8 points, up on dusk and down on
dawn, then keep stepping 2 points in the same direction until the result reaches
4.5:1 against `{colors.canvas}` or lightness hits 0 or 100. Each inherits its
base color's `use`. On dawn, `black` is a light surface and `white` is ink, so
text printed in `white` stays legible.

## Do's and Don'ts

### Do

- Declare a component once. If it needs a different value per theme, the value
  belongs in `themes`, not in a second component.
- Alternate surface levels down the page. Two adjacent tiles on the same level
  read as one tile.
- Keep the accent scarce: CTA, emphasis edge, focus, selection, and one promoted
  link where a tile demands it. That rule is the same in both themes.
- Pill-round every CTA. The radius is the affordance.
- Hold `{rounded.none}` on tiles and on anything meeting the viewport edge.
- Let the 80px tile padding be the whitespace.
- Spend every token. A role nothing references should be deleted, not
  documented — six of Mine's were.

### Don't

- Don't add a shadow. Depth is surface level plus a 1px edge, in both themes.
- Don't introduce a second chroma into either theme, and don't reach for a
  semantic palette before there is a form to need one.
- Don't name a hue in a component. The accent is one value today and the hover
  and focus steps around it are not; anything that says "the orange border" in
  prose or in a class name has hard-coded a value the token can change.
- Don't fill a card with `{colors.primary}`. It is a 1px edge or a CTA — never a
  background.
- Don't use `{colors.inverse-canvas}` as a section background. It is a button
  fill; as a surface it fights the whole theme.
- Don't carry hierarchy with color alone. Size first, space second, color never
  by itself.
- Don't add a fourth ink tier. The third already sits at 4.76:1 on the light
  theme's deepest surface.
- Don't invent a radius between the six, or a spacing step between the eight.
- Don't assume a value holds in both themes because it holds in one. Contrast
  was checked per theme and the merge changed six light values to pass.

## Known Gaps

- **Eleven light values are derived, not imported.** v2 declared eight colors
  across seven distinct values; the merged vocabulary needs seventeen roles.
  `{colors.canvas}` #eceef0 was chosen by eye. `{colors.surface-1}` #f7f8f8,
  `{colors.surface-2}` #e3e4e6 and `{colors.hairline}` #cbcdd4 replace v2's
  values to mirror the dark ladder. `{colors.surface-3}` #e0e1e3,
  `{colors.surface-4}` #dfe0e1, `{colors.hairline-strong}` #b8b8bf,
  `{colors.hairline-tertiary}` #ababb3, `{colors.ink-muted}` #2c2c2c,
  `{colors.primary-hover}` #ff7422 and `{colors.primary-focus}` #de5100 were
  constructed to satisfy the component set and the contrast floor.
- **The light surfaces step less than the dark ones.** Dusk's surface-2 to
  surface-4 sit 1.14, 1.19 and 1.20:1 from the canvas; dawn's sit 1.09, 1.12
  and 1.14:1. Any darker and `{colors.primary-focus}` would drop under 3:1 on
  them, and it cannot darken further without its label dropping under 4.5:1.
  The hairlines carry the full mirrored steps.
- **The light inks are pure gray.** Every other neutral in both themes carries
  the cool cast; `{colors.ink}`, `{colors.ink-muted}` and `{colors.ink-subtle}`
  on dawn do not.
- **The light ladder is not monotonic.** `surface-1` is a lift above canvas and
  `surface-2` through `-4` step down into it, where the dark ladder climbs
  steadily. A component that assumes "higher number means further from the
  ground" is right on dark and wrong on light.
- **The accent is in neither source document.** #ff6a13 was chosen by eye on
  the site's dusk and dawn cards, replacing #ef6306, a slightly deeper step that
  cleared 3:1 on `{colors.surface-1}`. Unlike every other value in here it
  cannot be checked against a system that shipped it.
- **`{colors.primary}` reads 2.47:1 on the light canvas, under the 3:1 floor
  for an object.** The canvas was darkened and cooled to #eceef0 so the light ladder steps
  like the dark one, and the brighter #ff6a13 was chosen over the margin #ef6306
  had. It is
  contained by a usage rule rather than a value: see "On dawn, the accent never
  stands alone" under Accent. The site enforces the rule in a test; each
  integration has to hold it itself.
- **The dark theme gets a brighter accent than it needs and the light theme a
  dimmer one than it wants.** One value on two grounds cannot be optimal on
  either — 7.28:1 against near-black is more separation than a fill needs, and
  2.47:1 against off-white is less than it should have. A per-theme pair would fix
  the measurements and reintroduce the two-brands problem the shared accent
  exists to solve.
- **The three display steps moved from 500 to 600 and have not been seen on
  #010102.** The weight was chosen to survive both grounds by argument, not by
  looking.
- **`{spacing.md}` 17px is off the 4px grid.** Inherited from Apple through
  Mine, and it stays because `code-block` and the merge table both reference it.
  It is the one value in the scale that cannot be reasoned about.
- **No syntax-highlight palette.** One chroma is not enough hues for token
  colors, and adding them breaks the single-accent rule. Monochrome code, or a
  decision to make.
- **Motion is specified in prose, not tokens.** Deliberate at this size, but a
  second person working in this system has nothing to reference.
- **The corners are circular arcs, not continuous curvature.** CSS
  `border-radius` draws a circular quadrant; Apple's rounded rectangles blend a
  continuously varying curve into the straight edge. At 18px the difference
  shows, and the only honest fixes are an SVG or mask path per corner.
