<script lang="ts">
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<aside class="notes">
  {@render children()}
</aside>
