import { Head, Link } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { AdminPagination } from '@/components/admin/admin-pagination';
import { AdminTable, EmptyTableRow } from '@/components/admin/admin-table';
import { ConfirmDeleteButton } from '@/components/admin/confirm-delete-button';
import { Button } from '@/components/ui/button';
import categoriesRoute from '@/routes/admin/categories';
import type { Paginator } from '@/types';

type CategoryRow = {
    id: number;
    name: string;
    slug: string;
    products_count: number;
};

export default function CategoriesIndex({ categories }: { categories: Paginator<CategoryRow> }) {
    return (
        <>
            <Head title="Categories" />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader
                    title="Categories"
                    description="Group products into clear equipment ranges."
                    action={{ label: 'Add category', href: categoriesRoute.create() }}
                />
                <AdminTable>
                    <thead className="bg-muted/50 text-left">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Slug</th>
                            <th className="px-4 py-3">Products</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {categories.data.length === 0 && <EmptyTableRow colSpan={4} label="No categories yet." />}
                        {categories.data.map((category) => (
                            <tr key={category.id}>
                                <td className="px-4 py-3 font-semibold">{category.name}</td>
                                <td className="px-4 py-3 text-muted-foreground">{category.slug}</td>
                                <td className="px-4 py-3">{category.products_count}</td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <Button asChild size="sm" variant="outline">
                                            <Link href={categoriesRoute.edit(category.id)}>Edit</Link>
                                        </Button>
                                        <ConfirmDeleteButton
                                            form={categoriesRoute.destroy.form(category.id)}
                                            title="Delete category?"
                                            description="Products in this category will block deletion until they are moved."
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </AdminTable>
                <AdminPagination links={categories.links} />
            </div>
        </>
    );
}
