import { Link } from '@inertiajs/react';
import type { RouteDefinition } from '@/wayfinder';
import { Button } from '@/components/ui/button';

type Props = {
    title: string;
    description?: string;
    action?: {
        label: string;
        href: RouteDefinition<'get'>;
    };
};

export function AdminPageHeader({ title, description, action }: Props) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="text-xs font-bold tracking-[0.22em] text-brand-gold uppercase">
                    Manage
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-brand-steel">
                    {title}
                </h1>
                {description && (
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>

            {action && (
                <Button asChild className="bg-brand-gold text-brand-gold-foreground hover:bg-brand-gold/90">
                    <Link href={action.href}>{action.label}</Link>
                </Button>
            )}
        </div>
    );
}
