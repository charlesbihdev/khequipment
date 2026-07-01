import { Link } from '@inertiajs/react';
import {
    Facebook,
    Instagram,
    Linkedin,
    Mail,
    MessageCircle,
    Youtube,
} from 'lucide-react';
import { about, contact, products } from '@/routes';

const quickLinks = [
    { label: 'Products', href: products.url() },
    { label: 'About Us', href: about.url() },
    { label: 'Contact Us', href: contact.url() },
];

const socialLinks = [
    {
        label: 'Facebook',
        icon: Facebook,
        href: 'https://www.facebook.com/profile.php?id=100082998979273&mibextid=ZbWKwL',
    },
    {
        label: 'LinkedIn',
        icon: Linkedin,
        href: 'https://www.linkedin.com/in/samer-kamleh-9b14ba20b',
    },
    {
        label: 'Instagram',
        icon: Instagram,
        href: 'https://www.instagram.com/kh.equipment.hub',
    },
    {
        label: 'YouTube',
        icon: Youtube,
        href: 'https://www.youtube.com/@KhequipmentHub',
    },
    {
        label: 'Email',
        icon: Mail,
        href: 'mailto:sales@khequipmenthub.com',
    },
    {
        label: 'WhatsApp',
        icon: MessageCircle,
        href: 'https://wa.link/drtn9l',
    },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            id="support"
            className="border-t border-brand-gold/25 bg-foreground text-white"
        >
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
                <div>
                    <h2 className="text-2xl font-bold">Quick Links</h2>
                    <div className="mt-7 border-t border-white/15 pt-6">
                        <ul className="space-y-4 text-xl">
                            {quickLinks.map((item) => (
                                <li key={item.href} className="flex gap-4">
                                    <span className="mt-2.5 size-2 bg-brand-gold" />
                                    <Link
                                        href={item.href}
                                        prefetch
                                        className="border-b-2 border-transparent pb-1 text-white/82 transition hover:border-brand-gold hover:text-brand-gold"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold">
                        Follow KH Equipment Hub
                    </h2>
                    <div className="mt-7 border-t border-white/15 pt-6">
                        <div className="flex flex-wrap items-center gap-6">
                            {socialLinks.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.label}
                                        aria-label={item.label}
                                        href={item.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex size-9 items-center justify-center text-white/82 transition hover:text-brand-gold"
                                    >
                                        <Icon className="size-8" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold">About Us</h2>
                    <div className="mt-7 border-t border-white/15 pt-6">
                        <p className="max-w-md text-xl leading-9 text-white/78">
                            KH Equipment Hub: A Name You Trust. We supply
                            construction machines and equipment, heavy-duty
                            equipment, generators, solar systems, electrical
                            equipment, spare parts, and waterproofing
                            solutions. We also handle construction work with
                            the best quality and prices in Ghana.
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/15 bg-black/15">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-7 text-base font-bold text-brand-gold sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                    <p>&copy; {currentYear} KH EQUIPMENT HUB</p>
                    <p className="text-white/82">
                        DEVELOPED BY{' '}
                        <a
                            href="https://linktr.ee/charlesbihdev"
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand-gold hover:underline"
                        >
                            Charles Owusu Bih
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
