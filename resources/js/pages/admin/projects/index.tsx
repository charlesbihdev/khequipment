import { Head, Link } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminPagination } from '@/components/admin/admin-pagination';
import { AdminTable, EmptyTableRow } from '@/components/admin/admin-table';
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button';
import { Button } from '@/components/ui/button';
import projectsRoute from '@/routes/admin/projects';
import type { Paginator } from '@/types';

type ProjectRow = {
    id: number;
    title: string;
    category: string;
    isFeatured: boolean;
    isPublished: boolean;
    mediaUrl: string | null;
};

export default function ProjectsIndex({ projects }: { projects: Paginator<ProjectRow> }) {
    return (
        <>
            <Head title="Projects" />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Projects" description="Manage completed work, contracts, and service stories." action={{ label: 'Add project', href: projectsRoute.create() }} />
                <AdminTable>
                    <thead className="bg-muted/50 text-left"><tr><th className="px-4 py-3">Project</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Visibility</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
                    <tbody className="divide-y">
                        {projects.data.length === 0 && <EmptyTableRow colSpan={4} label="No projects yet." />}
                        {projects.data.map((project) => (
                            <tr key={project.id}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-14 w-20 rounded-md border bg-white p-1">{project.mediaUrl && <img src={project.mediaUrl} alt="" className="size-full object-contain" />}</div>
                                        <span className="font-semibold">{project.title}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{project.category}</td>
                                <td className="px-4 py-3">{project.isPublished ? 'Published' : 'Draft'} · {project.isFeatured ? 'Featured' : 'Not featured'}</td>
                                <td className="px-4 py-3"><div className="flex justify-end gap-2"><Button asChild size="sm" variant="outline"><Link href={projectsRoute.edit(project.id)}>Edit</Link></Button><ConfirmDeleteButton form={projectsRoute.destroy.form(project.id)} title="Delete project?" /></div></td>
                            </tr>
                        ))}
                    </tbody>
                </AdminTable>
                <AdminPagination links={projects.links} />
            </div>
        </>
    );
}
