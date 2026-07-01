import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
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

export function ProjectsSection({
    projects,
    loading = false,
}: ProjectsSectionProps) {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [items, setItems] = useState<HomepageProject[]>([]);
    const [nextPage, setNextPage] = useState<number | null>(null);
    const [loadingMore, setLoadingMore] = useState(false);
    const hasProjects = Boolean(projects);

    useEffect(() => {
        if (!projects) {
            return;
        }

        setNextPage(projects.nextPage);
        setItems((currentItems) => {
            const nextItems =
                projects.currentPage === 1 ? [] : [...currentItems];
            const seen = new Set(nextItems.map((project) => project.id));

            projects.data.forEach((project) => {
                if (!seen.has(project.id)) {
                    nextItems.push(project);
                }
            });

            return nextItems;
        });
        setLoadingMore(false);
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

    const hasItems = items.length > 0;
    const canNavigate = items.length > 1 || Boolean(nextPage);

    const canFetchNextPage = useMemo(() => {
        if (!nextPage) {
            return false;
        }

        return true;
    }, [nextPage]);

    if (loading || !projects) {
        return <ProjectsSectionSkeleton />;
    }

    if (!hasItems) {
        return null;
    }

    function scrollProjects(direction: 'previous' | 'next') {
        const scroller = scrollerRef.current;

        if (!scroller) {
            return;
        }

        const card = scroller.querySelector<HTMLElement>('[data-project-card]');
        const cardWidth = card?.offsetWidth ?? 340;

        scroller.scrollBy({
            left: direction === 'next' ? cardWidth + 20 : -(cardWidth + 20),
            behavior: 'smooth',
        });

        if (direction === 'next' && canFetchNextPage && !loadingMore) {
            setLoadingMore(true);
            router.reload({
                data: { project_page: nextPage ?? undefined },
                only: ['projects'],
                onError: () => setLoadingMore(false),
            });
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

                <div className="group relative mt-8">
                    <div
                        ref={scrollerRef}
                        className="flex snap-x gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                            <button
                                type="button"
                                onClick={() => scrollProjects('previous')}
                                className="absolute top-1/2 left-3 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white opacity-0 shadow-lg backdrop-blur-md transition hover:bg-black/35 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold group-hover:opacity-100"
                            >
                                <ChevronLeft className="size-6" />
                                <span className="sr-only">
                                    Previous project
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollProjects('next')}
                                disabled={loadingMore}
                                className="absolute top-1/2 right-3 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/25 text-white opacity-0 shadow-lg backdrop-blur-md transition hover:bg-black/35 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold disabled:cursor-wait disabled:opacity-50 group-hover:opacity-100"
                            >
                                <ChevronRight className="size-6" />
                                <span className="sr-only">Next project</span>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
