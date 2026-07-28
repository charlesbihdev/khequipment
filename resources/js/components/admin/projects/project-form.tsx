import { Link, useForm } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { AdminFormShell } from '@/components/admin/admin-form-shell';
import {
    MediaFields,
    ProjectIdentityFields,
    ProjectMetadataFields,
    ProjectSummaryField,
} from '@/components/admin/projects/project-form-sections';
import type {
    AdminProject,
    ProjectFormData,
} from '@/components/admin/projects/project-form-types';
import { ProjectPublicationControls } from '@/components/admin/projects/project-publication-controls';
import { ProjectContentEditor } from '@/components/projects/project-content-editor';
import { Button } from '@/components/ui/button';
import { prepareTiptapContent } from '@/lib/tiptap-uploader';
import projects from '@/routes/admin/projects';
import type { RouteFormDefinition } from '@/wayfinder';

export type { AdminProject } from '@/components/admin/projects/project-form-types';

type Props = {
    action: RouteFormDefinition<'post'>;
    project?: AdminProject;
};

export function ProjectForm({ action, project }: Props) {
    const method =
        new URL(action.action, window.location.origin).searchParams.get(
            '_method',
        ) ?? undefined;
    const { data, setData, post, processing, errors, transform } =
        useForm<ProjectFormData>({
            title: project?.title ?? '',
            slug: project?.slug ?? '',
            category: project?.category ?? 'project',
            deliverable: project?.deliverable ?? '',
            client_name: project?.client_name ?? '',
            location: project?.location ?? '',
            summary: project?.summary ?? '',
            content: project?.content ?? '',
            status: project?.status ?? 'delivered',
            started_at: project?.started_at ?? '',
            completed_at: project?.completed_at ?? '',
            sort_order: String(project?.sort_order ?? 0),
            cover_media_type: project?.cover_media_type ?? 'image',
            cover_media: null,
            is_featured: project?.is_featured ?? true,
            is_published: project?.is_published ?? true,
            _method: method,
        });

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const prepared = prepareTiptapContent(data.content);

        transform((current) => ({
            ...current,
            content: prepared.content,
            images: prepared.files.length > 0 ? prepared.files : undefined,
            _method: method,
        }));

        post(action.action, { forceFormData: true, preserveScroll: true });
    }

    return (
        <form onSubmit={submit} className="max-w-5xl">
            <AdminFormShell>
                <ProjectIdentityFields
                    data={data}
                    errors={errors}
                    setData={setData}
                />
                <ProjectMetadataFields
                    data={data}
                    errors={errors}
                    setData={setData}
                />
                <ProjectSummaryField
                    data={data}
                    errors={errors}
                    setData={setData}
                />
                <ProjectContentEditor
                    value={data.content}
                    onChange={(html) => setData('content', html)}
                    error={errors.content}
                />
                <MediaFields
                    project={project}
                    data={data}
                    errors={errors}
                    setData={setData}
                />
                <ProjectPublicationControls
                    isPublished={data.is_published}
                    isFeatured={data.is_featured}
                    onPublishedChange={(checked) => {
                        setData('is_published', checked);

                        if (!checked) {
                            setData('is_featured', false);
                        }
                    }}
                    onFeaturedChange={(checked) =>
                        setData('is_featured', checked)
                    }
                />
                <div className="flex gap-3">
                    <Button
                        disabled={processing}
                        className="bg-brand-gold text-brand-gold-foreground hover:bg-brand-gold/90"
                    >
                        Save project
                    </Button>
                    <Button asChild variant="outline">
                        <Link href={projects.index()}>Cancel</Link>
                    </Button>
                </div>
            </AdminFormShell>
        </form>
    );
}
