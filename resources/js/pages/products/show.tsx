import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '@/components/common/footer';
import { PublicNav } from '@/components/common/public-nav';
import { ProductActions } from '@/components/products/product-actions';
import { ProductDetailInfo } from '@/components/products/product-detail-info';
import { ProductGallery } from '@/components/products/product-gallery';
import type { ProductDetail } from '@/types/products';

type ProductShowProps = {
    product: ProductDetail;
    contact: {
        whatsappUrl: string;
    };
    returnTo: string;
};

export default function ProductShow({
    product,
    contact,
    returnTo,
}: ProductShowProps) {
    const heroImage = product.images[0]?.url;

    return (
        <>
            <Head title={`${product.name} - KH Equipment Hub`} />
            <main className="min-h-screen bg-background font-public text-foreground">
                <section className="relative overflow-hidden bg-foreground pt-28 text-white">
                    {heroImage && (
                        <img
                            src={heroImage}
                            alt=""
                            className="absolute inset-0 size-full object-cover opacity-35"
                        />
                    )}
                    <div className="absolute inset-0 bg-foreground/80" />
                    <PublicNav />
                    <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                        <div className="mb-8 flex items-center justify-between gap-4">
                            <Link
                                href={returnTo}
                                prefetch
                                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-lg font-bold text-white/85 hover:border-brand-gold hover:text-brand-gold"
                            >
                                <ArrowLeft className="size-5" />
                                Back
                            </Link>
                            <a
                                href={contact.whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-md bg-success px-4 py-2 text-lg font-bold text-success-foreground hover:bg-success/90"
                            >
                                <svg
                                    viewBox="0 0 32 32"
                                    aria-hidden="true"
                                    className="size-5 fill-current"
                                >
                                    <path d="M16.02 3.2A12.73 12.73 0 0 0 5.08 22.42L3.4 28.8l6.52-1.7a12.67 12.67 0 0 0 6.1 1.55h.01A12.73 12.73 0 0 0 16.02 3.2Zm0 23.3h-.01a10.54 10.54 0 0 1-5.38-1.47l-.38-.23-3.87 1.01 1.03-3.77-.25-.39a10.58 10.58 0 1 1 8.86 4.85Zm5.8-7.92c-.32-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.72.16-.21.32-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.58-1.59-.95-.85-1.6-1.91-1.79-2.23-.18-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.42 5.42 4.79.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.88-.77 2.15-1.51.27-.74.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z" />
                                </svg>
                                WhatsApp Us
                            </a>
                        </div>
                        <p className="text-xl font-semibold text-brand-gold">
                            {product.category ?? 'Equipment'}
                        </p>
                        <h1 className="mt-2 text-5xl leading-tight font-extrabold sm:text-7xl">
                            {product.name}
                        </h1>
                    </div>
                </section>

                <section className="py-16 sm:py-20">
                    <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
                        <ProductGallery
                            images={product.images}
                            name={product.name}
                        />
                        <div>
                            <ProductDetailInfo product={product} />
                            <ProductActions
                                productId={product.id}
                                productName={product.name}
                            />
                        </div>
                    </div>
                </section>

                <Footer />
            </main>
        </>
    );
}
