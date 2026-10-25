<svg
  class="outside-in"
  viewBox="0 0 900 500"
  role="img"
  aria-labelledby="outside-in-title outside-in-description"
>
  <title id="outside-in-title">Working from the outside in</title>
  <desc id="outside-in-description">
    Three concentric circles represent secondary sources, primary documents and human sources.
    The main subject of the investigation is at the center.
  </desc>
  <circle class="secondary" cx="450" cy="250" r="235" />
  <circle class="primary" cx="450" cy="250" r="165" />
  <circle class="human" cx="450" cy="250" r="95" />
  <text x="450" y="75">Secondary sources</text>
  <text x="450" y="145">Primary documents</text>
  <text x="450" y="220">Human sources</text>
  <text class="subject" x="450" y="280">Main subject</text>
</svg>

<style>
  .outside-in {
    display: block;
    width: 100%;
    max-height: 420px;
    margin: 0 auto;
    font-family: var(--font-ui);
  }

  circle {
    stroke: var(--sva-blue);
    stroke-width: 2;
  }

  .secondary {
    fill: var(--surface);
  }

  .primary {
    fill: var(--white);
  }

  .human {
    fill: var(--sva-cyan);
  }

  text {
    fill: var(--sva-charcoal);
    text-anchor: middle;
    font-size: 25px;
    font-weight: 700;
  }

  .subject {
    fill: var(--sva-charcoal);
    font-size: 24px;
  }
</style>
