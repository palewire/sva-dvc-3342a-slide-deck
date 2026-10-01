<script lang="ts">
  import type { PageData } from './$types';
  import Deck from '$lib/components/Deck.svelte';
  import { presentations } from '$lib/presentations';
  import { canonicalFor, site } from '$lib/site';

  let { data }: { data: PageData } = $props();
  let Presentation = $derived(presentations[data.lecture.slug]);
  let canonical = $derived(canonicalFor(`/lectures/${data.lecture.slug}/`));
</script>

<svelte:head>
  <title>{data.lecture.title} | {site.title}</title>
  <meta name="description" content={data.lecture.description} />
  {#if canonical}<link rel="canonical" href={canonical} />{/if}
</svelte:head>

<main class="deck-main" id="main-content">
  <Deck {Presentation} />
</main>
