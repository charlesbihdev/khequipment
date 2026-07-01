import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ProjectSummaryCard } from '@/components/home/projects/project-summary-card';
import { ProjectsSectionSkeleton } from '@/components/home/projects/projects-section-skeleton';
import type {
    HomepageProject,
    PaginatedHomepageProjects,
} from '@/types/projects';

type ProjectsSectionProps = {
    projects?: PaginatedHomepageProjects;
    loading?: boolean;
};

function getVisibleCount() {
    if (window.matchMedia('(min-width: 768px)').matches) {
        return 3;
    }

    if (window.matchMedia('(min-width: 640px)').matches) {
        return 2;
    }

    return 1;
}

export function ProjectsSection({
    projects,
    loading = false,
}: ProjectsSectionProps) {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const shouldResetScrollRef = useRef(false);
    const [items, setItems] = useState<HomepageProject[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPage, setNextPage] = useState<number | null>(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const hasProjects = Boolean(projects);

    useEffect(() => {
        const updateVisibleCount = () => setVisibleCount(getVisibleCount());

        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);

        return () => window.removeEventListener('resize', updateVisibleCount);
    }, []);

    useEffect(() => {
        if (!projects) {
            return;
        }

        setCurrentPage(projects.currentPage);
        setNextPage(projects.nextPage);
        setItems(projects.data);
        setSlideIndex(0);
        setLoadingMore(false);

        if (shouldResetScrollRef.current) {
            window.requestAnimationFrame(() => {
                const scroller = scrollerRef.current;

                if (!scroller) {
                    shouldResetScrollRef.current = false;

                    return;
                }

                scroller.style.scrollBehavior = 'auto';
                scroller.scrollLeft = 0;

                window.requestAnimationFrame(() => {
                    scroller.style.scrollBehavior = '';
                    shouldResetScrollRef.current = false;
                });
            });
        }
    }, [projects]);

    useEffect(() => {
        if (!hasProjects || window.location.hash !== '#projects') {
            return;
        }

        window.requestAnimationFrame(() => {
            document
                .getElementById('projects')
                ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        });
    }, [hasProjects]);

    useEffect(() => {
        const scroller = scrollerRef.current;
        const card = scroller?.querySelector<HTMLElement>('[data-project-card]');

        if (!scroller || !card || shouldResetScrollRef.current) {
            return;
        }

        scroller.scrollTo({
            left: slideIndex * (card.offsetWidth + 20),
            behavior: 'smooth',
        });
    }, [slideIndex, items]);

    const hasItems = items.length > 0;
    const maxSlideIndex = Math.max(items.length - visibleCount, 0);
    const hasPrevious = currentPage > 1 || slideIndex > 0;
    const hasNext = slideIndex < maxSlideIndex || Boolean(nextPage);
    const canNavigate = hasPrevious || hasNext;

    if (loading || !projects) {
        return <ProjectsSectionSkeleton />;
    }

    if (!hasItems) {
        return null;
    }

    function loadProjectPage(page: number) {
        shouldResetScrollRef.current = true;
        setLoadingMore(true);
        router.reload({
            data: { project_page: page },
            only: ['projects'],
            onError: () => {
                shouldResetScrollRef.current = false;
                setLoadingMore(false);
            },
        });
    }

    function scrollProjects(direction: 'previous' | 'next') {
        if (loadingMore) {
            return;
        }

        if (direction === 'next') {
            if (slideIndex < maxSlideIndex) {
                setSlideIndex((current) =>
                    Math.min(current + visibleCount, maxSlideIndex),
                );

                return;
            }

            if (nextPage) {
                loadProjectPage(nextPage);
            }

            return;
        }

        if (slideIndex > 0) {
            setSlideIndex((current) => Math.max(current - visibleCount, 0));

            return;
        }

        if (currentPage > 1) {
            loadProjectPage(currentPage - 1);
        }
    }

    return (
        <section id="projects" className="bg-background py-14 sm:py-[4.5rem]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="text-4xl leading-tight font-extrabold text-foreground sm:text-5xl">
                        <span className="text-brand-gold">Projects</span> &
                        Services Delivered
                    </p>
                    <h2 className="mt-3 text-lg leading-7 font-semibold text-muted-foreground sm:text-xl">
                        Stories of equipment supplied, contracts supported, and
                        work delivered for clients.
                    </h2>
                </div>

                <div className="group relative mx-auto mt-8 max-w-[1040px]">
                    <div
                        ref={scrollerRef}
                        className="flex snap-x justify-start gap-5 overflow-x-auto scroll-smooth px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {items.map((project) => (
                            <div
                                key={project.id}
                                data-project-card
                                className="snap-start"
                            >
                                <ProjectSummaryCard project={project} />
                            </div>
                        ))}
                    </div>

                    {canNavigate && (
                        <>
                            {hasPrevious && (
                                <button
                                    type="button"
                                    onClick={() => scrollProjects('previous')}
                                    disabled={loadingMore}
                                    className="absolute top-1/2 left-3 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white opacity-0 shadow-lg backdrop-blur-md transition hover:bg-black/35 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:cursor-wait disabled:opacity-50 group-hover:opacity-100"
                                >
                                    <ChevronLeft className="size-6" />
                                    <span className="sr-only">
                                        Previous project
                                    </span>
                                </button>
                            )}
                            {hasNext && (
                                <button
                                    type="button"
                                    onClick={() => scrollProjects('next')}
                                    disabled={loadingMore}
                                    className="absolute top-1/2 right-3 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white opacity-0 shadow-lg backdrop-blur-md transition hover:bg-black/35 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:cursor-wait disabled:opacity-50 group-hover:opacity-100"
                                >
                                    <ChevronRight className="size-6" />
                                    <span className="sr-only">
                                        Next project
                                    </span>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
