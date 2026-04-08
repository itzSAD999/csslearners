import { CourseSidebar } from "@/components/layout/sidebar";

type CourseLayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    school: string;
    program: string;
    year: string;
    course: string;
  }>;
};

export default async function CourseLayout({
  children,
  params,
}: CourseLayoutProps) {
  const { school, program, year, course } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <CourseSidebar basePath={basePath} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
