import { Head, Link } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button';
import { Button } from '@/components/ui/button';
import quotes from '@/routes/admin/quotes';

type Quote = {
    id: number;
    product_name_snapshot: string;
    name: string;
    address: string;
    company: string | null;
    country: string;
    message: string | null;
    phone: string;
    email: string;
    createdAt: string | null;
};

export default function ShowQuote({ quote }: { quote: Quote }) {
    return (
        <>
            <Head title={`Quote from ${quote.name}`} />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Quote request" description={quote.createdAt ?? undefined} />
                <div className="grid gap-4 rounded-lg border bg-card p-5 shadow-sm md:grid-cols-2">
                    <Detail label="Customer" value={quote.name} />
                    <Detail label="Product" value={quote.product_name_snapshot} />
                    <Detail label="Company" value={quote.company} />
                    <Detail label="Country" value={quote.country} />
                    <Detail label="Email" value={quote.email} />
                    <Detail label="Phone" value={quote.phone} />
                    <Detail label="Address" value={quote.address} wide />
                    <Detail label="Message" value={quote.message} wide />
                </div>
                <div className="flex gap-3">
                    <Button asChild variant="outline"><Link href={quotes.index()}>Back</Link></Button>
                    <ConfirmDeleteButton form={quotes.destroy.form(quote.id)} label="Delete quote" title="Delete quote?" />
                </div>
            </div>
        </>
    );
}

function Detail({ label, value, wide }: { label: string; value: string | null; wide?: boolean }) {
    return (
        <div className={wide ? 'md:col-span-2' : ''}>
            <p className="text-xs font-bold tracking-wide text-brand-gold uppercase">{label}</p>
            <p className="mt-1 text-sm text-foreground">{value || 'Not provided'}</p>
        </div>
    );
}
