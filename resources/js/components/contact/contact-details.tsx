import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { ContactForm } from './contact-form';

export type ContactDetails = {
    salesEmail: string;
    phone: string;
    address: string;
    whatsappUrl: string;
    mapEmbedUrl: string;
};

type ContactDetailsSectionProps = {
    contact: ContactDetails;
};

export function ContactDetailsSection({ contact }: ContactDetailsSectionProps) {
    const details = [
        {
            label: 'Sales Team',
            value: contact.salesEmail,
            href: `mailto:${contact.salesEmail}`,
            icon: Mail,
        },
        {
            label: 'Phone Number',
            value: contact.phone,
            href: `tel:${contact.phone.replace(/\s+/g, '')}`,
            icon: Phone,
        },
        {
            label: 'WhatsApp',
            value: 'Chat with us',
            href: contact.whatsappUrl,
            icon: MessageCircle,
        },
        {
            label: 'Address',
            value: contact.address,
            icon: MapPin,
        },
    ];

    return (
        <section className="bg-background py-20 sm:py-28">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
                <div className="rounded-md border border-border bg-card p-6 shadow-sm sm:p-8">
                    <p className="text-4xl leading-tight font-extrabold sm:text-5xl">
                        Send an <span className="text-brand-gold">Enquiry</span>
                    </p>
                    <div className="mt-8">
                        <ContactForm />
                    </div>
                </div>

                <div>
                    <p className="text-5xl leading-tight font-extrabold sm:text-6xl">
                        Visit or <span className="text-brand-gold">Reach</span>{' '}
                        Us
                    </p>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        {details.map((item) => {
                            const Icon = item.icon;
                            const content = (
                                <article className="h-full rounded-md border border-border bg-card p-5 shadow-sm transition hover:border-brand-gold">
                                    <div className="flex size-12 items-center justify-center rounded-md bg-brand-gold text-brand-gold-foreground">
                                        <Icon className="size-6" />
                                    </div>
                                    <h2 className="mt-5 text-2xl font-bold">
                                        {item.label}
                                    </h2>
                                    <p className="mt-2 text-xl leading-8 text-muted-foreground">
                                        {item.value}
                                    </p>
                                </article>
                            );

                            return item.href ? (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    target={
                                        item.href.startsWith('http')
                                            ? '_blank'
                                            : undefined
                                    }
                                    rel={
                                        item.href.startsWith('http')
                                            ? 'noreferrer'
                                            : undefined
                                    }
                                >
                                    {content}
                                </a>
                            ) : (
                                <div key={item.label}>{content}</div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
