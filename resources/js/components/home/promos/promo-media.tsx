import type { HomepagePromo } from '@/types/promos';

type PromoMediaProps = {
    promo: HomepagePromo;
};

export function PromoMedia({ promo }: PromoMediaProps) {
    return (
        <div className="relative min-h-[300px] bg-white sm:min-h-[390px]">
            {promo.mediaType === 'video' ? (
                <video
                    src={promo.mediaUrl}
                    className="absolute inset-0 size-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            ) : (
                <img
                    src={promo.mediaUrl}
                    alt={promo.title}
                    className="absolute inset-0 size-full object-contain p-4 sm:p-6"
                    loading="lazy"
                />
            )}
        </div>
    );
}
