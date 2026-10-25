import type { Component } from 'svelte';
import type { LectureSlug } from './lectures';
import SocialScienceInAHurry from './presentations/social-science-in-a-hurry.svx';
import SampleNext from './presentations/sample-next.svx';
import PeelingTheOnion from './presentations/peeling-the-onion.svx';

// Every listed lecture has its own MDsveX presentation.
export const presentations: Record<LectureSlug, Component> = {
  'social-science-in-a-hurry': SocialScienceInAHurry,
  'sample-next': SampleNext,
  'peeling-the-onion': PeelingTheOnion
};
