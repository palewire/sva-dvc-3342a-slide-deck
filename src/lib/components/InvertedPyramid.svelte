<svg
  class="inverted-pyramid"
  viewBox="0 0 600 600"
  role="img"
  aria-labelledby="inverted-pyramid-title inverted-pyramid-description"
>
  <title id="inverted-pyramid-title">The inverted pyramid</title>
  <desc id="inverted-pyramid-description">
    A downward-pointing triangle in three blue layers that fade from strong at the top to faint
    at the bottom. An arrow down its center runs from "Most important" at the top to "Least
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
  <line class="arrow" x1="300" y1="150" x2="300" y2="345" />
  <polygon class="arrowhead" points="278,340 322,340 300,382" />
  <text class="end-label top" x="300" y="112">Most important</text>
  <text class="end-label bottom" x="300" y="420">
    <tspan x="300">Least</tspan>
    <tspan x="300" dy="25">important</tspan>
  </text>
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
    stroke: black;
    stroke-width: 5;
    stroke-linecap: round;
  }

  .arrowhead {
    fill: black;
  }

  .end-label {
    fill: black;
    text-anchor: middle;
    font-size: 30px;
    font-weight: 700;
  }

  .end-label.top {
    fill: var(--white);
  }

  .end-label.bottom {
    font-size: 24px;
  }
</style>
