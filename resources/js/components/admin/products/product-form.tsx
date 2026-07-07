import { Form, Link } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { AdminFormShell } from '@/components/admin/admin-form-shell';
import { MultiImageUploadPreview } from '@/components/admin/media-upload-preview';
import { RequiredLabel } from '@/components/admin/required-label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { withMethodSpoof } from '@/components/admin/with-method-spoof';
import products from '@/routes/admin/products';
import type { RouteFormDefinition } from '@/wayfinder';
import type { SelectOption } from '@/types';

type Product = {
    id: number;
    category_id: number;
    name: string;
    slug: string;
    brand: string | null;
    is_new: boolean;
    is_active: boolean;
    powered_by: string | null;
    drum_capacity: string | null;
    operating_weight: string | null;
    description: string | null;
    images?: { id: number; filename: string; url: string }[];
};

type Props = {
    action: RouteFormDefinition<'post'>;
    categories: SelectOption[];
    product?: Product;
    cancelHref?: string;
    brands?: string[];
};

export function ProductForm({
    action,
    categories,
    product,
    cancelHref,
    brands = [],
}: Props) {
    const [existingImages, setExistingImages] = useState(
        () => product?.images ?? [],
    );
    const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);

    function removeExistingImage(id: number) {
        setExistingImages((images) =>
            images.filter((image) => image.id !== id),
        );
        setRemovedImageIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
    }

    return (
        <Form
            {...action}
            transform={(data) => withMethodSpoof(data, action.action)}
            className="max-w-4xl"
        >
            {({ processing, errors }) => (
                <AdminFormShell>
                    <div className="grid gap-5 md:grid-cols-2">
                        <Field
                            name="name"
                            label="Name"
                            error={errors.name}
                            defaultValue={product?.name}
                            required
                        />
                        <Field
                            name="slug"
                            label="Slug"
                            error={errors.slug}
                            defaultValue={product?.slug}
                            placeholder="Auto-generated if blank"
                        />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="grid gap-2">
                            <RequiredLabel htmlFor="category_id">
                                Category
                            </RequiredLabel>
                            <select
                                id="category_id"
                                name="category_id"
                                defaultValue={product?.category_id ?? ''}
                                required
                                className="h-9 rounded-md border bg-background px-3 text-sm"
                            >
                                <option value="">Select category</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.category_id} />
                        </div>
                        <div>
                            <Field
                                name="brand"
                                label="Brand"
                                error={errors.brand}
                                defaultValue={product?.brand}
                                list="brand-list"
                            />
                            <datalist id="brand-list">
                                {brands.map((brand) => (
                                    <option key={brand} value={brand} />
                                ))}
                            </datalist>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <Field
                            name="powered_by"
                            label="Powered by"
                            error={errors.powered_by}
                            defaultValue={product?.powered_by}
                        />
                        <Field
                            name="drum_capacity"
                            label="Drum capacity"
                            error={errors.drum_capacity}
                            defaultValue={product?.drum_capacity}
                        />
                        <Field
                            name="operating_weight"
                            label="Operating weight"
                            error={errors.operating_weight}
                            defaultValue={product?.operating_weight}
                        />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="is_new"
                                name="is_new"
                                value="1"
                                defaultChecked={product?.is_new ?? true}
                            />
                            <Label htmlFor="is_new">
                                Mark as new equipment
                            </Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox
                                id="is_active"
                                name="is_active"
                                value="1"
                                defaultChecked={product?.is_active ?? true}
                            />
                            <Label htmlFor="is_active">
                                Active on public site
                            </Label>
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={product?.description ?? ''}
                            rows={5}
                            className="rounded-md border bg-background px-3 py-2 text-sm"
                        />
                        <InputError message={errors.description} />
                    </div>

                    {removedImageIds.map((id) => (
                        <input
                            key={id}
                            type="hidden"
                            name="remove_image_ids[]"
                            value={id}
                        />
                    ))}

                    {existingImages.length > 0 && (
                        <div className="grid gap-3">
                            <Label>Existing images</Label>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {existingImages.map((image) => (
                                    <div
                                        key={image.id}
                                        className="relative rounded-md border bg-white p-3"
                                    >
                                        <img
                                            src={image.url}
                                            alt=""
                                            className="h-28 w-full object-contain"
                                        />
                                        <button
                                            type="button"
                                            aria-label="Remove image"
                                            onClick={() =>
                                                removeExistingImage(image.id)
                                            }
                                            className="absolute top-2 right-2 inline-flex size-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm transition hover:bg-destructive/90"
                                        >
                                            <X className="size-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="grid gap-2">
                        <Label htmlFor="images">Add images</Label>
                        <MultiImageUploadPreview id="images" name="images[]" />
                        <InputError message={errors.images} />
                    </div>

                    <div className="flex gap-3">
                        <Button
                            disabled={processing}
                            className="bg-brand-gold text-brand-gold-foreground hover:bg-brand-gold/90"
                        >
                            Save product
                        </Button>
                        <Button asChild variant="outline">
                            <Link href={cancelHref ?? products.index()}>
                                Cancel
                            </Link>
                        </Button>
                    </div>
                </AdminFormShell>
            )}
        </Form>
    );
}

function Field(props: {
    name: string;
    label: string;
    error?: string;
    defaultValue?: string | null;
    placeholder?: string;
    required?: boolean;
    list?: string;
}) {
    return (
        <div className="grid gap-2">
            {props.required ? (
                <RequiredLabel htmlFor={props.name}>
                    {props.label}
                </RequiredLabel>
            ) : (
                <Label htmlFor={props.name}>{props.label}</Label>
            )}
            <Input
                id={props.name}
                name={props.name}
                defaultValue={props.defaultValue ?? ''}
                placeholder={props.placeholder}
                required={props.required}
                list={props.list}
            />
            <InputError message={props.error} />
        </div>
    );
}
