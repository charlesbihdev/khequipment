export function PromoSkeleton() {
    return (
        <div className="mt-8 grid min-h-[360px] overflow-hidden rounded-md border border-border bg-foreground shadow-sm lg:grid-cols-[0.88fr_1.12fr]">
            <div className="space-y-5 p-6 sm:p-10 lg:p-12">
                <div className="h-8 w-40 animate-pulse rounded-md bg-white/10" />
                <div className="h-16 w-4/5 animate-pulse rounded-md bg-white/10" />
                <div className="h-10 w-3/5 animate-pulse rounded-md bg-white/10" />
                <div className="h-12 w-44 animate-pulse rounded-md bg-white/10" />
            </div>
            <div className="min-h-[300px] animate-pulse bg-muted sm:min-h-[390px]" />
        </div>
    );
}
