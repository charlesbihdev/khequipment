import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { HomepagePromo } from '@/types/promos';

type PromoMediaProps = {
    promo: HomepagePromo;
};

export function PromoMedia({ promo }: PromoMediaProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        setIsPaused(false);
    }, [promo.id]);

    function togglePlayback() {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            void video.play();
            setIsPaused(false);
            return;
        }

        video.pause();
        setIsPaused(true);
    }

    return (
        <div className="relative min-h-[300px] overflow-hidden bg-white sm:min-h-[390px]">
            {promo.mediaType === 'video' ? (
                <>
                    <video
                        ref={videoRef}
                        src={promo.mediaUrl}
                        className="absolute inset-0 size-full object-contain"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onPlay={() => setIsPaused(false)}
                        onPause={() => setIsPaused(true)}
                    />
                    <button
                        type="button"
                        onClick={togglePlayback}
                        aria-label={
                            isPaused ? 'Play promo video' : 'Pause promo video'
                        }
                        className="absolute right-3 bottom-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-brand-steel shadow-sm backdrop-blur-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                    >
                        {isPaused ? (
                            <Play className="size-4" fill="currentColor" />
                        ) : (
                            <Pause className="size-4" fill="currentColor" />
                        )}
                    </button>
                </>
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
