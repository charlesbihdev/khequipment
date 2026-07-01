import { Link } from '@inertiajs/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { contact } from '@/routes';

const services = [
    'Construction work',
    'Waterproofing solutions',
    'Construction equipment supply',
];

export function ConstructionWorkSection() {
    return (
        <section
            id="construction-work"
            className="bg-primary py-14 text-primary-foreground sm:py-20"
        >
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
                <div>
                    <p className="text-4xl leading-tight font-extrabold sm:text-5xl">
                        <span className="text-brand-gold">Construction</span>{' '}
                        Work
                    </p>
                    <h2 className="mt-4 max-w-2xl text-2xl leading-8 font-semibold text-white/78">
                        We do more than supply machines. Our team handles
                        construction work, repairs, waterproofing, and site
                        delivery.
                    </h2>
                    <div className="mt-7 space-y-3">
                        {services.map((service) => (
                            <div
                                key={service}
                                className="flex items-center gap-3 text-lg font-semibold text-white/88"
                            >
                                <CheckCircle2 className="size-5 shrink-0 text-brand-gold" />
                                <span>{service}</span>
                            </div>
                        ))}
                    </div>
                    <Link
                        href={contact.url()}
                        prefetch
                        className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand-gold px-5 py-3 text-base font-bold text-brand-gold-foreground transition hover:bg-white"
                    >
                        Talk to us about a project
                        <ArrowRight className="size-5" />
                    </Link>
                </div>

                <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
                    <img
                        src="/images/home/scarfold.jpg"
                        alt="Scaffolding for construction work"
                        className="h-full min-h-72 rounded-md object-cover"
                    />
                    <div className="grid gap-4">
                        <img
                            src="/images/home/mortar mixer.jpg"
                            alt="Mortar mixer for construction work"
                            className="h-36 rounded-md object-cover sm:h-44"
                        />
                        <img
                            src="/images/home/small vehicle.jpg"
                            alt="Construction site support vehicle"
                            className="h-36 rounded-md object-cover sm:h-44"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
