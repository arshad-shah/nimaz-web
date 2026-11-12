# Cynosure gaps found migrating nimaz-web

Found against `@arshad-shah/cynosure` 0.3.0 (November 2026). Every piece of UI on the site is
now a Cynosure component; this lists what Cynosure could not do, and what the site does instead
until it can. When a gap closes, delete the workaround named in its row.

## Bugs

| #   | What                                                                                                                                                                                                                      | Workaround in this repo                                           |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| B1  | **Button clips descenders.** The label is `line-height: 1` with `overflow: hidden`, so g, y and p lose their tails in fonts with a deep descent (Plus Jakarta Sans). Seen on "Privacy", "Prayer & Qibla".                 | One rule in `src/styles/site.css` raising the label's line height |
| B2  | **Avatar and Image need script to show a picture.** Server-rendered without hydration, `Avatar` stays on its initials and `Image` stays at `opacity: 0` behind its skeleton, for ever. A static page cannot use either.   | The footer is hydrated (`client:idle`) only so its logo appears   |
| B3  | **`prefers-contrast: more` drops the product palette.** The high-contrast block of `themeToCss` falls back to Cynosure's default `bg`, `surface` and accent-soft instead of deriving from `palettes` passed to the theme. | None; high-contrast visitors get Cynosure's default surfaces      |
| B4  | **`accent-soft` is mixed with the default surface**, not the theme's (`color-mix(in oklab, <accent> 18%, #fbf9f5)` although `palettes.light.surface` is `#ffffff`).                                                       | None; the tint is slightly warm                                   |
| B5  | **A per-palette `accent` does not re-derive hover, active and on-accent.** Setting `palettes.dark.accent` leaves `accent-hover` computed from the global accent.                                                          | The theme keeps one accent for both modes                         |
| B6  | **`IconData` is not exported from the package root**, only from `/icons`, although `Avatar`, `Button`, `Tab` and others take it as a prop type.                                                                           | Imported from `@arshad-shah/cynosure/icons`                       |
| B7  | **Layout primitives forward attributes their types do not allow.** `Stack` and `Inline` spread `...rest` onto the element, but `aria-label`, `id` and `role` are not in the props, so a `nav` or `ul` cannot be named.    | Spread of a `{ 'aria-label': … }` object in three places          |
| B8  | **`Steps` requires `current`**, so it cannot show a plain numbered how-to; every step also announces a status ("not started").                                                                                            | Download page marks step 1 as current                             |

## Missing components

| #   | What                                                                                                                                                                                                                                                                          | Used instead                                                                                        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| C1  | **Site header / site shell.** `AppShell` is an app frame (own scroll areas, side navigation), which breaks anchors, printing and a document-scrolled marketing page. Needed: a sticky top bar with brand, inline links that collapse into a drawer, actions, and a skip link. | `Container` + `Inline` + `Button` + `Sheet` + `SideNav`, with `.site-header` CSS                    |
| C2  | **Site footer.** Columns of titled link lists plus a legal line.                                                                                                                                                                                                              | `Grid` + `Heading` + `SideNav` (rows are indented from their heading)                               |
| C3  | **Skip link** outside `AppShell`.                                                                                                                                                                                                                                             | `Link` + `.skip-link` CSS                                                                           |
| C4  | **Section / band.** A full-width block with its own background, border and vertical rhythm, to hold a `Container`. Also needed for C1 and C2.                                                                                                                                 | Raw `<header>` and `<footer>` with CSS                                                              |
| C5  | **Stat / metric tile** (a large value over a label, as `dt`/`dd`).                                                                                                                                                                                                            | `Card` + two `Text`s; the `dl` semantics are lost                                                   |
| C6  | **List** (`ul`/`ol` with items, optionally an icon per item). `Stack as="ul"` exists but nothing renders an `li` except `Card` and `GridItem`.                                                                                                                                | `Stack as="ul"` with raw `<li>` in the privacy summary                                              |
| C7  | **Icon tile.** An icon on a tinted rounded square, for feature cards.                                                                                                                                                                                                         | `Avatar` with `icon`, `shape="square"` and `decorative`, which is a stretch of what an Avatar means |
| C8  | **QR code.**                                                                                                                                                                                                                                                                  | `lib/qr.ts` SVG string inside `AspectRatio`                                                         |
| C9  | **Device frame** for app screenshots or mock screens.                                                                                                                                                                                                                         | Dropped; the download page shows the prayer list in a plain `Card`                                  |
| C10 | **Visually hidden text** as a component (the `.cy-visually-hidden` class is internal).                                                                                                                                                                                        | Avoided: the next prayer carries a visible `Badge`                                                  |

## Missing props and options

| #   | What                                                                                                                                                                          | Used instead                                                        |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| P1  | **Responsive visibility** (`hideBelow` / `showFrom`) on layout primitives and buttons.                                                                                        | `.only-wide` / `.only-narrow` media queries                         |
| P2  | **`id` on `Container`** (and the other layout primitives), for anchored sections.                                                                                             | The anchor sits on the section's `Heading`                          |
| P3  | **Unequal `Grid` columns** (`columns="2fr 1fr"` or a template per breakpoint) and **reordering** an item per breakpoint.                                                      | Equal columns with `GridItem span`; alternating rows swap DOM order |
| P4  | **Sticky** on `GridItem` / `Stack` (a sidebar that follows the scroll).                                                                                                       | `.sticky-aside` CSS                                                 |
| P5  | **A second brand colour on `Button`** (`color`, as `Badge`, `Avatar` and `Card edge` have). The gold "Download" button could not be kept.                                     | Accent tone                                                         |
| P6  | **`Link` without an underline**, or a brand/logo link.                                                                                                                        | Ghost `Button` with `href` around the logo                          |
| P7  | **`ThemeToggle` storage key.** `useColorMode` takes `key`, `ThemeToggle` does not, so an uncontrolled toggle always uses `cy-color-mode`.                                     | Controlled toggle; the site adopted the default key                 |
| P8  | **`PageHeader` title size per level**, or a `size` between `md` and `lg`. Level-2 headers were too small for a marketing page.                                                | `heading` size tokens retuned in `src/theme.ts`                     |
| P9  | **`EmptyState` at `headingLevel={1}`** (it starts at 2), for a 404 page.                                                                                                      | Level 2, so /404 has no `h1`                                        |
| P10 | **`aria-current` on `Card`** (or a `current`/`selected` state).                                                                                                               | Accent tone plus a "Next" `Badge`                                   |
| P11 | **Printing.** No print styles: a closed `Accordion` section and an unselected `TabPanel` print as nothing.                                                                    | `scripts/gen-legal.mjs` opens them before printing                  |
| P12 | **Astro adapter and a page-level theme.** `CynosureTheme` cannot theme `<html>` on the server, so the canvas colour, `color-scheme` and the first-paint mode are set by hand. | `data-cy-mode="system"` on `<html>` and two rules in `site.css`     |

## Missing icons

Asked for by the feature list, mapped to the nearest Facet icon in `src/lib/icons.ts`:

| Wanted (Lucide name) | Stand-in       |
| -------------------- | -------------- |
| `calendar-days`      | `calendarPlus` |
| `square-check-big`   | `listChecks`   |
| `book-marked`        | `bookmark`     |
| `list-tree`          | `tree`         |
| `layout-grid`        | `grid`         |
| `refresh-cw`         | `retry`        |

Also wanted: a `qrCode` icon, Islamic icons the app's own set has (mosque, kaaba, crescent,
prayer beads), and a Google Play brand mark for the download buttons.

## Per-component stylesheets

`src/styles/cynosure.css` imports one stylesheet per component instead of `styles.css` (83 KB
against 204 KB). That works, but nothing says which files a component needs:

- There is no `inline.css`: Inline's rules are in `stack.css`.
- `.cy-visually-hidden` (used by Steps and Link) is only in `link.css`.
- Sheet needs `dialog.css`, Accordion `disclosure.css`, IconButton `tooltip.css`, and Button's
  `loading` state `loading-dots.css`.

Wanted: a manifest of each component's stylesheets (or have the Vite adapter work the list out
from the components a product imports). Until then `e2e/styles.spec.ts` guards the list.
