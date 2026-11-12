# Cynosure gaps found migrating nimaz-web

The site is built entirely from `@arshad-shah/cynosure` components. The first migration (0.3.0)
found 8 bugs, 10 missing components, 12 missing props, 6 missing icons and no stylesheet
manifest; 0.4.0 closed all of them, and every workaround they needed is gone from this repo.

What is still open against **0.4.0**:

| #   | What                                                                                                                                                                                                                                                                              | In this repo                                                                             |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | **The page canvas.** The Astro integration themes `:root` but does not touch `<html>` or `<body>`, so a page keeps the browser's 8px body margin and a white canvas instead of `--cy-color-bg`. Wanted: the integration (or an opt-in `page.css`) sets both.                      | `src/styles/page.css`, two rules. The only CSS the site has                              |
| 2   | **Anchors under the sticky `SiteHeader`.** A link to `#section` scrolls the target under the bar; the README says to add `scroll-margin-top` by hand. Wanted: `SiteHeader sticky` sets `scroll-padding-top` on the page, or `Section` takes the header's height as scroll margin. | No CSS: the anchored sections on /features use the default padding, which clears the bar |
| 3   | **`IconTile` has no `color`**, unlike `Badge`, `Avatar`, `Button` and `Card edge`. The app's gold and purple feature colours cannot be used.                                                                                                                                      | The `warning` and `info` tones stand in                                                  |
| 4   | **The colour mode still needs an island.** `ThemeToggle` saves the mode but nothing puts it on `<html>` unless the toggle sits inside `CynosureTheme target="document"` with `useColorMode`. Wanted: `ThemeToggle target="document"`, so an Astro header needs no wrapper.        | `components/layout/Header.tsx` wraps `SiteHeader` for this alone                         |
| 5   | **`Stat` in a `soft` Section** keeps its own surface Card, so a strip of stats cannot be flat tinted tiles. Minor.                                                                                                                                                                | Surface cards on a soft band                                                             |
| 6   | **Printing the site chrome.** `SiteHeader` (with its menu button and actions) and `SiteFooter` print on every page. Wanted: both hidden in print by default.                                                                                                                      | `scripts/gen-legal.mjs` removes them before making the PDFs                              |
| 7   | **Printed tabs have no titles.** Every `TabPanel` prints, but the tab list prints once above them (cut off where it scrolls) and no panel says which tab it is. Wanted: in print, hide the list and put each tab's label above its panel.                                         | `scripts/gen-legal.mjs` titles the panels                                                |

Not Cynosure's job, and kept in the repo: the six feature illustrations (`src/lib/feature-art.ts`),
which are artwork drawn with Cynosure's colour tokens.
