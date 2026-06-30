import { ProductCard } from './product-card';
import type { ProductCardItem } from '@/types/products';

type ProductsGridProps = {
    products: ProductCardItem[];
};

export function ProductsGrid({ products }: ProductsGridProps) {
    if (products.length === 0) {
        return (
            <div className="rounded-md border border-border bg-card p-8 text-center">
                <h2 className="text-3xl font-extrabold">No products found</h2>
                <p className="mt-3 text-lg text-muted-foreground">
                    Clear the filters or choose another category.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
