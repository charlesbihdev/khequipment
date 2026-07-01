import { ArrowRight } from 'lucide-react';
import { PromoMedia } from '@/components/home/promos/promo-media';
import type { HomepagePromo } from '@/types/promos';

type PromoCardProps = {
    promo: HomepagePromo;
};

export function PromoCard({ promo }: PromoCardProps) {
    return (
        <article
            className="grid min-h-[360px] overflow-hidden rounded-md border border-border bg-foreground shadow-sm lg:grid-cols-[0.88fr_1.12fr]"
        >
            <div className="flex min-h-[360px] flex-col justify-center p-6 text-white sm:p-10 lg:p-12">
                <div className="flex flex-wrap items-center gap-3">
                    <p className="rounded-md bg-brand-gold px-3 py-1.5 text-sm font-black tracking-wide text-brand-gold-foreground uppercase">
                        {promo.eyebrow}
                    </p>
                    {promo.product && (
                        <p className="text-base font-bold text-white/75">
                            {promo.product.name}
                        </p>
                    )}
                </div>

                <h3 className="mt-5 max-w-2xl text-4xl leading-tight font-black sm:text-5xl">
                    {promo.title}
                </h3>

                {(promo.subtitle || promo.description) && (
                    <p className="mt-4 max-w-2xl text-xl leading-8 font-semibold text-white/82 sm:text-2xl">
                        {promo.subtitle ?? promo.description}
                    </p>
                )}

                <div className="mt-8">
                    <a
                        href={promo.ctaUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-brand-gold px-5 py-3 text-base font-black text-brand-gold-foreground transition hover:bg-white"
                    >
                        Request on WhatsApp
                        <ArrowRight className="size-5" />
                    </a>
                </div>
            </div>

            <PromoMedia promo={promo} />
        </article>
    );
}
