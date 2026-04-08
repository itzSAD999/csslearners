import { PageShell } from "@/components/ui/page-shell";
import { StatusPill } from "@/components/ui/status-pill";
import { guideVideos } from "@/lib/mock-data";

type VideosPageProps = {
  params: Promise<{ school: string; program: string; year: string; course: string }>;
};

export default async function VideosPage({ params }: VideosPageProps) {
  const { school, program, year, course } = await params;
  const basePath = `/${school}/${program}/${year}/${course}`;

  return (
    <PageShell
      title="Guide Videos"
      description="Software installation walkthroughs and learning guides. Evergreen content that carries across all academic years."
      badges={["🎬 Videos", "Evergreen"]}
      context={course.toUpperCase()}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: course.toUpperCase(), href: basePath },
        { label: "Videos" },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {guideVideos.map((video) => (
          <a
            key={video.id}
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-sm card-hover"
          >
            {/* Thumbnail placeholder */}
            <div className="relative bg-gradient-to-br from-[var(--blue-100)] to-[var(--blue-200)] p-8 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform duration-200">
                <svg className="h-6 w-6 text-[var(--accent)] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              {video.isPlatformWide && (
                <span className="absolute top-3 right-3 rounded-full bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-[var(--accent)]">
                  🌐 Platform-wide
                </span>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-center gap-1.5 mb-2">
                {video.isEvergreen && (
                  <StatusPill label="Evergreen" tone="success" size="sm" />
                )}
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                {video.title}
              </h3>
              <p className="mt-1 text-xs text-[var(--text-secondary)] line-clamp-2">
                {video.description}
              </p>

              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[var(--accent)]">
                <span>Watch on YouTube</span>
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </PageShell>
  );
}
