---
name: screenshot-to-slide
description: 'Capture a screenshot of a web page, app, or chart and embed it in this deck using the <Screenshot> component. Use when filling in a screenshot placeholder in a lecture .svx file (src/lib/presentations/*.svx), or adding a new visual example to a slide.'
---

# Screenshot to slide

Turn a live URL into a cropped image file checked into this repo's `static/`
folder, then wire it into a `<Screenshot>` slide.

## When to use this skill

- A slide has a `<Screenshot>` block with a placeholder `<div class="screenshot-placeholder">` that needs a real image.
- You're adding a new example slide that should show a chart, app, or news story.

## Workflow

### 1. Capture the image

Use the deterministic Playwright script at
`.github/skills/screenshot-to-slide/scripts/capture.cjs` (copied from the
CUNY "Coding the News" repo's `browser-screenshots` skill). It requires the
`playwright` package as a dev dependency (`pnpm add -D playwright`) — already
installed in this repo.

```sh
node .github/skills/screenshot-to-slide/scripts/capture.cjs \
  --url "https://example.com/story" \
  --output static/screenshots/<lecture-slug>/<name>.png \
  --width 1280 --height 900 --deviceScale 2 --wait 1500
```

Key options (see `--help` for the full list, including `--phone`,
`--highlight`, `--execute`, `--session` for authenticated captures):

| Option | Use for |
|---|---|
| `--element <selector>` | Capture just one element (headline, chart) instead of the whole viewport — avoids crop/banner issues entirely |
| `--fullpage` | Capture the whole scrollable page |
| `--execute "<js>"` | Run JS before capture (e.g. dismiss a dialog) — unreliable for sites with React-managed banners, see below |
| `--format jpeg --quality 80` | Smaller files for photo-heavy pages |
| `--wait <ms>` | Let async content/ads settle before capture (1500–2000ms is typical) |

**Sticky newsletter/cookie banners:** many news sites have a banner fixed to
the viewport bottom that `--execute` click-to-dismiss often can't reliably
target (close buttons are frequently icon-only with no matching text/aria
label). Rather than fight it, capture with a tighter, explicit clip instead of
a full viewport screenshot — either pass a smaller `--height` so the capture
stops above where the banner docks, or for one-off cases run a short inline
Playwright script using `page.screenshot({ clip: { x, y, width, height } })`
to grab exactly the hero/content region needed.

Avoid the browser MCP tools (`mcp_chrome_devtoo_*`, `open_browser_page`) for
this — they've been unreliable for scripted, repeatable captures in this
repo. The Node script is deterministic and reruns identically every time.

### 2. Save to the right place


Save (or move) the file under:

```
static/screenshots/<lecture-slug>/<kebab-case-description>.<ext>
```

For example: `static/screenshots/social-science-in-a-hurry/sea-temperature-story.jpg`

Create the `static/` and `static/screenshots/<slug>/` folders if they don't
exist yet — this repo has no `static/` folder until the first asset is added.

### 3. Resize/optimize if needed

Use macOS's built-in `sips` (no install required) if the capture is larger
than necessary:

```sh
sips -Z 1600 static/screenshots/<slug>/<name>.jpg   # cap longest edge at 1600px
sips -s formatOptions 80 static/screenshots/<slug>/<name>.jpg  # re-compress JPEG
```

Aim for under ~300KB per image where possible — this is a static site with no
image optimization pipeline.

### 4. Wire it into the slide

In the `.svx` file, import `base` from `$app/paths` once at the top if it
isn't already imported, then replace the placeholder with an `<img>`:

```svelte
<script lang="ts">
  import Slide from '$lib/components/Slide.svelte';
  import Screenshot from '$lib/components/Screenshot.svelte';
  import { base } from '$app/paths';
</script>

<Slide>

<Screenshot url="reuters.com" label="Sea-temperature story headline">
  <img
    src="{base}/screenshots/social-science-in-a-hurry/sea-temperature-story.jpg"
    alt="Reuters headline and chart showing ocean temperature anomalies at record highs"
  />
</Screenshot>

</Slide>
```

- `url` on `<Screenshot>` is the fake browser-chrome address bar text (keep it
  short, e.g. `reuters.com`), not a real link.
- `label` is the accessible name for the screenshot frame's `role="group"`.
- `alt` on the `<img>` must describe the actual content for screen-reader
  users — never leave it empty or generic.
- Always prefix the `src` with `{base}` so images resolve correctly if the
  site is ever deployed under a subpath.

### 5. Verify

- Run `pnpm dev` and view the slide at `/lectures/<slug>/` to confirm the
  image renders, isn't stretched oddly, and fits the frame.
- Confirm the new file under `static/screenshots/` shows up in `git status`
  so it gets committed alongside the `.svx` change.

## Notes

- Don't screenshot paywalled or private content without checking it's okay to
  embed in class materials — prefer public story pages, archive links, or
  your own published work.
- If a story page has heavy ads/cookie banners, try `--element <selector>` to
  grab just the headline/hero region, or clip to a height that stops above
  where the banner docks (see the note in step 1) — `sips -c` center-crops,
  which rarely lines up with a bottom-docked banner.
