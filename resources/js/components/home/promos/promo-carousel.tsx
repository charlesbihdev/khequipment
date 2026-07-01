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

    useEffect(() => {
        if (!hasMultiplePromos) {
            return;
        }

        const timer = window.setInterval(() => {
            setActiveIndex((currentIndex) => (currentIndex + 1) % promos.length);
        }, 6000);

        return () => window.clearInterval(timer);
    }, [hasMultiplePromos, promos.length]);

    useEffect(() => {
        setActiveIndex(0);
    }, [promos.length]);

    return (
        <>
            <PromoSectionHeader />

            <div className="mt-8">
                <PromoCard promo={promos[activeIndex]} />
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
