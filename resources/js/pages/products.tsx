import { Head } from '@inertiajs/react';
import { Footer } from '@/components/common/footer';
import { PublicNav } from '@/components/common/public-nav';
import { ProductFilters } from '@/components/products/product-filters';
import { ProductsGrid } from '@/components/products/products-grid';
import { ProductsHero } from '@/components/products/products-hero';
import { ProductsPagination } from '@/components/products/products-pagination';
import type { PaginatedProducts, ProductCategory } from '@/types/products';

type ProductsPageProps = {
    categories: ProductCategory[];
    products: PaginatedProducts;
    filters: {
        category: string[];
    };
};

export default function Products({
    categories,
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
                        />

                        <div>
                            <div className="mb-6 flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <p className="text-4xl font-extrabold">
                                        Available Equipment
                                    </p>
                                    <p className="mt-2 text-lg text-muted-foreground">
                                        Showing {products.from ?? 0}-
                                        {products.to ?? 0} of {products.total}
                                    </p>
                                </div>
                                <p className="text-lg font-semibold text-muted-foreground">
                                    {products.per_page} per page
                                </p>
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
