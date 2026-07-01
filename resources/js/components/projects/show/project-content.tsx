import TiptapRenderer from '@/components/tiptap-renderer';
import type { ProjectDetail } from '@/types/projects';

type ProjectContentProps = {
    project: ProjectDetail;
};

export function ProjectContent({ project }: ProjectContentProps) {
    if (project.content) {
        return (
            <TiptapRenderer
                content={project.content}
                className="prose-lg"
            />
        );
    }

    return (
        <p className="text-xl leading-8 text-muted-foreground">
            {project.summary}
        </p>
    );
}
