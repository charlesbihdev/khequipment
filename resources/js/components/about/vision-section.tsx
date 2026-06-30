import { Building2, Eye, ShieldCheck } from 'lucide-react';

const items = [
    {
        title: 'Mission',
        icon: Building2,
        text: 'To provide reliable and efficient solutions in construction and mining, with equipment and service that help customers keep work moving.',
    },
    {
        title: 'Values',
        icon: ShieldCheck,
        text: 'Reliability, customer commitment, and practical support guide how we supply machines, parts, and energy solutions.',
    },
    {
        title: 'Vision',
        icon: Eye,
        text: 'To lead with dependable industrial equipment solutions and create lasting value for customers across the industries we serve.',
    },
];

export function VisionSection() {
    return (
        <section className="bg-primary py-20 text-primary-foreground sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-5xl leading-tight font-extrabold sm:text-6xl">
                        Our <span className="text-brand-gold">Vision</span>
                    </p>
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <article
                                key={item.title}
                                className="rounded-md border border-white/15 bg-background p-6 text-center text-foreground"
                            >
                                <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-brand-gold text-brand-gold-foreground">
                                    <Icon className="size-6" />
                                </div>
                                <h2 className="mt-5 text-2xl font-extrabold text-brand-gold">
                                    {item.title}
                                </h2>
                                <p className="mt-3 text-lg leading-8 text-muted-foreground">
                                    {item.text}
                                </p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
