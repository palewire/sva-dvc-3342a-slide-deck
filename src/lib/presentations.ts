import type { Component } from 'svelte';
import type { LectureSlug } from './lectures';
import SampleOpening from './presentations/sample-opening.svx';
import SampleNext from './presentations/sample-next.svx';

// Every listed lecture has its own MDsveX presentation.
export const presentations: Record<LectureSlug, Component> = {
  'sample-opening': SampleOpening,
  'sample-next': SampleNext
};
