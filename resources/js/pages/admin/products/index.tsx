import { Head, Link, router, usePage } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminPagination } from '@/components/admin/admin-pagination';
import { AdminTable, EmptyTableRow } from '@/components/admin/admin-table';
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button';
import { ProductFilters } from '@/components/admin/products/product-filters';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import productsRoute from '@/routes/admin/products';
import type { Paginator, SelectOption } from '@/types';

type ProductRow = {
    id: number;
    name: string;
    category: string | null;
    brand: string | null;
    isNew: boolean;
    isActive: boolean;
    sortOrder: number;
    poweredBy: string | null;
    drumCapacity: string | null;
    operatingWeight: string | null;
    description: string | null;
    imageUrl: string | null;
};

export default function ProductsIndex({
    products,
    categories,
    filters,
}: {
    products: Paginator<ProductRow>;
    categories: SelectOption[];
    filters: {
        search: string;
        category_id: string | number;
        condition: string;
        status: string;
    };
}) {
    const { url } = usePage();
    const [rows, setRows] = useState(products.data);
    const [draggedId, setDraggedId] = useState<number | null>(null);
    const [dragOverId, setDragOverId] = useState<number | null>(null);

    useEffect(() => {
        setRows(products.data);
    }, [products.data]);

    function moveProduct(targetId: number) {
        if (draggedId === null || draggedId === targetId) {
            setDraggedId(null);
            setDragOverId(null);
            return;
        }

        const fromIndex = rows.findIndex((product) => product.id === draggedId);
        const toIndex = rows.findIndex((product) => product.id === targetId);

        if (fromIndex === -1 || toIndex === -1) {
            setDraggedId(null);
            setDragOverId(null);
            return;
        }

        const nextRows = [...rows];
        const [movedProduct] = nextRows.splice(fromIndex, 1);
        nextRows.splice(toIndex, 0, movedProduct);
        setRows(nextRows);
        setDraggedId(null);
        setDragOverId(null);

        const basePosition = products.from ?? 1;

        router.patch(
            productsRoute.order.url(),
            {
                products: nextRows.map((product, index) => ({
                    id: product.id,
                    sort_order: basePosition + index,
                })),
            },
            {
                preserveScroll: true,
            },
        );
    }

    return (
        <>
            <Head title="Products" />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader
                    title="Products"
                    description="Manage equipment listed on the public product pages."
                    action={{
                        label: 'Add product',
                        href: productsRoute.create(),
                    }}
                />
                <ProductFilters categories={categories} filters={filters} />
                <AdminTable>
                    <thead className="bg-muted/50 text-left">
                        <tr>
                            <th className="w-12 px-4 py-3">Order</th>
                            <th className="px-4 py-3">Product</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Brand</th>
                            <th className="px-4 py-3">Condition</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.data.length === 0 && (
                            <EmptyTableRow
                                colSpan={7}
                                label="No products yet."
                            />
                        )}
                        {rows.map((product) => (
                            <tr
                                key={product.id}
                                className={
                                    dragOverId === product.id
                                        ? 'bg-muted/40'
                                        : undefined
                                }
                                onDragOver={(event) => {
                                    event.preventDefault();
                                    setDragOverId(product.id);
                                }}
                                onDragLeave={() => setDragOverId(null)}
                                onDrop={() => moveProduct(product.id)}
                            >
                                <td className="px-4 py-3">
                                    <button
                                        type="button"
                                        draggable
                                        aria-label={`Drag ${product.name}`}
                                        aria-grabbed={draggedId === product.id}
                                        title="Drag to reorder"
                                        className="inline-flex size-8 cursor-grab items-center justify-center rounded-md text-muted-foreground transition hover:bg-muted hover:text-foreground active:cursor-grabbing"
                                        onDragStart={() =>
                                            setDraggedId(product.id)
                                        }
                                        onDragEnd={() => {
                                            setDraggedId(null);
                                            setDragOverId(null);
                                        }}
                                    >
                                        <GripVertical className="size-4" />
                                    </button>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-14 w-20 rounded-md border bg-white p-1">
                                            {product.imageUrl && (
                                                <img
                                                    src={product.imageUrl}
                                                    alt=""
                                                    className="size-full object-contain"
                                                />
                                            )}
                                        </div>
                                        <span className="font-semibold">
                                            {product.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    {product.category}
                                </td>
                                <td className="px-4 py-3">{product.brand}</td>
                                <td className="px-4 py-3">
                                    {product.isNew ? 'New' : 'Used'}
                                </td>
                                <td className="px-4 py-3">
                                    <StatusBadge active={product.isActive} />
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <ProductViewModal product={product} />
                                        <Button
                                            asChild
                                            size="sm"
                                            variant="outline"
                                        >
                                            <Link
                                                href={productsRoute.edit(
                                                    product.id,
                                                    {
                                                        query: {
                                                            returnTo: url,
                                                        },
                                                    },
                                                )}
                                            >
                                                Edit
                                            </Link>
                                        </Button>
                                        <ConfirmDeleteButton
                                            form={productsRoute.destroy.form(
                                                product.id,
                                            )}
                                            title="Delete product?"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </AdminTable>
                <AdminPagination links={products.links} />
            </div>
        </>
    );
}

function ProductViewModal({ product }: { product: ProductRow }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" size="sm" variant="outline">
                    View
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{product.name}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                    <div className="rounded-md border bg-white p-3">
                        {product.imageUrl ? (
                            <img
                                src={product.imageUrl}
                                alt=""
                                className="h-44 w-full object-contain"
                            />
                        ) : (
                            <div className="flex h-44 items-center justify-center text-sm text-muted-foreground">
                                No image
                            </div>
                        )}
                    </div>
                    <div className="grid gap-3 text-sm">
                        <Detail label="Category" value={product.category} />
                        <Detail
                            label="Condition"
                            value={product.isNew ? 'New' : 'Used'}
                        />
                        <Detail
                            label="Status"
                            value={product.isActive ? 'Active' : 'Hidden'}
                        />
                        <Detail label="Brand" value={product.brand} />
                        <Detail label="Powered by" value={product.poweredBy} />
                        <Detail
                            label="Drum capacity"
                            value={product.drumCapacity}
                        />
                        <Detail
                            label="Operating weight"
                            value={product.operatingWeight}
                        />
                    </div>
                </div>
                <Detail label="Description" value={product.description} />
            </DialogContent>
        </Dialog>
    );
}

function Detail({ label, value }: { label: string; value: string | null }) {
    return (
        <div>
            <p className="text-xs font-bold tracking-wide text-brand-gold uppercase">
                {label}
            </p>
            <p className="mt-1 text-foreground">{value || 'Not provided'}</p>
        </div>
    );
}
function StatusBadge({ active }: { active: boolean }) {
    return (
        <span
            className={
                active
                    ? 'rounded-md bg-success px-2 py-1 text-xs font-semibold text-success-foreground'
                    : 'rounded-md bg-muted px-2 py-1 text-xs font-semibold text-muted-foreground'
            }
        >
            {active ? 'Active' : 'Hidden'}
        </span>
    );
}

