import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-brand-steel px-5 py-8 text-brand-steel-foreground md:p-10">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(244,174,26,0.24),transparent_28%)]" />
            <div className="relative w-full max-w-md">
                <div className="rounded-lg border border-white/12 bg-white p-6 text-foreground shadow-2xl shadow-black/25 sm:p-8">
                    <div className="flex flex-col items-center gap-5">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-3 font-medium"
                        >
                            <img
                                src="/images/icons/logo.png"
                                alt="KH Equipment Hub"
                                className="h-20 w-auto object-contain"
                            />
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center">
                            <p className="text-xs font-bold tracking-[0.22em] text-brand-gold uppercase">
                                KH Equipment Hub
                            </p>
                            <h1 className="text-2xl font-bold tracking-tight text-brand-steel">
                                {title}
                            </h1>
                            <p className="mx-auto max-w-xs text-center text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    <div className="mt-8">{children}</div>
                </div>
            </div>
        </div>
    );
}
