import type { ProductDetail } from '@/types/products';

type ProductDetailInfoProps = {
    product: ProductDetail;
};

export function ProductDetailInfo({ product }: ProductDetailInfoProps) {
    const specs = [
        ['Category', product.category],
        ['Brand', product.brand],
        ['Powered By', product.poweredBy],
        ['Drum Capacity', product.drumCapacity],
        ['Operating Weight', product.operatingWeight],
    ].filter(([, value]) => value);

    return (
        <div>
            <span className="inline-flex rounded-md bg-success px-3 py-1 text-sm font-bold text-success-foreground">
                {product.isNew ? 'New' : 'Used'}
            </span>

            <h1 className="mt-4 text-5xl leading-tight font-extrabold sm:text-6xl">
                {product.name}
            </h1>

            <div className="mt-8 divide-y divide-border rounded-md border border-border bg-card">
                {specs.map(([label, value]) => (
                    <div
                        key={label}
                        className="grid gap-2 px-5 py-4 sm:grid-cols-[180px_1fr]"
                    >
                        <dt className="text-lg font-bold text-muted-foreground">
                            {label}
                        </dt>
                        <dd className="text-xl font-semibold text-foreground">
                            {value}
                        </dd>
                    </div>
                ))}
            </div>

            {product.description && (
                <div className="mt-8">
                    <h2 className="text-3xl font-extrabold">Description</h2>
                    <p className="mt-4 text-xl leading-9 text-muted-foreground">
                        {product.description}
                    </p>
                </div>
            )}
        </div>
    );
}
