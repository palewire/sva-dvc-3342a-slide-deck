<script lang="ts">
  import { onMount, type Component } from 'svelte';
  import Reveal from 'reveal.js';
  import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js';

  import 'reveal.js/dist/reveal.css';

  let { Presentation }: { Presentation: Component } = $props();
  let container: HTMLDivElement;

  function option(name: string, fallback: boolean): boolean {
    const value = new URLSearchParams(window.location.search).get(name);
    return value === null ? fallback : value !== 'false' && value !== '0';
  }

  onMount(() => {
    const mobile = () => window.innerWidth < 768;
    const deck = new Reveal(container, {
      autoAnimateEasing: 'ease',
      autoAnimateDuration: 1,
      controls: option('controls', mobile()),
      progress: option('progress', false),
      hash: true,
      center: false,
      margin: 0.04,
      minScale: 0.35,
      width: mobile() ? 480 : 960,
      height: 760,
      plugins: [RevealNotes]
    });

    const onResize = () => {
      deck.configure({ width: mobile() ? 480 : 960 });
      deck.layout();
    };
    window.addEventListener('resize', onResize);

    void deck
      .initialize()
      .then(() => {
        for (const image of container.querySelectorAll('img')) {
          if (!image.complete) {
            image.addEventListener('load', () => deck.layout(), { once: true });
            image.addEventListener('error', () => deck.layout(), { once: true });
          }
        }
        deck.layout();
      })
      .catch((error: unknown) => console.error('Could not start the slide deck', error));

    return () => {
      window.removeEventListener('resize', onResize);
      deck.destroy();
    };
  });
</script>

<div class="reveal" bind:this={container}>
  <div class="slides">
    <Presentation />
  </div>
</div>
