import { router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import projectsRoute from '@/routes/admin/projects';

type VisibilityField = 'is_published' | 'is_featured';

type ProjectListVisibilitySwitchProps = {
    projectId: number;
    checked: boolean;
    field: VisibilityField;
    label: string;
};

export function ProjectListVisibilitySwitch({
    projectId,
    checked,
    field,
    label,
}: ProjectListVisibilitySwitchProps) {
    const [busy, setBusy] = useState(false);

    function toggle() {
        router.patch(
            projectsRoute.visibility.url(projectId),
            { field, value: !checked },
            {
                preserveScroll: true,
                onStart: () => setBusy(true),
                onFinish: () => setBusy(false),
            },
        );
    }

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            disabled={busy}
            className="inline-flex h-8 w-14 items-center justify-center rounded-full transition disabled:cursor-wait disabled:opacity-70"
            onClick={toggle}
        >
            <span
                className={cn(
                    'relative h-6 w-11 rounded-full transition',
                    checked ? 'bg-brand-gold' : 'bg-muted',
                )}
            >
                <span
                    className={cn(
                        'absolute top-1 flex size-4 items-center justify-center rounded-full bg-white shadow transition',
                        checked ? 'left-6' : 'left-1',
                    )}
                >
                    {busy && (
                        <LoaderCircle className="size-3 animate-spin text-muted-foreground" />
                    )}
                </span>
            </span>
        </button>
    );
}
