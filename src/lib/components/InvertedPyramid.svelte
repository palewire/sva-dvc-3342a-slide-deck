<svg
  class="inverted-pyramid"
  viewBox="0 0 800 600"
  role="img"
  aria-labelledby="inverted-pyramid-title inverted-pyramid-description"
>
  <title id="inverted-pyramid-title">The inverted pyramid</title>
  <desc id="inverted-pyramid-description">
    A downward-pointing triangle in three blue layers that fade from strong at the top to faint
    at the bottom. An arrow beside it runs from "Most important" at the top to "Least
    important" at the bottom.
  </desc>
  <defs>
    <clipPath id="inverted-pyramid-clip">
      <polygon points="30,50 570,50 300,570" />
    </clipPath>
  </defs>
  <g clip-path="url(#inverted-pyramid-clip)">
    <rect class="lead" x="0" y="50" width="600" height="150" />
    <rect class="details" x="0" y="200" width="600" height="160" />
    <rect class="background" x="0" y="360" width="600" height="220" />
  </g>
  <line class="arrow" x1="680" y1="150" x2="680" y2="490" />
  <polygon class="arrowhead" points="656,485 704,485 680,525" />
  <text class="end-label" x="680" y="108">Most important</text>
  <text class="end-label faint" x="680" y="568">Least important</text>
</svg>

<style>
  .inverted-pyramid {
    position: absolute;
    inset: 28px;
    display: block;
    width: calc(100% - 56px);
    height: calc(100% - 56px);
    font-family: var(--font-ui);
  }

  .lead {
    fill: var(--sva-blue);
  }

  .details {
    fill: color-mix(in srgb, var(--sva-blue) 55%, var(--white));
  }

  .background {
    fill: color-mix(in srgb, var(--sva-blue) 25%, var(--white));
  }

  .arrow {
    stroke: var(--sva-charcoal);
    stroke-width: 5;
    stroke-linecap: round;
  }

  .arrowhead {
    fill: var(--sva-charcoal);
  }

  .end-label {
    fill: var(--sva-charcoal);
    text-anchor: middle;
    font-size: 34px;
    font-weight: 700;
  }

  .end-label.faint {
    fill: color-mix(in srgb, var(--sva-charcoal) 75%, var(--white));
  }
</style>
