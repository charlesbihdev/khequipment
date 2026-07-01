export function ProjectsSectionSkeleton() {
    return (
        <section id="projects" className="bg-background py-14 sm:py-[4.5rem]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="h-16 max-w-3xl animate-pulse rounded-md bg-muted" />
                <div className="mt-8 flex gap-5 overflow-hidden">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="w-[78vw] shrink-0 overflow-hidden rounded-md border border-border bg-card sm:w-[340px]"
                        >
                            <div className="aspect-video animate-pulse bg-muted" />
                            <div className="space-y-3 p-4">
                                <div className="h-6 w-32 animate-pulse rounded-md bg-muted" />
                                <div className="h-8 w-4/5 animate-pulse rounded-md bg-muted" />
                                <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
