import { Head } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CategoryForm } from '@/components/admin/categories/category-form';
import categories from '@/routes/admin/categories';

type Category = {
    id: number;
    name: string;
    slug: string;
    is_active: boolean;
};

export default function EditCategory({ category }: { category: Category }) {
    return (
        <>
            <Head title={`Edit ${category.name}`} />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Edit category" />
                <CategoryForm
                    action={categories.update.form(category.id)}
                    category={category}
                />
            </div>
        </>
    );
}
