import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { home } from '@/routes';

const equipment = [
    {
        name: 'Concrete mixers',
        image: '/images/home/mortar mixer.jpg',
        description:
            'Reliable mixers and site equipment for active construction teams.',
    },
    {
        name: 'Generators',
        image: '/images/home/white gen.jpg',
        description:
            'Power solutions for workshops, sites, facilities, and backup needs.',
    },
    {
        name: 'Scaffolding',
        image: '/images/home/scarfold.jpg',
        description:
            'Support equipment for safer building, repairs, and installations.',
    },
];

export function EquipmentPreview() {
    return (
        <section
            id="equipment"
            className="bg-primary py-20 text-primary-foreground sm:py-28"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                        <p className="text-5xl leading-tight font-extrabold sm:text-6xl">
                            <span className="text-brand-gold">Equipment</span>{' '}
                            Range
                        </p>
                        <h2 className="mt-5 max-w-3xl text-2xl leading-9 font-semibold text-white/75 sm:text-3xl">
                            Machines, power, and site support for serious work.
                        </h2>
                    </div>
                    <Link
                        href={`${home.url()}#support`}
                        className="inline-flex items-center gap-2 text-base font-bold text-brand-gold hover:text-white"
                    >
                        Start a quote request
                        <ArrowRight className="size-5" />
                    </Link>
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {equipment.map((item) => (
                        <article
                            key={item.name}
                            className="overflow-hidden rounded-md bg-white text-foreground shadow-sm"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="aspect-4/3 w-full object-cover"
                            />
                            <div className="p-5">
                                <h3 className="text-xl font-black">
                                    {item.name}
                                </h3>
                                <p className="mt-3 text-base leading-7 text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
