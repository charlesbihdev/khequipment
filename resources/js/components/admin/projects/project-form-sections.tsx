import type { useForm } from '@inertiajs/react';
import { SingleMediaUploadPreview } from '@/components/admin/media-upload-preview';
import { ProjectField } from '@/components/admin/projects/project-field';
import type {
    AdminProject,
    ProjectFormData,
} from '@/components/admin/projects/project-form-types';
import { ProjectStatusSelect } from '@/components/admin/projects/project-status-select';
import { RequiredLabel } from '@/components/admin/required-label';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';

type ProjectFormErrors = Partial<Record<keyof ProjectFormData, string>>;
type ProjectSetData = ReturnType<typeof useForm<ProjectFormData>>['setData'];

type SectionProps = {
    data: ProjectFormData;
    errors: ProjectFormErrors;
    setData: ProjectSetData;
};

export function ProjectIdentityFields({ data, errors, setData }: SectionProps) {
    return (
        <>
            <div className="grid gap-5 md:grid-cols-2">
                <ProjectField
                    name="title"
                    label="Title"
                    value={data.title}
                    error={errors.title}
                    required
                    onChange={(value) => setData('title', value)}
                />
                <ProjectField
                    name="slug"
                    label="Slug"
                    value={data.slug}
                    error={errors.slug}
                    placeholder="Auto-generated if blank"
                    onChange={(value) => setData('slug', value)}
                />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
                <ProjectField
                    name="category"
                    label="Category"
                    value={data.category}
                    error={errors.category}
                    required
                    onChange={(value) => setData('category', value)}
                />
                <ProjectField
                    name="deliverable"
                    label="Deliverable"
                    value={data.deliverable}
                    error={errors.deliverable}
                    onChange={(value) => setData('deliverable', value)}
                />
                <ProjectStatusSelect
                    value={data.status}
                    error={errors.status}
                    onChange={(value) => setData('status', value)}
                />
            </div>
        </>
    );
}

export function ProjectMetadataFields({ data, errors, setData }: SectionProps) {
    return (
        <>
            <div className="grid gap-5 md:grid-cols-2">
                <ProjectField
                    name="client_name"
                    label="Client"
                    value={data.client_name}
                    error={errors.client_name}
                    onChange={(value) => setData('client_name', value)}
                />
                <ProjectField
                    name="location"
                    label="Location"
                    value={data.location}
                    error={errors.location}
                    onChange={(value) => setData('location', value)}
                />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
                <ProjectField
                    name="started_at"
                    label="Started"
                    type="date"
                    value={data.started_at}
                    error={errors.started_at}
                    onChange={(value) => setData('started_at', value)}
                />
                <ProjectField
                    name="completed_at"
                    label="Completed"
                    type="date"
                    value={data.completed_at}
                    error={errors.completed_at}
                    onChange={(value) => setData('completed_at', value)}
                />
                <ProjectField
                    name="sort_order"
                    label="Sort order"
                    type="number"
                    value={data.sort_order}
                    error={errors.sort_order}
                    onChange={(value) => setData('sort_order', value)}
                />
            </div>
        </>
    );
}

export function ProjectSummaryField({ data, errors, setData }: SectionProps) {
    return (
        <div className="grid gap-2">
            <Label htmlFor="summary">Summary</Label>
            <textarea
                id="summary"
                value={data.summary}
                onChange={(event) => setData('summary', event.target.value)}
                rows={3}
                className="rounded-md border bg-background px-3 py-2 text-sm"
            />
            <InputError message={errors.summary} />
        </div>
    );
}

export function MediaFields({
    project,
    data,
    errors,
    setData,
}: SectionProps & { project?: AdminProject }) {
    return (
        <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
                <RequiredLabel htmlFor="cover_media_type">
                    Cover media type
                </RequiredLabel>
                <select
                    id="cover_media_type"
                    value={data.cover_media_type}
                    required
                    onChange={(event) =>
                        setData(
                            'cover_media_type',
                            event.target.value as 'image' | 'video',
                        )
                    }
                    className="h-9 rounded-md border bg-background px-3 text-sm"
                >
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
