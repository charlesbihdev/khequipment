import type { ProjectDetail } from '@/types/projects';

type ProjectCoverMediaProps = {
    project: ProjectDetail;
};

export function ProjectCoverMedia({ project }: ProjectCoverMediaProps) {
    if (!project.mediaUrl) {
        return null;
    }

    return (
        <figure className="mb-10 overflow-hidden rounded-md border border-border bg-card shadow-sm">
            {project.mediaType === 'video' ? (
                <video
                    src={project.mediaUrl}
                    className="aspect-video w-full bg-black object-cover"
                    controls
                    playsInline
                />
            ) : (
                <img
                    src={project.mediaUrl}
                    alt={project.title}
                    className="aspect-video w-full object-cover"
                />
            )}
        </figure>
    );
}
