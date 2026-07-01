import { Head, Link } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes';
import products from '@/routes/admin/products';
import projects from '@/routes/admin/projects';
import quotes from '@/routes/admin/quotes';

type RecentQuote = {
    id: number;
    name: string;
    product: string;
    email: string;
    phone: string;
    createdAt: string | null;
};

type Props = {
    stats: Record<'products' | 'categories' | 'projects' | 'activePromos' | 'quotes', number>;
    recentQuotes: RecentQuote[];
};

const statLabels = {
    products: 'Products',
    categories: 'Categories',
    projects: 'Projects',
    activePromos: 'Active promos',
    quotes: 'Quotes',
};

export default function Dashboard({ stats, recentQuotes }: Props) {
    return (
        <>
            <Head title="Dashboard" />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader
                    title="Dashboard"
                    description="A quick look at the content and quote activity on KH Equipment Hub."
                />

                <div className="flex flex-wrap gap-3">
                    <Button asChild className="bg-brand-gold text-brand-gold-foreground hover:bg-brand-gold/90">
                        <Link href={products.create()}>Add product</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href={projects.create()}>Add project</Link>
                    </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                    {Object.entries(stats).map(([key, value]) => (
                        <Card key={key} className="rounded-lg py-5">
                            <CardHeader className="px-5 pb-2">
                                <CardTitle className="text-sm text-muted-foreground">
                                    {statLabels[key as keyof typeof statLabels]}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-5">
                                <p className="text-3xl font-bold text-brand-steel">
                                    {value}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card className="rounded-lg">
                    <CardHeader>
                        <CardTitle>Recent quotes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recentQuotes.length === 0 && (
                            <p className="text-sm text-muted-foreground">
                                No quote requests yet.
                            </p>
                        )}
                        {recentQuotes.map((quote) => (
                            <Link
                                key={quote.id}
                                href={quotes.show(quote.id)}
                                className="block rounded-md border p-4 transition hover:border-brand-gold"
                            >
                                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                                    <p className="font-semibold text-brand-steel">
                                        {quote.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {quote.createdAt}
                                    </p>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {quote.product} · {quote.email} · {quote.phone}
                                </p>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
