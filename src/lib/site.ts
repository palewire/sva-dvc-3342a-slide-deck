export const site = {
  title: 'Truth-Telling 101: Artists Meet Data Journalism'
} as const;

const canonicalBase = import.meta.env.VITE_CANONICAL_URL?.replace(/\/+$/, '');

export function canonicalFor(path: string): string | undefined {
  return canonicalBase ? `${canonicalBase}${path}` : undefined;
}
