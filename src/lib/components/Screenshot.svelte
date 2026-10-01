<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    url,
    label = 'Screenshot',
    children
  }: {
    url: string;
    label?: string;
    children: Snippet;
  } = $props();
</script>

<div class="screenshot-frame not-prose" role="group" aria-label={label}>
  <div class="screenshot-bar">
    <span class="screenshot-dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="screenshot-url">{url}</span>
  </div>
  <div class="screenshot-content">
    {@render children()}
  </div>
</div>
