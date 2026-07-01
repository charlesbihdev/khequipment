import { ProjectCategoryLabel } from '@/components/projects/show/project-category-label';
import { ProjectContent } from '@/components/projects/show/project-content';
import { ProjectCoverMedia } from '@/components/projects/show/project-cover-media';
import { ProjectMetaSidebar } from '@/components/projects/show/project-meta-sidebar';
import type { ProjectDetail } from '@/types/projects';

type ProjectArticleProps = {
    project: ProjectDetail;
};

export function ProjectArticle({ project }: ProjectArticleProps) {
    return (
        <section className="py-14 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
                <ProjectMetaSidebar project={project} />

                <article className="min-w-0">
                    <ProjectCoverMedia project={project} />
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                        <ProjectCategoryLabel category={project.category} />
                        {project.deliverable && (
                            <span className="text-sm font-black tracking-wide text-brand-gold uppercase">
                                {project.deliverable}
                            </span>
                        )}
                    </div>
                    <ProjectContent project={project} />
                </article>
            </div>
        </section>
    );
}
