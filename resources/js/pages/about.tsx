import { Head } from '@inertiajs/react';
import { Footer } from '@/components/common/footer';
import { PublicNav } from '@/components/common/public-nav';
import { AboutHero } from '@/components/about/about-hero';
import { AboutStory } from '@/components/about/about-story';
import { FaqSection } from '@/components/about/faq-section';
import { VisionSection } from '@/components/about/vision-section';

export default function About() {
    return (
        <>
            <Head title="About KH Equipment Hub" />
            <main className="min-h-screen bg-background font-public text-foreground">
                <PublicNav />
                <AboutHero />
                <AboutStory />
                <VisionSection />
                <FaqSection />
                <Footer />
            </main>
        </>
    );
}
