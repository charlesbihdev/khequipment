import type { HomepageProject } from '@/types/projects';

type ProjectMediaProps = {
    project: HomepageProject;
    compact?: boolean;
};

export function ProjectMedia({ project, compact = false }: ProjectMediaProps) {
    if (!project.mediaUrl) {
        return (
            <div
                className={`bg-muted ${compact ? 'aspect-video' : 'min-h-[320px]'}`}
            />
        );
    }

    if (project.mediaType === 'video') {
        return (
            <video
                src={project.mediaUrl}
                className={`${compact ? 'aspect-video' : 'h-full min-h-[320px]'} w-full object-cover`}
                autoPlay
                muted
                loop
                playsInline
            />
        );
    }

    return (
        <img
            src={project.mediaUrl}
            alt={project.title}
            className={`${compact ? 'aspect-video' : 'h-full min-h-[320px]'} w-full object-cover`}
            loading="lazy"
        />
    );
}
