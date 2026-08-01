import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { HomepagePromo } from '@/types/promos';

type PromoMediaProps = {
    promo: HomepagePromo;
};

type VideoOrientation = 'unknown' | 'portrait' | 'landscape';

export function PromoMedia({ promo }: PromoMediaProps) {
    const backgroundVideoRef = useRef<HTMLVideoElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [orientation, setOrientation] = useState<VideoOrientation>('unknown');
    const isPortraitVideo = orientation === 'portrait';

    useEffect(() => {
        setIsPaused(false);
        setOrientation('unknown');
    }, [promo.id]);

    function syncOrientation(video: HTMLVideoElement) {
        if (!video.videoWidth || !video.videoHeight) return;

        setOrientation(
            video.videoHeight > video.videoWidth ? 'portrait' : 'landscape',
        );
    }

    function playVideos() {
        const videos = [backgroundVideoRef.current, videoRef.current];

        videos.forEach((video) => {
            if (video) void video.play();
        });

        setIsPaused(false);
    }

    function pauseVideos() {
        const videos = [backgroundVideoRef.current, videoRef.current];

        videos.forEach((video) => video?.pause());
        setIsPaused(true);
    }

    function togglePlayback() {
        const video = videoRef.current;

        if (!video) return;

        if (video.paused) {
            playVideos();
            return;
        }

        pauseVideos();
    }

    return (
        <div
            className={`relative overflow-hidden bg-brand-steel transition-[min-height] duration-300 ${
                isPortraitVideo
                    ? 'min-h-[520px] sm:min-h-[620px] lg:min-h-[680px]'
                    : 'min-h-[300px] sm:min-h-[390px]'
            }`}
        >
            {promo.mediaType === 'video' ? (
                <>
                    <video
                        ref={backgroundVideoRef}
                        src={promo.mediaUrl}
                        className="absolute inset-0 size-full scale-110 object-cover opacity-35 blur-xl"
                        aria-hidden="true"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        tabIndex={-1}
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <video
                        ref={videoRef}
                        src={promo.mediaUrl}
                        className="absolute inset-0 z-10 size-full object-contain drop-shadow-2xl"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onLoadedMetadata={(event) =>
                            syncOrientation(event.currentTarget)
                        }
                        onPlay={() => setIsPaused(false)}
                        onPause={() => setIsPaused(true)}
                    />
                    <button
                        type="button"
                        onClick={togglePlayback}
                        aria-label={
                            isPaused ? 'Play promo video' : 'Pause promo video'
                        }
                        className="absolute right-3 bottom-3 z-20 inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-brand-steel shadow-sm backdrop-blur-sm transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
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
