import { Link } from '@inertiajs/react';
import type { PaginationLink } from '@/types/products';

type ProductsPaginationProps = {
    links: PaginationLink[];
};

function cleanLabel(label: string) {
    return label.replace('&laquo;', 'Previous').replace('&raquo;', 'Next');
}

export function ProductsPagination({ links }: ProductsPaginationProps) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <nav className="flex flex-wrap items-center justify-end gap-2">
            {links.map((link, index) =>
                link.url ? (
                    <Link
                        key={`${link.label}-${index}`}
                        href={link.url}
                        preserveScroll
                        prefetch
                        className={`rounded-md border px-4 py-2 text-base font-bold transition ${
                            link.active
                                ? 'border-brand-gold bg-brand-gold text-brand-gold-foreground'
                                : 'border-border bg-card text-foreground hover:border-brand-gold'
                        }`}
                    >
                        {cleanLabel(link.label)}
                    </Link>
                ) : (
                    <span
                        key={`${link.label}-${index}`}
                        className="rounded-md border border-border bg-muted px-4 py-2 text-base font-bold text-muted-foreground"
                    >
                        {cleanLabel(link.label)}
                    </span>
                ),
            )}
        </nav>
    );
}
