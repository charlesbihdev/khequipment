import { Link } from '@inertiajs/react';
import { ChevronRight, Filter, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';
import { products } from '@/routes';
import type { ProductCategory } from '@/types/products';

type ProductFiltersProps = {
    categories: ProductCategory[];
    selectedCategorySlugs: string[];
    selectedBrandSlugs: string[];
};

export function ProductFilters({
    categories,
    selectedCategorySlugs,
    selectedBrandSlugs,
}: ProductFiltersProps) {
    const [open, setOpen] = useState(false);
    const selected = new Set(selectedCategorySlugs);

    const hrefFor = (slug: string) => {
        const next = selected.has(slug)
            ? selectedCategorySlugs.filter(
                  (categorySlug) => categorySlug !== slug,
              )
            : [...selectedCategorySlugs, slug];

        return products.url({
            query: {
                category: next.length > 0 ? next.join(',') : undefined,
                brand:
                    selectedBrandSlugs.length > 0
                        ? selectedBrandSlugs.join(',')
                        : undefined,
            },
        });
    };

    const content = (closeOnClick = false) => (
        <>
            <div className="flex items-center justify-between gap-4">
                <h2 className="flex items-center gap-2 text-2xl font-extrabold">
                    <Filter className="size-5 text-brand-gold" />
                    Filter
                </h2>
                {(selectedCategorySlugs.length > 0 ||
                    selectedBrandSlugs.length > 0) && (
                    <Link
                        href={products.url()}
                        only={['products', 'filters']}
                        prefetch
                        preserveScroll
                        onClick={() => closeOnClick && setOpen(false)}
                        className="inline-flex items-center gap-1 text-sm font-bold text-brand-gold hover:underline"
                    >
                        <RotateCcw className="size-4" />
                        Reset
                    </Link>
                )}
            </div>

            <div className="mt-6 space-y-3">
                {categories.map((category) => {
                    const active = selected.has(category.slug);

                    return (
                        <Link
                            key={category.id}
                            href={hrefFor(category.slug)}
                            only={['products', 'filters']}
                            prefetch
                            preserveScroll
                            onClick={() => closeOnClick && setOpen(false)}
                            className={`block rounded-md border px-4 py-2 text-lg font-semibold transition ${
                                active
                                    ? 'border-brand-gold bg-brand-gold text-brand-gold-foreground'
                                    : 'border-border bg-background text-muted-foreground hover:border-brand-gold hover:text-foreground'
                            }`}
                        >
                            {category.name}
                        </Link>
                    );
                })}
            </div>
        </>
    );

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex w-full items-center justify-between rounded-md border border-brand-gold/45 bg-card px-4 py-3 text-left shadow-sm transition hover:border-brand-gold hover:bg-muted lg:hidden"
            >
                <span className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-md bg-brand-gold text-brand-gold-foreground">
                        <Filter className="size-5" />
                    </span>
                    <span>
                        <span className="block text-xl font-extrabold">
                            Filter categories
                        </span>
                        <span className="text-sm font-semibold text-muted-foreground">
                            {selectedCategorySlugs.length > 0
                                ? `${selectedCategorySlugs.length} selected`
                                : 'Tap to choose equipment type'}
                        </span>
                    </span>
                </span>
                <ChevronRight className="size-5 text-muted-foreground" />
            </button>

            {open && (
                <div className="fixed inset-0 z-50 animate-in duration-200 fade-in lg:hidden">
                    <button
                        type="button"
                        aria-label="Close filters"
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-foreground/45"
                    />
                    <aside className="relative h-full w-[min(86vw,340px)] animate-in overflow-y-auto border-r border-border bg-background p-5 shadow-xl duration-200 slide-in-from-left">
                        <div className="mb-5 flex items-center justify-between">
                            <span className="text-2xl font-extrabold">
                                Categories
                            </span>
                            <button
                                type="button"
                                aria-label="Close filters"
                                onClick={() => setOpen(false)}
                                className="inline-flex size-10 items-center justify-center rounded-md border border-border"
                            >
                                <X className="size-5" />
                            </button>
                        </div>
                        {content(true)}
                    </aside>
                </div>
            )}

            <aside className="hidden rounded-md border border-border bg-card p-5 shadow-sm lg:sticky lg:top-6 lg:block">
                {content()}
            </aside>
        </>
    );
}
