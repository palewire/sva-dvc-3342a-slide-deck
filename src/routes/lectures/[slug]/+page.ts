import { error } from '@sveltejs/kit';
import { findLecture, lectures } from '$lib/lectures';
import type { PageLoad } from './$types';

export const ssr = false;

export const entries = () => lectures.map(({ slug }) => ({ slug }));

export const load: PageLoad = ({ params }) => {
  const lecture = findLecture(params.slug);
  if (!lecture) error(404, 'Lecture not found');
  return { lecture };
};
