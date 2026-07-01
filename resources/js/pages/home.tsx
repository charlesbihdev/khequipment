import { Deferred, Head } from '@inertiajs/react';
import { Footer } from '@/components/common/footer';
import { PublicNav } from '@/components/common/public-nav';
import { AboutSection } from '@/components/home/about-section';
import { EquipmentPreview } from '@/components/home/equipment-preview';
import { HeroSection } from '@/components/home/hero-section';
import { TodaysDeal } from '@/components/home/todays-deal';
import type { HomepagePromo } from '@/types/promos';

type HomeProps = {
    promos?: HomepagePromo[];
};

export default function Home({ promos = [] }: HomeProps) {
    return (
        <>
            <Head title="Construction Equipment, Generators & Machinery in Ghana" />
            <main className="min-h-screen bg-background font-public text-foreground">
                <HeroSection nav={<PublicNav />} />
                <Deferred data="promos" fallback={<TodaysDeal promos={[]} loading />}>
                    <TodaysDeal promos={promos} />
                </Deferred>
                <AboutSection />
                <EquipmentPreview />
                <Footer />
            </main>
        </>
    );
}
