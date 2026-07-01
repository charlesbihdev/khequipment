import { Head } from '@inertiajs/react';
import { AdminPageHeader } from '@/components/admin/admin-page-header';
import { CategoryForm } from '@/components/admin/categories/category-form';
import categories from '@/routes/admin/categories';

export default function CreateCategory() {
    return (
        <>
            <Head title="Add category" />
            <div className="space-y-6 p-4 md:p-6">
                <AdminPageHeader title="Add category" />
                <CategoryForm action={categories.store.form()} />
            </div>
        </>
    );
}
