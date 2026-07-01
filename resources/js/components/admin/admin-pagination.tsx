import { Link } from '@inertiajs/react';
import type { AdminPaginationLink } from '@/types';
import { cn } from '@/lib/utils';

export function AdminPagination({ links }: { links: AdminPaginationLink[] }) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <nav className="flex flex-wrap gap-2 pt-4">
            {links.map((link, index) => (
                <Link
                    key={`${link.label}-${index}`}
                    href={link.url ?? '#'}
                    preserveScroll
                    className={cn(
                        'rounded-md border px-3 py-2 text-sm font-semibold',
                        link.active && 'border-brand-gold bg-brand-gold text-brand-gold-foreground',
                        !link.url && 'pointer-events-none opacity-40',
                    )}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </nav>
    );
}
