import { Link } from '@inertiajs/react';
import { products } from '@/routes';
import type { ProductBrand } from '@/types/products';

type ProductBrandFilterProps = {
    brands: ProductBrand[];
    selectedBrandSlugs: string[];
    selectedCategorySlugs: string[];
};

export function ProductBrandFilter({
    brands,
    selectedBrandSlugs,
    selectedCategorySlugs,
}: ProductBrandFilterProps) {
    if (brands.length === 0) {
        return null;
    }

    const selected = new Set(selectedBrandSlugs);

    const hrefFor = (slug: string) => {
        const next = selected.has(slug)
            ? selectedBrandSlugs.filter((brandSlug) => brandSlug !== slug)
            : [...selectedBrandSlugs, slug];

        return products.url({
            query: {
                category:
                    selectedCategorySlugs.length > 0
                        ? selectedCategorySlugs.join(',')
                        : undefined,
                brand: next.length > 0 ? next.join(',') : undefined,
            },
        });
    };

    return (
        <div className="mt-4 flex flex-wrap gap-2">
            {brands.map((brand) => {
                const active = selected.has(brand.slug);

                return (
                    <Link
                        key={brand.slug}
                        href={hrefFor(brand.slug)}
                        only={['products', 'filters']}
                        prefetch
                        preserveScroll
                        className={`rounded-md border px-3 py-1.5 text-base font-bold transition ${
                            active
                                ? 'border-brand-gold bg-brand-gold text-brand-gold-foreground'
                                : 'border-border bg-card text-muted-foreground hover:border-brand-gold hover:text-foreground'
                        }`}
                    >
                        {brand.name}
                    </Link>
                );
            })}
        </div>
    );
}
