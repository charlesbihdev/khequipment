import { Head } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ProductForm } from '@/components/admin/products/product-form';
import products from '@/routes/admin/products';
import type { SelectOption } from '@/types';

type Product = Parameters<typeof ProductForm>[0]['product'];

export default function EditProduct({ product, categories }: { product: Product; categories: SelectOption[] }) {
    return (
        <>
            <Head title={`Edit ${product?.name ?? 'product'}`} />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Edit product" />
                <ProductForm action={products.update.form(product?.id ?? 0)} product={product} categories={categories} />
            </div>
        </>
    );
}
