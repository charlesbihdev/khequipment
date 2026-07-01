import { CalendarDays, MapPin } from 'lucide-react';
import { ProjectDetailBlock } from '@/components/projects/show/project-detail-block';
import type { ProjectDetail } from '@/types/projects';

type ProjectMetaSidebarProps = {
    project: ProjectDetail;
};

export function ProjectMetaSidebar({ project }: ProjectMetaSidebarProps) {
    return (
        <aside className="space-y-5">
            {project.status && (
                <ProjectDetailBlock label="Status">
                    {project.status}
                </ProjectDetailBlock>
            )}
            {project.clientName && (
                <ProjectDetailBlock label="Client">
                    {project.clientName}
                </ProjectDetailBlock>
            )}
            {project.location && (
                <ProjectDetailBlock label="Location">
                    <span className="inline-flex items-center gap-2">
                        <MapPin className="size-4" />
                        {project.location}
                    </span>
                </ProjectDetailBlock>
            )}
            {(project.startedAt || project.completedAt) && (
                <ProjectDetailBlock label="Timeline">
                    <span className="inline-flex items-center gap-2">
                        <CalendarDays className="size-4" />
                        {[project.startedAt, project.completedAt]
                            .filter(Boolean)
                            .join(' - ')}
                    </span>
                </ProjectDetailBlock>
            )}
        </aside>
    );
}
