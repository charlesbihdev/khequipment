import { useEffect, useState } from 'react';
import { PromoCard } from '@/components/home/promos/promo-card';
import { PromoSectionHeader } from '@/components/home/promos/promo-section-header';
import type { HomepagePromo } from '@/types/promos';

type PromoCarouselProps = {
    promos: HomepagePromo[];
};

export function PromoCarousel({ promos }: PromoCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const hasMultiplePromos = promos.length > 1;

    function showPreviousPromo() {
        setActiveIndex((currentIndex) =>
            currentIndex === 0 ? promos.length - 1 : currentIndex - 1,
        );
    }

    function showNextPromo() {
        setActiveIndex((currentIndex) => (currentIndex + 1) % promos.length);
    }

    useEffect(() => {
        if (!hasMultiplePromos) {
            return;
        }

        const timer = window.setInterval(() => {
            showNextPromo();
        }, 8000);

        return () => window.clearInterval(timer);
    }, [hasMultiplePromos, promos.length]);

    useEffect(() => {
        setActiveIndex(0);
    }, [promos.length]);

    return (
        <>
            <PromoSectionHeader />

            <div className="group relative mt-8">
                <PromoCard promo={promos[activeIndex]} />

                {hasMultiplePromos && (
                    <>
                        <button
                            type="button"
                            onClick={showPreviousPromo}
                            className="absolute top-1/2 left-4 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white opacity-0 shadow-lg backdrop-blur-md transition hover:bg-white/25 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold group-hover:opacity-100"
                        >
                            <span className="text-3xl leading-none">‹</span>
                            <span className="sr-only">Previous promo</span>
                        </button>
                        <button
                            type="button"
                            onClick={showNextPromo}
                            className="absolute top-1/2 right-4 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-white/15 text-white opacity-0 shadow-lg backdrop-blur-md transition hover:bg-white/25 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold group-hover:opacity-100"
                        >
                            <span className="text-3xl leading-none">›</span>
                            <span className="sr-only">Next promo</span>
                        </button>
                    </>
                )}
            </div>

            {hasMultiplePromos && (
                <div className="mt-5 flex justify-center gap-2">
                    {promos.map((promo, index) => (
                        <button
                            key={promo.id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={`h-2.5 rounded-full transition-all ${
                                activeIndex === index
                                    ? 'w-10 bg-brand-gold'
                                    : 'w-2.5 bg-muted-foreground/35 hover:bg-muted-foreground/60'
                            }`}
                        >
                            <span className="sr-only">
                                Show promo {index + 1}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </>
    );
}
