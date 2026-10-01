# Project guide

This is a separate, static SvelteKit/Reveal.js lecture-deck starter for Ben
Welsh's Fall 2026 SVA course. Keep it useful for more than one lecture.

## Content and structure

- The index and lecture metadata live in `src/lib/lectures.ts`. Each lecture
  has its own MDsveX file in `src/lib/presentations/` and is mapped in
  `src/lib/presentations.ts`.
- The two included decks are examples. Do not present them as scheduled class
  sessions or invent dates, assignments, guests, or student details.
- Keep blank lines around Markdown inside `<Slide>`, `<Notes>`, and other
  Svelte components in `.svx` files.
- No archive-specific slides, screenshots, people, or deployment settings
  belong in this starter.

## Design and code

- Keep the SVA palette and typography tokens in `src/app.css`. Ringside and
  Sentinel font files are used with permission but are excluded from the MIT
  code license. Do not add a school logo unless requested.
- Preserve the static build, configurable `BASE_PATH`, keyboard navigation,
  phone layout, speaker notes, readable contrast, and useful slide semantics.
- No backend, CMS, authentication, or production deployment is configured.

## Checks

Run `pnpm run lint`, `pnpm run build`, `pnpm test`, and
`pre-commit run --all-files` after changes. Browser tests require Chromium;
install it with `pnpm exec playwright install chromium` when needed.
