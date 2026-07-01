import { Head } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ProjectForm } from '@/components/admin/projects/project-form';
import projects from '@/routes/admin/projects';

export default function CreateProject() {
    return (
        <>
            <Head title="Add project" />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Add project" />
                <ProjectForm action={projects.store.form()} />
            </div>
        </>
    );
}
