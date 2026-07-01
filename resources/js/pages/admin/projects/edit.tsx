import { Head } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ProjectForm, type AdminProject } from '@/components/admin/projects/project-form';
import projects from '@/routes/admin/projects';

export default function EditProject({ project }: { project: AdminProject }) {
    return (
        <>
            <Head title={`Edit ${project.title}`} />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Edit project" />
                <ProjectForm action={projects.update.form(project.id)} project={project} />
            </div>
        </>
    );
}
