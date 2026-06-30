type ContactMapProps = {
    mapEmbedUrl: string;
};

export function ContactMap({ mapEmbedUrl }: ContactMapProps) {
    return (
        <section className="bg-primary py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="overflow-hidden rounded-md border border-white/15 bg-background shadow-sm">
                    <iframe
                        src={mapEmbedUrl}
                        title="KH Equipment Hub location map"
                        className="h-90 w-full"
                        loading="eager"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </section>
    );
}
