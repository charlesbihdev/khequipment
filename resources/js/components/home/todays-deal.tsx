import { PromoCarousel } from '@/components/home/promos/promo-carousel';
import { PromoSectionHeader } from '@/components/home/promos/promo-section-header';
import { PromoSkeleton } from '@/components/home/promos/promo-skeleton';
import type { HomepagePromo } from '@/types/promos';

type TodaysDealProps = {
    promos: HomepagePromo[];
    loading?: boolean;
};

export function TodaysDeal({ promos, loading = false }: TodaysDealProps) {
    if (loading) {
        return (
            <PromoSection>
                <PromoSectionHeader />
                <PromoSkeleton />
            </PromoSection>
        );
    }

    if (promos.length === 0) {
        return null;
    }

    return (
        <PromoSection>
            <PromoCarousel promos={promos} />
        </PromoSection>
    );
}

function PromoSection({ children }: { children: React.ReactNode }) {
    return (
        <section className="bg-background py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
            </div>
        </section>
    );
}
