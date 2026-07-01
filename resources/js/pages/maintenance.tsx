import { Head } from '@inertiajs/react';
import { MessageCircle, ShieldCheck } from 'lucide-react';

type MaintenanceProps = {
    siteName: string;
    message: string;
    phone: string;
    whatsappUrl: string;
};

export default function Maintenance({
    siteName,
    message,
    phone,
    whatsappUrl,
}: MaintenanceProps) {
    return (
        <>
            <Head title="Maintenance" />
            <main className="relative flex min-h-screen items-center overflow-hidden bg-foreground px-4 py-12 font-public text-white sm:px-6 lg:px-8">
                <img
                    src="/images/hero/titlebar-bg.jpg"
                    alt=""
                    className="absolute inset-0 size-full object-cover opacity-35"
                />
                <div className="absolute inset-0 bg-black/72" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black to-transparent" />

                <section className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <div>
                        <img
                            src="/images/icons/logo.png"
                            alt={siteName}
                            className="h-20 w-auto"
                        />
                        <p className="mt-8 inline-flex items-center gap-3 text-lg font-bold tracking-[0.18em] text-brand-gold uppercase">
                            Maintenance in progress
                        </p>
                        <h1 className="mt-5 max-w-3xl text-5xl leading-tight font-black text-white sm:text-6xl">
                            We will be back soon
                        </h1>
                        <p className="mt-5 max-w-2xl text-xl leading-8 text-white/78">
                            {message}
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-gold px-5 py-3 text-base font-bold text-brand-gold-foreground transition hover:bg-white"
                            >
                                <MessageCircle className="size-5" />
                                Contact us on WhatsApp
                            </a>
                            <a
                                href={`tel:${phone.replace(/\s+/g, '')}`}
                                className="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/10 px-5 py-3 text-base font-bold text-white backdrop-blur transition hover:border-brand-gold hover:text-brand-gold"
                            >
                                {phone}
                            </a>
                        </div>
                    </div>

                    <div className="rounded-md border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-md">
                        <div className="flex items-start gap-4">
                            <div>
                                <h2 className="text-2xl font-black">
                                    {siteName}
                                </h2>
                                <p className="mt-3 text-lg leading-8 text-white/76">
                                    Our team is making updates to serve you
                                    better. Product enquiries, construction
                                    work, waterproofing solutions, and spare
                                    parts requests are still welcome through our
                                    contact lines.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
