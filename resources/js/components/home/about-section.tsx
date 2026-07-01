const strengths = [
    'Warranty-backed machines',
    'Construction work',
    'Spare parts supply',
    'Waterproofing solutions',
    'Pro sales guidance',
];

export function AboutSection() {
    return (
        <section
            id="about"
            className="bg-background pt-10 pb-16 sm:pt-12 sm:pb-20"
        >
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
                <div>
                    <p className="text-5xl leading-tight font-extrabold text-foreground sm:text-6xl">
                        <span className="text-brand-gold">About</span> KH
                        Equipment Hub
                    </p>
                    <h2 className="mt-5 max-w-3xl text-2xl leading-9 font-semibold text-muted-foreground sm:text-3xl">
                        Built for buyers who need dependable equipment.
                    </h2>
                    <div className="mt-7 space-y-5 text-lg leading-8 text-muted-foreground">
                        <p>
                            KH Equipment Hub supplies mining equipment,
                            construction machines, generators, solar systems,
                            electrical equipment, spare parts, and waterproofing
                            solutions. We also handle construction work across
                            Ghana.
                        </p>
                        <p>
                            The business is built around making equipment buying
                            easier: practical guidance, strong machines, real
                            warranty, and spare-parts support when the work is
                            already moving.
                        </p>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        {strengths.map((strength) => (
                            <div
                                key={strength}
                                className="rounded-md border border-border bg-card px-4 py-3 text-sm font-semibold text-card-foreground"
                            >
                                {strength}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <img
                        src="/images/home/img3.jpg"
                        alt="Construction equipment yard"
                        className="h-full min-h-72 rounded-md object-cover"
                    />
                    <img
                        src="/images/home/img2.jpg"
                        alt="Equipment ready for sale"
                        className="mt-10 h-full min-h-72 rounded-md object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
