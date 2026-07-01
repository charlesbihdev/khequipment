import type { HomepageProject } from '@/types/projects';

type ProjectMediaProps = {
    project: HomepageProject;
    compact?: boolean;
};

export function ProjectMedia({ project, compact = false }: ProjectMediaProps) {
    const mediaClassName = compact
        ? 'aspect-video w-full bg-white object-contain p-3'
        : 'h-full min-h-[320px] w-full object-cover';

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
                className={mediaClassName}
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
            className={mediaClassName}
            loading="lazy"
        />
    );
}
