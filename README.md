# Truth-Telling 101 lecture decks

A clean, multi-lecture presentation starter for Ben Welsh's School of Visual Arts
course, **Truth-Telling 101: Artists Meet Data Journalism**. It uses SvelteKit,
Reveal.js, and MDsveX. The repo contains the first lecture, a basic scaffold for
“Peeling the onion,” and a reusable sample deck.

The shared design follows the course syllabus: Ringside headings, a white
canvas, red and cyan accents, and thin blue rules. The “Peeling the onion”
scaffold has twelve slides covering the credited outside-in model, seven
verification steps and the Week 4 homework. Its speaker notes mark where to add
a running example before presenting.

## Run it

Use Node.js 24 and pnpm 11:

```sh
pnpm install
pnpm dev
```

There is no homepage. Open a deck directly, for example
`http://localhost:5173/lectures/social-science-in-a-hurry/`,
`http://localhost:5173/lectures/peeling-the-onion/` or
`http://localhost:5173/lectures/sample-next/`. In a deck, use the arrow keys or
space to move, `S` for speaker view, and `O` for the slide overview. On narrow
screens, Reveal.js switches to a vertically scrollable view. Add
`?controls=1&progress=1` to show controls and a progress bar in slide view.

The syllabus site owns navigation. Once a real lecture and its matching lesson
detail page are ready, link to the deck's published direct URL from that lesson
page. Keep the “Peeling the onion” scaffold unlinked until it is ready.
The sample deck is not linked from the syllabus.

## Add a lecture

1. Copy one of the files in `src/lib/presentations/` to a new `.svx` file.
   Write slides inside `<Slide>` components. Keep blank lines around Markdown
   inside component tags; MDsveX needs them.
2. Add its slug, title, and description to `src/lib/lectures.ts`. Each slug
   becomes a direct URL at `/lectures/<slug>/`. These are independent
   presentations, not chapters of one long deck.
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

`<Slide>` also accepts `variant="section"` for a section divider and
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

The existing deployment workflow publishes `main` under
`https://palewi.re/docs/sva-dvc-3342a-slide-deck/`. Local builds default to an
empty `BASE_PATH`; the workflow sets the production base path and canonical URL.
See `.env.example` for configurable local builds. After deployment, check the
public lecture route and an asset as well as the workflow result.

The source code is MIT-licensed. The included Ringside and Sentinel font files
are used with permission for this project and are **not** covered by the MIT
license; see `LICENSE`.
