import { Head, Link } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminPagination } from '@/components/admin/admin-pagination';
import { AdminTable, EmptyTableRow } from '@/components/admin/admin-table';
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button';
import { Button } from '@/components/ui/button';
import quotesRoute from '@/routes/admin/quotes';
import type { Paginator } from '@/types';

type QuoteRow = {
    id: number;
    name: string;
    product: string;
    company: string | null;
    email: string;
    phone: string;
    createdAt: string | null;
};

export default function QuotesIndex({ quotes }: { quotes: Paginator<QuoteRow> }) {
    return (
        <>
            <Head title="Quotes" />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Quotes" description="Review product quote requests from the website." />
                <AdminTable>
                    <thead className="bg-muted/50 text-left"><tr><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Product</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Date</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
                    <tbody className="divide-y">
                        {quotes.data.length === 0 && <EmptyTableRow colSpan={5} label="No quote requests yet." />}
                        {quotes.data.map((quote) => (
                            <tr key={quote.id}>
                                <td className="px-4 py-3"><p className="font-semibold">{quote.name}</p><p className="text-xs text-muted-foreground">{quote.company}</p></td>
                                <td className="px-4 py-3">{quote.product}</td>
                                <td className="px-4 py-3"><p>{quote.email}</p><p className="text-xs text-muted-foreground">{quote.phone}</p></td>
                                <td className="px-4 py-3">{quote.createdAt}</td>
                                <td className="px-4 py-3"><div className="flex justify-end gap-2"><Button asChild size="sm" variant="outline"><Link href={quotesRoute.show(quote.id)}>View</Link></Button><ConfirmDeleteButton form={quotesRoute.destroy.form(quote.id)} title="Delete quote?" /></div></td>
                            </tr>
                        ))}
                    </tbody>
                </AdminTable>
                <AdminPagination links={quotes.links} />
            </div>
        </>
    );
}
