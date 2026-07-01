import { Form, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { AdminFormShell } from '@/components/admin/admin-form-shell';
import { RequiredLabel } from '@/components/admin/required-label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { withMethodSpoof } from '@/components/admin/with-method-spoof';
import categories from '@/routes/admin/categories';
import type { RouteFormDefinition } from '@/wayfinder';

type Category = {
    id: number;
    name: string;
    slug: string;
};

type Props = {
    action: RouteFormDefinition<'post'>;
    category?: Category;
};

export function CategoryForm({ action, category }: Props) {
    return (
        <Form
            {...action}
            transform={(data) => withMethodSpoof(data, action.action)}
            className="max-w-2xl"
        >
            {({ processing, errors }) => (
                <AdminFormShell>
                    <div className="grid gap-2">
                        <RequiredLabel htmlFor="name">Name</RequiredLabel>
                        <Input
                            id="name"
                            name="name"
                            defaultValue={category?.name}
                            required
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            name="slug"
                            defaultValue={category?.slug}
                            placeholder="Auto-generated if blank"
                        />
                        <InputError message={errors.slug} />
                    </div>

                    <div className="flex gap-3">
                        <Button disabled={processing} className="bg-brand-gold text-brand-gold-foreground hover:bg-brand-gold/90">
                            Save category
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={categories.index()}>Cancel</Link>
                        </Button>
                    </div>
                </AdminFormShell>
            )}
        </Form>
    );
}
