<svg
  class="inverted-pyramid"
  viewBox="0 0 600 600"
  role="img"
  aria-labelledby="inverted-pyramid-title inverted-pyramid-description"
>
  <title id="inverted-pyramid-title">The inverted pyramid</title>
  <desc id="inverted-pyramid-description">
    A downward-pointing triangle in three blue layers that grow lighter and narrower from top
    to bottom: the lead with the most important facts, key details, and background.
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
  <text class="layer-label" x="300" y="115">
    <tspan x="300">The lead</tspan>
    <tspan class="layer-sub" x="300" dy="30">Who, what, when, where, why</tspan>
  </text>
  <text class="layer-label dark" x="300" y="287">Key details</text>
  <text class="layer-label dark" x="300" y="415">Background</text>
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
    fill: color-mix(in srgb, var(--sva-blue) 70%, var(--white));
  }

  .background {
    fill: color-mix(in srgb, var(--sva-blue) 50%, var(--white));
  }

  .layer-label {
    fill: var(--white);
    text-anchor: middle;
    font-size: 28px;
    font-weight: 700;
  }

  .layer-label.dark {
    fill: var(--sva-charcoal);
  }

  .layer-sub {
    font-size: 19px;
    font-weight: 600;
  }
</style>
