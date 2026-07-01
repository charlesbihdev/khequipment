import { Head } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { PromoForm, type AdminPromo } from '@/components/admin/promos/promo-form';
import promos from '@/routes/admin/promos';
import type { SelectOption } from '@/types';

export default function EditPromo({ promo, products }: { promo: AdminPromo; products: SelectOption[] }) {
    return (
        <>
            <Head title={`Edit ${promo.title}`} />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Edit promo" />
                <PromoForm action={promos.update.form(promo.id)} promo={promo} products={products} />
            </div>
        </>
    );
}
