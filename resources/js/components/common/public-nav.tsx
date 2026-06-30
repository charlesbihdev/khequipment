import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { about, contact, products } from '@/routes';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Equipments', href: products.url() },
    { label: 'About', href: about.url() },
    { label: 'Contact Us', href: contact.url() },
];

export function PublicNav() {
    const [open, setOpen] = useState(false);
    const { url } = usePage();

    const isActive = (href: string) => {
        if (href === '/') {
            return url === '/';
        }

        return url === href || url.startsWith(`${href}?`);
    };

    return (
        <header className="absolute inset-x-0 top-0 z-30">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                <Link href="/" prefetch className="flex items-center gap-3">
                    <img
                        src="/images/icons/logo.png"
                        alt="KH Equipment Hub"
                        className="h-14 w-auto"
                    />
                    <span className="hidden text-sm font-semibold tracking-[0.22em] text-white/80 uppercase sm:inline">
                        KH Equipment Hub
                    </span>
                </Link>

                <div className="hidden items-center gap-8 text-2xl md:flex">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            prefetch
                            className={`border-b-2 pb-1 font-medium transition hover:border-brand-gold hover:text-white ${
                                isActive(item.href)
                                    ? 'border-brand-gold text-white'
                                    : 'border-transparent text-white/85'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <button
                    type="button"
                    aria-label="Toggle navigation"
                    onClick={() => setOpen((value) => !value)}
                    className="inline-flex size-11 items-center justify-center rounded-full bg-white/12 text-white ring-1 ring-white/20 backdrop-blur md:hidden"
                >
                    {open ? (
                        <X className="size-5" />
                    ) : (
                        <Menu className="size-5" />
                    )}
                </button>
            </nav>

            {open && (
                <div className="mx-4 rounded-lg bg-background/95 p-3 shadow-xl ring-1 ring-border backdrop-blur md:hidden">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            prefetch
                            onClick={() => setOpen(false)}
                            className={`block border-b px-3 py-3 text-sm font-medium hover:border-brand-gold hover:bg-muted ${
                                isActive(item.href)
                                    ? 'border-brand-gold text-brand-gold'
                                    : 'border-transparent text-foreground'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}
