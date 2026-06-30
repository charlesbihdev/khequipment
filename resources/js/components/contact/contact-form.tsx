import { useForm } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { type FormEvent } from 'react';
import { store } from '@/routes/contact';

type ContactFormData = {
    name: string;
    email: string;
    message: string;
    website: string;
};

export function ContactForm() {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } =
        useForm<ContactFormData>({
            name: '',
            email: '',
            message: '',
            website: '',
        });

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        post(store.url(), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="space-y-5">
            <input
                type="text"
                name="website"
                value={data.website}
                onChange={(event) => setData('website', event.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
            />

            <div>
                <label htmlFor="name" className="text-lg font-bold">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    placeholder="Your full name"
                    onChange={(event) => setData('name', event.target.value)}
                    className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-lg outline-none focus:border-brand-gold"
                />
                {errors.name && (
                    <p className="mt-2 text-sm text-destructive">
                        {errors.name}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="email" className="text-lg font-bold">
                    Email address
                </label>
                <input
                    id="email"
                    type="email"
                    value={data.email}
                    placeholder="you@example.com"
                    onChange={(event) => setData('email', event.target.value)}
                    className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-lg outline-none focus:border-brand-gold"
                />
                {errors.email && (
                    <p className="mt-2 text-sm text-destructive">
                        {errors.email}
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="message" className="text-lg font-bold">
                    Message
                </label>
                <textarea
                    id="message"
                    rows={5}
                    value={data.message}
                    placeholder="Tell us what equipment or support you need"
                    onChange={(event) => setData('message', event.target.value)}
                    className="mt-2 w-full resize-none rounded-md border border-border bg-background px-4 py-3 text-lg outline-none focus:border-brand-gold"
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
                {processing ? 'Sending...' : 'Send message'}
            </button>

            {recentlySuccessful && (
                <p className="text-lg font-semibold text-success">
                    We have received your message.
                </p>
            )}
        </form>
    );
}
