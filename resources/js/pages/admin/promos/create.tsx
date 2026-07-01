import { Head } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { PromoForm } from '@/components/admin/promos/promo-form';
import promos from '@/routes/admin/promos';
import type { SelectOption } from '@/types';

export default function CreatePromo({ products }: { products: SelectOption[] }) {
    return (
        <>
            <Head title="Add promo" />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Add promo" />
                <PromoForm action={promos.store.form()} products={products} />
            </div>
        </>
    );
}
