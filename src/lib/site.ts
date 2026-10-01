export const site = {
  title: 'Truth-Telling 101: Artists Meet Data Journalism',
  courseCode: 'DVC-3342-A',
  school: 'School of Visual Arts',
  description:
    'A starting point for Ben Welsh’s Truth-Telling 101 lecture slides at the School of Visual Arts.'
} as const;

const canonicalBase = import.meta.env.VITE_CANONICAL_URL?.replace(/\/+$/, '');

export function canonicalFor(path = '/'): string | undefined {
  return canonicalBase ? `${canonicalBase}${path}` : undefined;
}
