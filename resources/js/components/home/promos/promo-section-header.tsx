export function PromoSectionHeader() {
    return (
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
                <p className="text-5xl leading-tight font-extrabold text-foreground sm:text-6xl">
                    <span className="text-brand-gold">Promos</span> / Today's
                    Deals
                </p>
                <h2 className="mt-4 text-2xl leading-9 font-semibold text-muted-foreground sm:text-3xl">
                    Featured equipment offers
                </h2>
            </div>
            <p className="max-w-md text-lg leading-7 font-semibold text-muted-foreground lg:text-right">
                Limited-time deals. Message us directly on WhatsApp.
            </p>
        </div>
    );
}
