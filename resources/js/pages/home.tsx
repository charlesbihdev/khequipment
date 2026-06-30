import { Head } from '@inertiajs/react';
import { Footer } from '@/components/common/footer';
import { PublicNav } from '@/components/common/public-nav';
import { AboutSection } from '@/components/home/about-section';
import { EquipmentPreview } from '@/components/home/equipment-preview';
import { HeroSection } from '@/components/home/hero-section';

export default function Home() {
    return (
        <>
            <Head title="Construction Equipment, Generators & Machinery in Ghana" />
            <main className="min-h-screen bg-background font-public text-foreground">
                <HeroSection nav={<PublicNav />} />
                <AboutSection />
                <EquipmentPreview />
                <Footer />
            </main>
        </>
    );
}
