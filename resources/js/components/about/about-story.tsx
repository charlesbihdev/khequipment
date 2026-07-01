const paragraphs = [
    'KH Equipment Hub is a trusted industry leader specializing in the supply of top-quality mining, construction, and road construction equipment, as well as spare parts.',
    'In addition to our range of equipment, we also offer solar systems, generators, waterproofing solutions, and construction work.',
    'Our commitment to customer satisfaction extends beyond the point of sale, with real warranties and spare-parts support for our clients.',
    'We make buying easier with a professional sales team that provides personalized assistance and expert guidance every step of the way.',
];

export function AboutStory() {
    return (
        <section className="bg-background py-20 sm:py-28">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/images/home/img1.jpg"
                        alt="Heavy equipment supplied by KH Equipment Hub"
                        className="h-full min-h-80 rounded-md object-cover"
                    />
                    <img
                        src="/images/home/cover photo.jpg"
                        alt="Construction equipment for sale"
                        className="mt-10 h-full min-h-80 rounded-md object-cover"
                    />
                </div>

                <div>
                    <p className="text-5xl leading-tight font-extrabold text-foreground sm:text-6xl">
                        <span className="text-brand-gold">About</span> KH
                        Equipment Hub
                    </p>
                    <div className="mt-7 space-y-5 text-xl leading-9 text-muted-foreground">
                        {paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
