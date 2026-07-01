import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import type { ProjectDetail } from '@/types/projects';

type ProjectHeroProps = {
    project: ProjectDetail;
    nav: ReactNode;
};

export function ProjectHero({ project, nav }: ProjectHeroProps) {
    return (
        <section className="relative overflow-hidden bg-foreground pt-28 text-white">
            {project.mediaUrl && (
                <>
                    {project.mediaType === 'video' ? (
                        <video
                            src={project.mediaUrl}
                            className="absolute inset-0 size-full object-cover opacity-35"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            src={project.mediaUrl}
                            alt=""
                            className="absolute inset-0 size-full object-cover opacity-35"
                        />
                    )}
                </>
            )}
            <div className="absolute inset-0 bg-foreground/84" />
            {nav}

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <Link
                    href="/#projects"
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-lg font-bold text-white/85 transition hover:border-brand-gold hover:text-brand-gold"
                >
                    <ArrowLeft className="size-5" />
                    Back to projects
                </Link>

                <div className="mt-10 max-w-4xl">
                    {project.deliverable && (
                        <p className="text-lg font-black tracking-wide text-brand-gold uppercase">
                            {project.deliverable}
                        </p>
                    )}
                    <h1 className="mt-4 text-5xl leading-tight font-extrabold sm:text-7xl">
                        {project.title}
                    </h1>
                    {project.summary && (
                        <p className="mt-6 max-w-3xl text-2xl leading-9 font-semibold text-white/75">
                            {project.summary}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
