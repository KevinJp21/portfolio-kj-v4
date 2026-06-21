import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

type BlogHref = ComponentProps<typeof Link>["href"];

type ProjectCardProps = {
  project: Project;
  index?: number;
  href?: BlogHref;
  ctaLabel?: string;
  idPrefix?: string;
  className?: string;
};

export function ProjectCard({
  project,
  index = 0,
  href = { pathname: "/blog/[slug]", params: { slug: project.slug } },
  ctaLabel = "Ver artículo",
  idPrefix = "project",
  className,
}: ProjectCardProps) {
  const reversed = index % 2 === 1;

  return (
    <li
      id={`${idPrefix}-${project.slug}`}
      className={cn("project-card scroll-mt-32", className)}
    >
      <Link
        href={href}
        data-cursor="cta"
        data-cursor-label={project.title}
        className="group block overflow-hidden rounded-2xl border border-rule-soft bg-ink-850/30 transition-colors hover:border-rule-strong hover:bg-ink-850/50"
      >
        <span
          className="project-card-accent block h-0.5 origin-left"
          style={{ backgroundColor: project.accent }}
          aria-hidden
        />

        <div
          className={cn(
            "grid gap-0 md:grid-cols-2",
            reversed && "md:[&>*:first-child]:order-2"
          )}
        >
          <div className="project-card-image relative aspect-4/3 overflow-hidden bg-ink-800 md:aspect-auto md:min-h-[320px]">
            <div className="project-card-image-inner absolute inset-0 will-change-transform">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-ink-900/80 via-ink-900/20 to-transparent"
                aria-hidden
              />
              <div
                className="absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-500 group-hover:opacity-30"
                style={{ backgroundColor: project.accent }}
                aria-hidden
              />
            </div>

            <div className="project-card-meta absolute left-5 top-5 flex flex-wrap items-center gap-2">
              <span className="chip-mono rounded-full border border-rule-soft bg-ink-900/70 px-2.5 py-1 text-bone-100 backdrop-blur-sm">
                {project.index}
              </span>
              <span className="chip-mono rounded-full border border-rule-soft bg-ink-900/70 px-2.5 py-1 text-bone-300 backdrop-blur-sm">
                {project.year}
              </span>
              <span className="chip-mono rounded-full border border-rule-soft bg-ink-900/70 px-2.5 py-1 text-bone-300 backdrop-blur-sm">
                {project.category}
              </span>
            </div>
          </div>

          <div className="project-card-body flex flex-col justify-between p-6 md:p-8">
            <div>
              <p className="chip-mono text-bone-500">{project.role}</p>
              <h3 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05] text-bone-100 transition-colors group-hover:text-bone-50">
                {project.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-400">
                {project.subtitle}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-rule-soft pt-6">
              <ul className="flex flex-wrap gap-2">
                {project.stack.slice(0, 4).map((tech) => (
                  <li
                    key={tech}
                    className="chip-mono rounded-full border border-rule px-2.5 py-1 text-[10px] text-bone-400"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <span className="project-card-arrow inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-400 transition-colors group-hover:text-signal">
                {ctaLabel}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
