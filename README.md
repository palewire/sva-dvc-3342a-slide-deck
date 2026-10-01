# Truth-Telling 101 lecture decks

A clean, multi-lecture presentation starter for Ben Welsh's School of Visual Arts
course, **Truth-Telling 101: Artists Meet Data Journalism**. It uses SvelteKit,
Reveal.js, and MDsveX. The two decks in this repo are examples, not a published
class schedule.

## Run it

Use Node.js 24 and pnpm 11:

```sh
pnpm install
pnpm dev
```

Open the local URL printed by Vite. The index links to each lecture, and each
lecture has its own direct URL. In a deck, use the arrow keys or space to move,
`S` for speaker view, and `O` for the slide overview. On narrow screens,
Reveal.js switches to a vertically scrollable view. Add
`?controls=1&progress=1` to show controls and a progress bar in slide view.

## Add a lecture

1. Copy one of the files in `src/lib/presentations/` to a new `.svx` file.
   Write slides inside `<Slide>` components. Keep blank lines around Markdown
   inside component tags; MDsveX needs them.
2. Add its slug, title, and description to `src/lib/lectures.ts`. The index
   lists lectures in that order. These are independent presentations, not
   chapters of one long deck.
3. Import the new file and map its slug in `src/lib/presentations.ts`. TypeScript
   will flag a listed lecture that has no presentation.
4. Run `pnpm run lint`, `pnpm run build`, and `pnpm test`. The static build
   generates a real `index.html` for each lecture URL.

For example:

```svx
<script lang="ts">
  import Slide from '$lib/components/Slide.svelte';
  import Notes from '$lib/components/Notes.svelte';
</script>

<Slide variant="title">

# Your lecture title

A short opening thought.

<Notes>

Only the presenter sees this note in speaker view.

</Notes>

</Slide>
```

`<Slide>` also accepts `variant="section"` for a pale-yellow divider and
`animate`, `restart`, and `id` for Reveal.js auto-animate. The reusable
`<Screenshot>` component frames a chart or image with a source label. Put
assets in `static/`, give images useful alt text, and prefix their paths with
`base` from `$app/paths` so they work under a subpath.

## Check and publish

```sh
pnpm run lint
pnpm run build
pnpm test
pre-commit install
pre-commit run --all-files
```

The browser tests use a local preview of the built site. Install its browser
once with `pnpm exec playwright install chromium` if needed. CI runs lint,
build, and browser tests on pushes and pull requests.

No hosting or production deployment is configured. `BASE_PATH` defaults to
empty for a domain root; set it to a path such as `/lectures` before building
for a subdirectory. Set `VITE_CANONICAL_URL` only after choosing a public URL;
use the full site root including `BASE_PATH`, with no trailing slash. See
`.env.example`. Do not copy the deployment settings from another presentation
into this repo.

The source code is MIT-licensed. The included Ringside and Sentinel font files
are used with permission for this project and are **not** covered by the MIT
license; see `LICENSE`.
