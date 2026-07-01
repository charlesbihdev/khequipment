export function AboutHero() {
    return (
        <section
            id="top"
            className="relative flex min-h-[58vh] items-center justify-center overflow-hidden bg-foreground px-4 py-32 text-center text-white sm:px-6"
        >
            <img
                src="/images/hero/titlebar-bg.jpg"
                alt=""
                className="absolute inset-0 size-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-foreground/70" />
            <div className="relative z-10 mx-auto max-w-4xl">
                <p className="text-6xl leading-none font-extrabold sm:text-7xl lg:text-8xl">
                    <span className="text-brand-gold">About</span> Us
                </p>
                <h1 className="mt-5 text-2xl leading-9 font-semibold text-white/85 sm:text-3xl">
                    KH Equipment Hub supplies equipment, spare parts, energy
                    systems, waterproofing solutions, and construction work
                    for mining, building, and road projects.
                </h1>
            </div>
        </section>
    );
}
