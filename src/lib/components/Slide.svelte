<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    variant = 'standard',
    id = null,
    animate = false,
    restart = false,
    children
  }: {
    variant?: 'standard' | 'title' | 'section' | 'statement' | 'quote';
    id?: string | null;
    animate?: boolean;
    restart?: boolean;
    children: Snippet;
  } = $props();
</script>

<section
  class="lecture-slide prose max-w-none"
  class:title-slide={variant === 'title'}
  class:section-slide={variant === 'section'}
  class:statement-slide={variant === 'statement'}
  class:quote-slide={variant === 'quote'}
  data-auto-animate-id={id}
  data-auto-animate={animate || null}
  data-auto-animate-restart={restart || null}
>
  {@render children()}
</section>
