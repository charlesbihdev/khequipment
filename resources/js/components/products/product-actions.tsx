import { useForm } from '@inertiajs/react';
import { Send, X } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { store } from '@/routes/quotes';

type ProductActionsProps = {
    productId: number;
    productName: string;
};

type QuoteFormData = {
    product_id: number;
    product_name: string;
    first_name: string;
    last_name: string;
    company: string;
    address: string;
    country: string;
    email: string;
    phone: string;
    message: string;
    website: string;
};

export function ProductActions({
    productId,
    productName,
}: ProductActionsProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } =
        useForm<QuoteFormData>({
            product_id: productId,
            product_name: productName,
            first_name: '',
            last_name: '',
            company: '',
            address: '',
            country: '',
            email: '',
            phone: '',
            message: '',
            website: '',
        });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(store.url(), {
            preserveScroll: true,
            onSuccess: () => {
                reset(
                    'first_name',
                    'last_name',
                    'company',
                    'address',
                    'country',
                    'email',
                    'phone',
                    'message',
                    'website',
                );
                setData('product_name', productName);
                setIsOpen(false);
            },
        });
    };

    const inputClass =
        'mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-lg outline-none focus:border-brand-gold';

    return (
        <div className="mt-8">
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-5 py-4 text-xl font-bold text-brand-gold-foreground hover:bg-primary hover:text-primary-foreground sm:w-auto"
            >
                <Send className="size-5" />
                Request quote
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-8"
                    role="dialog"
                    aria-modal="true"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="max-h-full w-full max-w-2xl overflow-y-auto rounded-md bg-background shadow-xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between border-b border-border p-5">
                            <div>
                                <h2 className="text-2xl font-extrabold">
                                    Request a quote
                                </h2>
                                <p className="mt-1 text-lg text-muted-foreground">
                                    {productName}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                                aria-label="Close quote form"
                            >
                                <X className="size-5" />
                            </button>
                        </div>

                        <form onSubmit={submit} className="space-y-5 p-5">
                            <input
                                type="hidden"
                                name="product_id"
                                value={data.product_id}
                            />
                            <input
                                type="text"
                                name="website"
                                value={data.website}
                                onChange={(event) =>
                                    setData('website', event.target.value)
                                }
                                className="hidden"
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            <div>
                                <label
                                    htmlFor="quote-product"
                                    className="text-lg font-bold"
                                >
                                    Product Name <RequiredMark />
                                </label>
                                <input
                                    id="quote-product"
                                    type="text"
                                    name="product_name"
                                    value={data.product_name}
                                    placeholder="Product name"
                                    required
                                    onChange={(event) =>
                                        setData(
                                            'product_name',
                                            event.target.value,
                                        )
                                    }
                                    className={inputClass}
                                />
                                {errors.product_name && (
                                    <p className="mt-2 text-sm text-destructive">
                                        {errors.product_name}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    id="first_name"
                                    label="First Name"
                                    value={data.first_name}
                                    error={errors.first_name}
                                    placeholder="Your first name"
                                    required
                                    onChange={(value) =>
                                        setData('first_name', value)
                                    }
                                    inputClass={inputClass}
                                />
                                <Field
                                    id="last_name"
                                    label="Last Name"
                                    value={data.last_name}
                                    error={errors.last_name}
                                    placeholder="Your last name"
                                    required
                                    onChange={(value) =>
                                        setData('last_name', value)
                                    }
                                    inputClass={inputClass}
                                />
                            </div>

                            <Field
                                id="company"
                                label="Company"
                                value={data.company}
                                error={errors.company}
                                placeholder="Company name"
                                onChange={(value) => setData('company', value)}
                                inputClass={inputClass}
                            />

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    id="address"
                                    label="Address"
                                    value={data.address}
                                    error={errors.address}
                                    placeholder="Your address"
                                    required
                                    onChange={(value) =>
                                        setData('address', value)
                                    }
                                    inputClass={inputClass}
                                />
                                <Field
                                    id="country"
                                    label="Country"
                                    value={data.country}
                                    error={errors.country}
                                    placeholder="Your country"
                                    required
                                    onChange={(value) =>
                                        setData('country', value)
                                    }
                                    inputClass={inputClass}
                                />
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    value={data.email}
                                    error={errors.email}
                                    placeholder="name@company.com"
                                    required
                                    onChange={(value) =>
                                        setData('email', value)
                                    }
                                    inputClass={inputClass}
                                />
                                <Field
                                    id="phone"
                                    type="tel"
                                    label="Phone Number"
                                    value={data.phone}
                                    error={errors.phone}
                                    placeholder="Your phone number"
                                    required
                                    onChange={(value) =>
                                        setData('phone', value)
                                    }
                                    inputClass={inputClass}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="text-lg font-bold"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    value={data.message}
                                    placeholder="Tell us what you need quoted"
                                    onChange={(event) =>
                                        setData('message', event.target.value)
                                    }
                                    className={`${inputClass} resize-none`}
                                />
                                {errors.message && (
                                    <p className="mt-2 text-sm text-destructive">
                                        {errors.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-gold px-6 py-3 text-lg font-bold text-brand-gold-foreground transition hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
                            >
                                <Send className="size-5" />
                                {processing
                                    ? 'Sending...'
                                    : 'Send me a non-binding quote'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

type FieldProps = {
    id: keyof QuoteFormData;
    label: string;
    value: string;
    error?: string;
    placeholder: string;
    inputClass: string;
    type?: string;
    required?: boolean;
    onChange: (value: string) => void;
};

function Field({
    id,
    label,
    value,
    error,
    placeholder,
    inputClass,
    type = 'text',
    required = false,
    onChange,
}: FieldProps) {
    return (
        <div>
            <label htmlFor={id} className="text-lg font-bold">
                {label} {required && <RequiredMark />}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                placeholder={placeholder}
                required={required}
                onChange={(event) => onChange(event.target.value)}
                className={inputClass}
            />
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
    );
}

function RequiredMark() {
    return (
        <span className="text-destructive" aria-label="required">
            *
        </span>
    );
}
