import { Form, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { AdminFormShell } from '@/components/admin/admin-form-shell';
import { SingleMediaUploadPreview } from '@/components/admin/media-upload-preview';
import { RequiredLabel } from '@/components/admin/required-label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { withMethodSpoof } from '@/components/admin/with-method-spoof';
import promos from '@/routes/admin/promos';
import type { SelectOption } from '@/types';
import type { RouteFormDefinition } from '@/wayfinder';

export type AdminPromo = {
    id: number;
    title: string;
    eyebrow: string;
    subtitle: string | null;
    description: string | null;
    media_type: 'image' | 'video';
    product_id: number | null;
    cta_label: string;
    cta_url: string | null;
    starts_at: string | null;
    ends_at: string | null;
    is_active: boolean;
    mediaUrl?: string;
};

type Props = {
    action: RouteFormDefinition<'post'>;
    products: SelectOption[];
    promo?: AdminPromo;
};

export function PromoForm({ action, products, promo }: Props) {
    return (
        <Form
            {...action}
            transform={(data) => withMethodSpoof(data, action.action)}
            className="max-w-4xl"
        >
            {({ processing, errors }) => (
                <AdminFormShell>
                    <div className="grid gap-5 md:grid-cols-2">
                        <Field name="title" label="Title" error={errors.title} defaultValue={promo?.title} required />
                        <Field name="eyebrow" label="Eyebrow" error={errors.eyebrow} defaultValue={promo?.eyebrow ?? "Today's Deal"} required />
                    </div>

                    <Field name="subtitle" label="Subtitle" error={errors.subtitle} defaultValue={promo?.subtitle} />

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <textarea id="description" name="description" rows={4} defaultValue={promo?.description ?? ''} className="rounded-md border bg-background px-3 py-2 text-sm" />
                        <InputError message={errors.description} />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="product_id">Linked product</Label>
                            <select id="product_id" name="product_id" defaultValue={promo?.product_id ?? ''} className="h-9 rounded-md border bg-background px-3 text-sm">
                                <option value="">No product</option>
                                {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
                            </select>
                            <InputError message={errors.product_id} />
                        </div>
                        <Field name="cta_label" label="CTA label" error={errors.cta_label} defaultValue={promo?.cta_label ?? 'Request on WhatsApp'} required />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <Field name="starts_at" label="Starts" type="datetime-local" error={errors.starts_at} defaultValue={promo?.starts_at} />
                        <Field name="ends_at" label="Ends" type="datetime-local" error={errors.ends_at} defaultValue={promo?.ends_at} />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                        <div className="grid gap-2">
                            <RequiredLabel htmlFor="media_type">Media type</RequiredLabel>
                            <select id="media_type" name="media_type" defaultValue={promo?.media_type ?? 'image'} className="h-9 rounded-md border bg-background px-3 text-sm">
                                <option value="image">Image</option>
                                <option value="video">Video</option>
                            </select>
                        </div>
                        <div className="grid gap-2">
                            {promo ? <Label htmlFor="media">Media</Label> : <RequiredLabel htmlFor="media">Media</RequiredLabel>}
                            <SingleMediaUploadPreview
                                id="media"
                                name="media"
                                accept="image/*,video/mp4,video/webm"
                                required={!promo}
                                currentUrl={promo?.mediaUrl}
                                currentType={promo?.media_type}
                            />
                            <InputError message={errors.media} />
                        </div>
                    </div>

                    <label className="flex items-center gap-3">
                        <Checkbox name="is_active" defaultChecked={promo?.is_active ?? true} />
                        Active promo
                    </label>

                    <div className="flex gap-3">
                        <Button disabled={processing} className="bg-brand-gold text-brand-gold-foreground hover:bg-brand-gold/90">Save promo</Button>
                        <Button asChild variant="outline"><Link href={promos.index()}>Cancel</Link></Button>
                    </div>
                </AdminFormShell>
            )}
        </Form>
    );
}

function Field(props: { name: string; label: string; error?: string; defaultValue?: string | null; placeholder?: string; required?: boolean; type?: string }) {
    return (
        <div className="grid gap-2">
            {props.required ? (
                <RequiredLabel htmlFor={props.name}>{props.label}</RequiredLabel>
            ) : (
                <Label htmlFor={props.name}>{props.label}</Label>
            )}
            <Input id={props.name} name={props.name} type={props.type ?? 'text'} defaultValue={props.defaultValue ?? ''} placeholder={props.placeholder} required={props.required} />
            <InputError message={props.error} />
        </div>
    );
}
