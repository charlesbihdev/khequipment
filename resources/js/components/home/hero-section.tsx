import { Link } from '@inertiajs/react';
import { ReactNode, useRef, useState } from 'react';
import { products } from '@/routes';

type HeroSectionProps = {
    nav: ReactNode;
};

export function HeroSection({ nav }: HeroSectionProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [paused, setPaused] = useState(false);

    function toggleVideo() {
        if (!videoRef.current) {
            return;
        }

        if (videoRef.current.paused) {
            void videoRef.current.play();
            setPaused(false);
            return;
        }

        videoRef.current.pause();
        setPaused(true);
    }

    return (
        <section
            id="top"
            className="relative min-h-screen overflow-hidden bg-black text-white"
        >
            {nav}
            <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src="/images/hero/hero-vid.mp4"
                poster="/images/hero/frame1.png"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/30" />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 pt-28 pb-16 text-center sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-6xl leading-tight font-bold text-brand-gold sm:text-7xl lg:text-8xl">
                        KH Equipment Hub
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-3xl leading-9 font-light text-white/90 sm:text-4xl">
                        A name you can trust
                    </p>
                    <p className="mx-auto mt-4 max-w-3xl text-xl leading-8 text-white/80 sm:text-2xl">
                        Construction machines, generators, solar systems,
                        electrical equipment, spare parts, and rentals.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <Link
                            href={products.url()}
                            prefetch
                            className="inline-flex items-center justify-center rounded-lg bg-brand-gold px-6 py-3 text-xl font-semibold text-brand-gold-foreground transition hover:bg-white"
                        >
                            Explore our Products
                        </Link>
                    </div>
                </div>
            </div>

            <button
                type="button"
                onClick={toggleVideo}
                className="absolute right-5 bottom-5 z-20 rounded-full bg-white/12 p-3 ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
            >
                <img
                    src={
                        paused
                            ? '/images/icons/play.png'
                            : '/images/icons/pause.png'
                    }
                    alt={paused ? 'Play video' : 'Pause video'}
                    className="size-6"
                />
            </button>
        </section>
    );
}
