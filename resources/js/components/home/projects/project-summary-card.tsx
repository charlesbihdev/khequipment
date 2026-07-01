import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { ProjectMedia } from '@/components/home/projects/project-media';
import { ProjectStatus } from '@/components/home/projects/project-status';
import { show } from '@/routes/projects';
import type { HomepageProject } from '@/types/projects';

type ProjectSummaryCardProps = {
    project: HomepageProject;
};

export function ProjectSummaryCard({ project }: ProjectSummaryCardProps) {
    return (
        <article className="w-[calc(100vw-2rem)] shrink-0 overflow-hidden rounded-md border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:w-[calc((100vw-4rem)/2)] md:w-[calc((100vw-6rem)/3)] lg:w-[320px] xl:w-[330px]">
            <ProjectMedia project={project} compact />
            <div className="p-4">
                <ProjectStatus category={project.category} />
                {project.deliverable && (
                    <p className="mt-3 text-xs font-black tracking-wide text-brand-gold uppercase">
                        {project.deliverable}
                    </p>
                )}
                <h3 className="mt-3 line-clamp-2 text-xl leading-6 font-black text-foreground">
                    {project.title}
                </h3>
                {project.summary && (
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                        {project.summary}
                    </p>
                )}
                {(project.clientName || project.location) && (
                    <p className="mt-3 line-clamp-1 text-xs font-bold text-muted-foreground">
                        {[project.clientName, project.location]
                            .filter(Boolean)
                            .join(' | ')}
                    </p>
                )}
                <Link
                    href={show(project.slug)}
                    prefetch
                    className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-gold hover:text-foreground"
                >
                    Read story
                    <ArrowRight className="size-4" />
                </Link>
            </div>
        </article>
    );
}
