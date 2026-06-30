import { ArrowRight } from 'lucide-react';
import type { ProductCardItem } from '@/types/products';

type ProductCardProps = {
    product: ProductCardItem;
};

export function ProductCard({ product }: ProductCardProps) {
    return (
        <article className="group overflow-hidden rounded-md border border-border bg-card shadow-sm transition hover:border-brand-gold hover:shadow-md">
            <div className="relative aspect-[4/3] bg-muted">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="size-full object-cover transition duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center text-lg font-semibold text-muted-foreground">
                        No image
                    </div>
                )}
            </div>

            <div className="p-5">
                <p className="text-sm font-bold tracking-[0.18em] text-muted-foreground uppercase">
                    {product.category ?? 'Equipment'}
                </p>
                <h2 className="mt-2 text-2xl leading-8 font-extrabold">
                    {product.name}
                </h2>
                <div className="mt-4 flex items-center gap-3 text-lg">
                    <span className="font-bold text-success">
                        {product.isNew ? 'New' : 'Used'}
                    </span>
                    {product.poweredBy && (
                        <span className="text-muted-foreground">
                            {product.poweredBy}
                        </span>
                    )}
                    <ArrowRight className="ml-auto size-6 text-muted-foreground transition group-hover:text-brand-gold" />
                </div>
            </div>
        </article>
    );
}
