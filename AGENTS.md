# Project guide

This is a separate, static SvelteKit/Reveal.js lecture-deck starter for Ben
Welsh's Fall 2026 SVA course. Keep it useful for more than one lecture.

## Content and structure

- Lecture metadata lives in `src/lib/lectures.ts`. Each lecture
  has its own MDsveX file in `src/lib/presentations/` and is mapped in
  `src/lib/presentations.ts`.
- There is no deck homepage or index. The syllabus site's matching lesson
  detail page owns the link to each finished deck; do not add a link to a
  placeholder deck or a lesson page that is not ready.
- The repo includes the first lecture, a basic `peeling-the-onion` scaffold
  for Week 4, and the reusable `sample-next` example. Keep the scaffold
  unlinked from the syllabus until it is ready. Do not invent dates,
  assignments, guests, or student details.
- Keep blank lines around Markdown inside `<Slide>`, `<Notes>`, and other
  Svelte components in `.svx` files.
- No archive-specific slides, screenshots, people, or deployment settings
  belong in this starter.

## Design and code

- Keep the shared syllabus palette and Ringside typography tokens in
  `src/app.css`. Slide title treatments use the syllabus's white, red, and cyan
  design; the reusable slide layouts remain projection-friendly.
  The included Ringside and Sentinel font files are used with permission but
  are excluded from the MIT code license. Do not add a school logo unless
  requested.
- Preserve the static build, configurable `BASE_PATH`, keyboard navigation,
  phone layout, speaker notes, readable contrast, and useful slide semantics.
- There is no backend, CMS or authentication. The existing deployment
  workflow publishes `main` under `/docs/sva-dvc-3342a-slide-deck/`; local
  builds keep `BASE_PATH` and `VITE_CANONICAL_URL` configurable. Check the
  public lecture route and an asset after deployment.

## Checks

Run `pnpm run lint`, `pnpm run build`, `pnpm test`, and
`pre-commit run --all-files` after changes. Browser tests require Chromium;
install it with `pnpm exec playwright install chromium` when needed.
