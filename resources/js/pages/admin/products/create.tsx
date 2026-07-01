import { Head } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ProductForm } from '@/components/admin/products/product-form';
import products from '@/routes/admin/products';
import type { SelectOption } from '@/types';

export default function CreateProduct({ categories }: { categories: SelectOption[] }) {
    return (
        <>
            <Head title="Add product" />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Add product" />
                <ProductForm action={products.store.form()} categories={categories} />
            </div>
        </>
    );
}
