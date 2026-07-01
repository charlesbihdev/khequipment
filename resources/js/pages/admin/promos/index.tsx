import { Head, Link } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminPagination } from '@/components/admin/admin-pagination';
import { AdminTable, EmptyTableRow } from '@/components/admin/admin-table';
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button';
import { Button } from '@/components/ui/button';
import promosRoute from '@/routes/admin/promos';
import type { Paginator } from '@/types';

type PromoRow = {
    id: number;
    title: string;
    eyebrow: string;
    mediaType: string;
    mediaUrl: string;
    product: string | null;
    isActive: boolean;
};

export default function PromosIndex({ promos }: { promos: Paginator<PromoRow> }) {
    return (
        <>
            <Head title="Promos" />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Promos" description="Manage homepage deal slides." action={{ label: 'Add promo', href: promosRoute.create() }} />
                <AdminTable>
                    <thead className="bg-muted/50 text-left"><tr><th className="px-4 py-3">Promo</th><th className="px-4 py-3">Product</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
                    <tbody className="divide-y">
                        {promos.data.length === 0 && <EmptyTableRow colSpan={4} label="No promos yet." />}
                        {promos.data.map((promo) => (
                            <tr key={promo.id}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-14 w-20 rounded-md border bg-white p-1">{promo.mediaType === 'image' && <img src={promo.mediaUrl} alt="" className="size-full object-contain" />}</div>
                                        <div><p className="font-semibold">{promo.title}</p><p className="text-xs text-muted-foreground">{promo.eyebrow}</p></div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">{promo.product ?? 'No product'}</td>
                                <td className="px-4 py-3">{promo.isActive ? 'Active' : 'Inactive'}</td>
                                <td className="px-4 py-3"><div className="flex justify-end gap-2"><Button asChild size="sm" variant="outline"><Link href={promosRoute.edit(promo.id)}>Edit</Link></Button><ConfirmDeleteButton form={promosRoute.destroy.form(promo.id)} title="Delete promo?" /></div></td>
                            </tr>
                        ))}
                    </tbody>
                </AdminTable>
                <AdminPagination links={promos.links} />
            </div>
        </>
    );
}
