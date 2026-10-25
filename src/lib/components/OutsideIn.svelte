<svg
  class="outside-in"
  viewBox="0 0 600 600"
  role="img"
  aria-labelledby="outside-in-title outside-in-description"
>
  <title id="outside-in-title">Working from the outside in</title>
  <desc id="outside-in-description">
    Four concentric blue circles grow darker toward the center: secondary sources, primary
    documents, human sources and the main subject of the investigation.
  </desc>
  <circle class="secondary" cx="300" cy="300" r="280" />
  <circle class="primary" cx="300" cy="300" r="205" />
  <circle class="human" cx="300" cy="300" r="130" />
  <circle class="subject" cx="300" cy="300" r="55" />
  <defs>
    <path id="outside-in-secondary-arc" d="M 68 300 A 232 232 0 0 1 532 300" />
    <path id="outside-in-primary-arc" d="M 143 300 A 157 157 0 0 1 457 300" />
    <path id="outside-in-human-arc" d="M 218 300 A 82 82 0 0 1 382 300" />
  </defs>
  <text>
    <textPath href="#outside-in-secondary-arc" startOffset="50%">Secondary sources</textPath>
  </text>
  <text>
    <textPath href="#outside-in-primary-arc" startOffset="50%">Primary documents</textPath>
  </text>
  <text>
    <textPath href="#outside-in-human-arc" startOffset="50%">Human sources</textPath>
  </text>
  <text class="subject-label" x="300" y="293">
    <tspan x="300">Main</tspan>
    <tspan x="300" dy="27">subject</tspan>
  </text>
</svg>

<style>
  .outside-in {
    position: absolute;
    inset: 28px;
    display: block;
    width: calc(100% - 56px);
    height: calc(100% - 56px);
    font-family: var(--font-ui);
  }

  .secondary {
    fill: color-mix(in srgb, var(--sva-blue) 50%, var(--white));
  }

  .primary {
    fill: color-mix(in srgb, var(--sva-blue) 65%, var(--white));
  }

  .human {
    fill: color-mix(in srgb, var(--sva-blue) 80%, var(--white));
  }

  .subject {
    fill: var(--sva-blue);
  }

  text {
    fill: var(--white);
    text-anchor: middle;
    font-size: 26px;
    font-weight: 700;
  }

  .subject-label {
    fill: var(--white);
    font-size: 23px;
  }
</style>
