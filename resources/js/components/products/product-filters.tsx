import { Link } from '@inertiajs/react';
import { Filter, RotateCcw } from 'lucide-react';
import { products } from '@/routes';
import type { ProductCategory } from '@/types/products';

type ProductFiltersProps = {
    categories: ProductCategory[];
    selectedCategorySlugs: string[];
};

export function ProductFilters({
    categories,
    selectedCategorySlugs,
}: ProductFiltersProps) {
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
            },
        });
    };

    return (
        <aside className="rounded-md border border-border bg-card p-5 shadow-sm lg:sticky lg:top-6">
            <div className="flex items-center justify-between gap-4">
                <h2 className="flex items-center gap-2 text-2xl font-extrabold">
                    <Filter className="size-5 text-brand-gold" />
                    Filter
                </h2>
                {selectedCategorySlugs.length > 0 && (
                    <Link
                        href={products.url()}
                        prefetch
                        preserveScroll
                        className="inline-flex items-center gap-1 text-sm font-bold text-brand-gold hover:underline"
                    >
                        <RotateCcw className="size-4" />
                        Reset
                    </Link>
                )}
            </div>

            <div className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-3 lg:overflow-visible">
                {categories.map((category) => {
                    const active = selected.has(category.slug);

                    return (
                        <Link
                            key={category.id}
                            href={hrefFor(category.slug)}
                            prefetch
                            preserveScroll
                            className={`shrink-0 rounded-md border px-4 py-2 text-lg font-semibold transition lg:block ${
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
        </aside>
    );
}
