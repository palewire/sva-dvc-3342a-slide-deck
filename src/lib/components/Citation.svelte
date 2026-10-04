<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    href,
    children
  }: {
    href?: string;
    children: Snippet;
  } = $props();
</script>

<p class="slide-citation">
  {#if href}
    <a {href} target="_blank" rel="noopener noreferrer">{@render children()}</a>
  {:else}
    {@render children()}
  {/if}
</p>
