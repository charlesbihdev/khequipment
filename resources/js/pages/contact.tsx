import { Head } from '@inertiajs/react';
import { Footer } from '@/components/common/footer';
import { PublicNav } from '@/components/common/public-nav';
import { ContactDetailsSection } from '@/components/contact/contact-details';
import type { ContactDetails } from '@/components/contact/contact-details';
import { ContactHero } from '@/components/contact/contact-hero';
import { ContactMap } from '@/components/contact/contact-map';

type ContactPageProps = {
    contact: ContactDetails;
};

export default function Contact({ contact }: ContactPageProps) {
    return (
        <>
            <Head title="Contact KH Equipment Hub" />
            <main className="min-h-screen bg-background font-public text-foreground">
                <PublicNav />
                <ContactHero />
                <ContactMap mapEmbedUrl={contact.mapEmbedUrl} />
                <ContactDetailsSection contact={contact} />
                <Footer />
            </main>
        </>
    );
}
