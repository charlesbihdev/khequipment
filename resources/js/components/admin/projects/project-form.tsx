import { Link, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { AdminFormShell } from '@/components/admin/admin-form-shell';
import { SingleMediaUploadPreview } from '@/components/admin/media-upload-preview';
import { RequiredLabel } from '@/components/admin/required-label';
import { ProjectContentEditor } from '@/components/projects/project-content-editor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { prepareTiptapContent } from '@/lib/tiptap-uploader';
import projects from '@/routes/admin/projects';
import { useRef } from 'react';
import type { FormEvent } from 'react';
import type { RouteFormDefinition } from '@/wayfinder';

export type AdminProject = {
    id: number;
    title: string;
    slug: string;
    category: string;
    deliverable: string | null;
    client_name: string | null;
    location: string | null;
    summary: string | null;
    content: string | null;
    status: string;
    started_at: string | null;
    completed_at: string | null;
    cover_media_type: 'image' | 'video';
    is_featured: boolean;
    is_published: boolean;
    sort_order: number;
    mediaUrl?: string | null;
};

type Props = {
    action: RouteFormDefinition<'post'>;
    project?: AdminProject;
};

type ProjectFormData = {
    title: string;
    slug: string;
    category: string;
    deliverable: string;
    client_name: string;
    location: string;
    summary: string;
    content: string;
    status: string;
    started_at: string;
    completed_at: string;
    sort_order: string;
    cover_media_type: 'image' | 'video';
    cover_media: File | null;
    images?: File[];
    is_featured: boolean;
    is_published: boolean;
    _method?: string;
};

export function ProjectForm({ action, project }: Props) {
    const method = new URL(action.action, window.location.origin).searchParams.get('_method') ?? undefined;
    const finalContentRef = useRef<string | null>(null);
    const imagesRef = useRef<File[]>([]);
    const { data, setData, post, processing, errors, transform } = useForm<ProjectFormData>({
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

    transform((current) => ({
        ...current,
        content: finalContentRef.current ?? current.content,
        images: imagesRef.current.length > 0 ? imagesRef.current : undefined,
        _method: method,
    }));

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const prepared = prepareTiptapContent(data.content);
        finalContentRef.current = prepared.content;
        imagesRef.current = prepared.files;
        post(action.action, { forceFormData: true, preserveScroll: true });
    }

    return (
        <form onSubmit={submit} className="max-w-5xl">
            <AdminFormShell>
                <div className="grid gap-5 md:grid-cols-2">
                    <Field name="title" label="Title" value={data.title} error={errors.title} required onChange={(value) => setData('title', value)} />
                    <Field name="slug" label="Slug" value={data.slug} error={errors.slug} placeholder="Auto-generated if blank" onChange={(value) => setData('slug', value)} />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    <Field name="category" label="Category" value={data.category} error={errors.category} required onChange={(value) => setData('category', value)} />
                    <Field name="deliverable" label="Deliverable" value={data.deliverable} error={errors.deliverable} onChange={(value) => setData('deliverable', value)} />
                    <Field name="status" label="Status" value={data.status} error={errors.status} required onChange={(value) => setData('status', value)} />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                    <Field name="client_name" label="Client" value={data.client_name} error={errors.client_name} onChange={(value) => setData('client_name', value)} />
                    <Field name="location" label="Location" value={data.location} error={errors.location} onChange={(value) => setData('location', value)} />
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    <Field name="started_at" label="Started" type="date" value={data.started_at} error={errors.started_at} onChange={(value) => setData('started_at', value)} />
                    <Field name="completed_at" label="Completed" type="date" value={data.completed_at} error={errors.completed_at} onChange={(value) => setData('completed_at', value)} />
                    <Field name="sort_order" label="Sort order" type="number" value={data.sort_order} error={errors.sort_order} onChange={(value) => setData('sort_order', value)} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="summary">Summary</Label>
                    <textarea id="summary" value={data.summary} onChange={(event) => setData('summary', event.target.value)} rows={3} className="rounded-md border bg-background px-3 py-2 text-sm" />
                    <InputError message={errors.summary} />
                </div>

                <ProjectContentEditor value={data.content} onChange={(html) => setData('content', html)} error={errors.content} />
                <MediaFields project={project} data={data} errors={errors} setData={setData} />

                <div className="flex flex-wrap gap-5">
                    <label className="flex items-center gap-3">
                        <Checkbox checked={data.is_featured} onCheckedChange={(checked) => setData('is_featured', checked === true)} />
                        Featured on homepage
                    </label>
                    <label className="flex items-center gap-3">
                        <Checkbox checked={data.is_published} onCheckedChange={(checked) => setData('is_published', checked === true)} />
                        Published
                    </label>
                </div>

                <div className="flex gap-3">
                    <Button disabled={processing} className="bg-brand-gold text-brand-gold-foreground hover:bg-brand-gold/90">Save project</Button>
                    <Button asChild variant="outline"><Link href={projects.index()}>Cancel</Link></Button>
                </div>
            </AdminFormShell>
        </form>
    );
}

function MediaFields({ project, data, errors, setData }: { project?: AdminProject; data: ProjectFormData; errors: Partial<Record<keyof ProjectFormData, string>>; setData: ReturnType<typeof useForm<ProjectFormData>>['setData'] }) {
    return (
        <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
                <RequiredLabel htmlFor="cover_media_type">Cover media type</RequiredLabel>
                <select id="cover_media_type" value={data.cover_media_type} required onChange={(event) => setData('cover_media_type', event.target.value as 'image' | 'video')} className="h-9 rounded-md border bg-background px-3 text-sm">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="cover_media">Cover media</Label>
                <SingleMediaUploadPreview
                    id="cover_media"
                    accept="image/*,video/mp4,video/webm"
                    currentUrl={project?.mediaUrl}
                    currentType={project?.cover_media_type}
                    onFileChange={(file) => setData('cover_media', file)}
                />
                <InputError message={errors.cover_media} />
            </div>
        </div>
    );
}

function Field(props: { name: string; label: string; value: string; error?: string; placeholder?: string; required?: boolean; type?: string; onChange: (value: string) => void }) {
    return (
        <div className="grid gap-2">
            {props.required ? <RequiredLabel htmlFor={props.name}>{props.label}</RequiredLabel> : <Label htmlFor={props.name}>{props.label}</Label>}
            <Input id={props.name} type={props.type ?? 'text'} value={props.value} placeholder={props.placeholder} required={props.required} onChange={(event) => props.onChange(event.target.value)} />
            <InputError message={props.error} />
        </div>
    );
}
