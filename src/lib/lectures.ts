export type Lecture = {
  slug: string;
  title: string;
  description: string;
};

// sample-next remains a starter example, not a scheduled class meeting.
export const lectures = [
  {
    slug: 'social-science-in-a-hurry',
    title: 'Social science in a hurry',
    description: 'Week 1: why data journalism blends statistical analysis with reporting.'
  },
  {
    slug: 'sample-next',
    title: 'Your next lecture',
    description: 'A second deck showing how independent lectures share the same design.'
  }
] as const satisfies readonly Lecture[];

export type LectureSlug = (typeof lectures)[number]['slug'];

export function findLecture(slug: string) {
  return lectures.find((lecture) => lecture.slug === slug);
}
