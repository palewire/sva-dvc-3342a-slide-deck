<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    url,
    href,
    label = 'Screenshot',
    children
  }: {
    url: string;
    href?: string;
    label?: string;
    children: Snippet;
  } = $props();
</script>

<div class="screenshot-frame not-prose" role="group" aria-label={label}>
  <div class="screenshot-bar">
    <span class="screenshot-dots" aria-hidden="true"><i></i><i></i><i></i></span>
    {#if href}
      <a class="screenshot-url" {href} target="_blank" rel="noopener noreferrer">{url}</a>
    {:else}
      <span class="screenshot-url">{url}</span>
    {/if}
  </div>
  <div class="screenshot-content">
    {@render children()}
  </div>
</div>
