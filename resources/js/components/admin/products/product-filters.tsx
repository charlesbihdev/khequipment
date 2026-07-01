import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import productsRoute from '@/routes/admin/products';
import type { SelectOption } from '@/types';

export type ProductFilters = {
    search: string;
    category_id: string | number;
    condition: string;
};

type Props = {
    categories: SelectOption[];
    filters: ProductFilters;
};

export function ProductFilters({ categories, filters }: Props) {
    const [values, setValues] = useState({
        search: filters.search ?? '',
        category_id: String(filters.category_id ?? ''),
        condition: filters.condition ?? '',
    });

    function submit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        router.get(productsRoute.index().url, compact(values), {
            preserveState: true,
            replace: true,
        });
    }

    function clear() {
        setValues({ search: '', category_id: '', condition: '' });
        router.get(productsRoute.index().url, {}, { preserveState: true, replace: true });
    }

    return (
        <form onSubmit={submit} className="grid gap-3 rounded-lg border bg-card p-3 md:grid-cols-2 xl:grid-cols-[minmax(260px,1fr)_minmax(180px,220px)_minmax(150px,190px)_auto]">
            <div className="relative md:col-span-2 xl:col-span-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    value={values.search}
                    onChange={(event) => setValues((current) => ({ ...current, search: event.target.value }))}
                    placeholder="Search products, brand, category..."
                    className="pl-9"
                />
            </div>
            <select
                value={values.category_id}
                onChange={(event) => setValues((current) => ({ ...current, category_id: event.target.value }))}
                className="h-9 min-w-0 rounded-md border bg-background px-3 text-sm"
            >
                <option value="">All categories</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
            <select
                value={values.condition}
                onChange={(event) => setValues((current) => ({ ...current, condition: event.target.value }))}
                className="h-9 min-w-0 rounded-md border bg-background px-3 text-sm"
            >
                <option value="">Any condition</option>
                <option value="new">New</option>
                <option value="used">Used</option>
            </select>
            <div className="flex gap-2 md:justify-end">
                <Button type="submit" className="flex-1 bg-brand-gold text-brand-gold-foreground hover:bg-brand-gold/90 sm:flex-none">
                    Search
                </Button>
                <Button type="button" variant="outline" onClick={clear} className="flex-1 sm:flex-none">
                    Clear
                </Button>
            </div>
        </form>
    );
}

function compact(values: Record<string, string>) {
    return Object.fromEntries(Object.entries(values).filter(([, value]) => value !== ''));
}
