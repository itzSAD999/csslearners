import { toTitleCase } from "@/lib/routes";

type SectionPageProps = {
  params: Promise<{
    school: string;
    program: string;
    year: string;
    course: string;
    section: string;
  }>;
};

export default async function SectionPage({ params }: SectionPageProps) {
  const { school, program, year, course, section } = await params;

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">
        {course.toUpperCase()} - {toTitleCase(section)}
      </h1>
      <p className="mt-3 text-slate-600">
        This section page is ready for data wiring and filtering.
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Route: /{school}/{program}/{year}/{course}/{section}
      </p>
    </main>
  );
}
