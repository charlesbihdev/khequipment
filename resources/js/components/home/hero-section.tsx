import { Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { type MouseEvent, type ReactNode, useRef, useState } from 'react';
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

    function scrollToPromos(event: MouseEvent<HTMLAnchorElement>) {
        const promoSection = document.getElementById('todays-deal');

        if (!promoSection) {
            return;
        }

        event.preventDefault();
        promoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', '#todays-deal');
    }

    function scrollSlowlyToProjects(event: MouseEvent<HTMLAnchorElement>) {
        const projectsSection = document.getElementById('projects');

        if (!projectsSection) {
            return;
        }

        event.preventDefault();

        const startPosition = window.scrollY;
        const targetPosition =
            projectsSection.getBoundingClientRect().top + window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 2200;
        let startTime: number | null = null;

        function easeInOutCubic(progress: number) {
            return progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        }

        function step(timestamp: number) {
            startTime ??= timestamp;

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            window.scrollTo(
                0,
                startPosition + distance * easeInOutCubic(progress),
            );

            if (progress < 1) {
                window.requestAnimationFrame(step);
                return;
            }

            window.history.replaceState(null, '', '#projects');
        }

        window.requestAnimationFrame(step);
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

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 pt-28 pb-24 text-center sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h1 className="text-6xl leading-tight font-bold text-brand-gold sm:text-7xl lg:text-8xl">
                        KH Equipment Hub
                    </h1>
                    <p className="mx-auto mt-5 max-w-2xl text-3xl leading-9 font-light text-white/90 sm:text-4xl">
                        A name you trust
                    </p>
                    <p className="mx-auto mt-4 max-w-3xl text-xl leading-8 text-white/80 sm:text-2xl">
                        Construction machines, generators, solar systems,
                        electrical equipment, spare parts, waterproofing
                        solutions, and construction work.
                    </p>
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href={products.url()}
                            prefetch
                            className="inline-flex items-center justify-center rounded-lg bg-brand-gold px-6 py-3 text-xl font-semibold text-brand-gold-foreground transition hover:bg-white"
                        >
                            Explore our Products
                        </Link>
                        <a
                            href="#todays-deal"
                            onClick={scrollToPromos}
                            className="inline-flex items-center justify-center rounded-lg border border-white/35 bg-white/10 px-6 py-3 text-xl font-semibold text-white backdrop-blur transition hover:border-brand-gold hover:bg-white/16 hover:text-brand-gold"
                        >
                            View Today's Promo
                        </a>
                    </div>
                </div>
            </div>

            <a
                href="#projects"
                onClick={scrollSlowlyToProjects}
                className="absolute bottom-6 left-1/2 z-20 flex w-[min(18rem,calc(100%-7rem))] -translate-x-1/2 flex-col items-center gap-2 text-center text-xs leading-5 font-semibold tracking-wide text-white/75 transition hover:text-brand-gold sm:w-auto sm:text-sm"
            >
                <span>Today's promo, projects, and services below</span>
                <ChevronDown className="size-7 animate-bounce" />
            </a>

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
