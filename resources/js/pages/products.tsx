import { Deferred, Head } from '@inertiajs/react';
import { Footer } from '@/components/common/footer';
import { PublicNav } from '@/components/common/public-nav';
import { ProductBrandFilter } from '@/components/products/product-brand-filter';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductsGrid } from '@/components/products/products-grid';
import { ProductsHero } from '@/components/products/products-hero';
import { ProductsPagination } from '@/components/products/products-pagination';
import type {
    PaginatedProducts,
    ProductBrand,
    ProductCategory,
} from '@/types/products';

type ProductsPageProps = {
    categories: ProductCategory[];
    brands?: ProductBrand[];
    products: PaginatedProducts;
    filters: {
        category: string[];
        brand: string[];
    };
};

export default function Products({
    categories,
    brands = [],
    products,
    filters,
}: ProductsPageProps) {
    return (
        <>
            <Head title="Products - KH Equipment Hub" />
            <main className="min-h-screen bg-background font-public text-foreground">
                <PublicNav />
                <ProductsHero />

                <section className="py-16 sm:py-20">
                    <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
                        <ProductFilters
                            categories={categories}
                            selectedCategorySlugs={filters.category}
                            selectedBrandSlugs={filters.brand}
                        />

                        <div>
                            <div className="mb-6 border-b border-border pb-5">
                                <p className="text-4xl font-extrabold">
                                    Available Equipment
                                </p>

                                <Deferred
                                    data="brands"
                                    fallback={
                                        <p className="mt-4 text-lg font-semibold text-muted-foreground">
                                            Loading brands...
                                        </p>
                                    }
                                >
                                    <ProductBrandFilter
                                        brands={brands}
                                        selectedBrandSlugs={filters.brand}
                                        selectedCategorySlugs={filters.category}
                                    />
                                </Deferred>

                                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="text-lg text-muted-foreground">
                                        Showing {products.from ?? 0}-
                                        {products.to ?? 0} of {products.total}
                                    </p>
                                    <p className="text-lg font-semibold text-muted-foreground">
                                        {products.per_page} per page
                                    </p>
                                </div>
                            </div>

                            <ProductsGrid products={products.data} />

                            <div className="mt-10">
                                <ProductsPagination links={products.links} />
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
