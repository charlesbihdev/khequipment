import { cn } from '@/lib/utils';

type ProjectPublicationControlsProps = {
    isPublished: boolean;
    isFeatured: boolean;
    onPublishedChange: (checked: boolean) => void;
    onFeaturedChange: (checked: boolean) => void;
};

export function ProjectPublicationControls({
    isPublished,
    isFeatured,
    onPublishedChange,
    onFeaturedChange,
}: ProjectPublicationControlsProps) {
    return (
        <div className="flex flex-wrap gap-5">
            <SwitchControl
                checked={isPublished}
                label="Published"
                description="Visible on the public website"
                onChange={onPublishedChange}
            />
            {isPublished && (
                <SwitchControl
                    checked={isFeatured}
                    label="Featured on homepage"
                    description="Eligible for the homepage projects section"
                    onChange={onFeaturedChange}
                />
            )}
        </div>
    );
}

function SwitchControl({
    checked,
    label,
    description,
    onChange,
}: {
    checked: boolean;
    label: string;
    description: string;
    onChange: (checked: boolean) => void;
}) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            className="flex min-w-56 items-center gap-3 rounded-md border bg-background p-3 text-left transition hover:border-brand-gold"
            onClick={() => onChange(!checked)}
        >
            <span
                className={cn(
                    'relative h-6 w-11 rounded-full transition',
                    checked ? 'bg-brand-gold' : 'bg-muted',
                )}
            >
                <span
                    className={cn(
                        'absolute top-1 size-4 rounded-full bg-white shadow transition',
                        checked ? 'left-6' : 'left-1',
                    )}
                />
            </span>
            <span>
                <span className="block text-sm font-semibold">{label}</span>
                <span className="block text-xs text-muted-foreground">
                    {description}
                </span>
            </span>
        </button>
    );
}
