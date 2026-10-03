export type Lecture = {
  slug: string;
  title: string;
  description: string;
};

// These are starter examples, not scheduled class meetings.
export const lectures = [
  {
    slug: 'sample-opening',
    title: 'Interview the Data',
    description: 'A sample opening deck with a title, an idea, and speaker notes.'
  },
  {
    slug: 'sample-next',
    title: 'Your Next Lecture',
    description: 'A second deck showing how independent lectures share the same design.'
  }
] as const satisfies readonly Lecture[];

export type LectureSlug = (typeof lectures)[number]['slug'];

export function findLecture(slug: string) {
  return lectures.find((lecture) => lecture.slug === slug);
}
