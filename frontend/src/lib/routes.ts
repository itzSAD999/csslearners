export const courseSections = [
  "assignments",
  "passco",
  "verified-questions",
  "practice",
  "videos",
  "breakdown",
  "lectures",
  "slides",
] as const;

export type CourseSection = (typeof courseSections)[number];

export function toTitleCase(value: string): string {
  return value
    .replaceAll("-", " ")
    .split(" ")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");
}

export function buildCoursePath(
  school: string,
  program: string,
  year: string,
  course: string,
  section?: CourseSection
): string {
  const base = `/${school}/${program}/${year}/${course}`;
  return section ? `${base}/${section}` : base;
}
