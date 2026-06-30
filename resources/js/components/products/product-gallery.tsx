import { useState } from 'react';
import type { ProductDetailImage } from '@/types/products';

type ProductGalleryProps = {
    images: ProductDetailImage[];
    name: string;
};

export function ProductGallery({ images, name }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]?.url ?? null);

    return (
        <div className="lg:sticky lg:top-6">
            <div className="aspect-[4/3] overflow-hidden rounded-md border border-border bg-white">
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt={name}
                        className="size-full object-contain p-3"
                    />
                ) : (
                    <div className="flex size-full items-center justify-center text-xl font-semibold text-muted-foreground">
                        No image available
                    </div>
                )}
            </div>

            {images.length > 1 && (
                <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
                    {images.map((image) => (
                        <button
                            key={image.id}
                            type="button"
                            onClick={() => setSelectedImage(image.url)}
                            className={`aspect-square overflow-hidden rounded-md border bg-white transition ${
                                selectedImage === image.url
                                    ? 'border-brand-gold'
                                    : 'border-border hover:border-brand-gold'
                            }`}
                        >
                            <img
                                src={image.url}
                                alt={`${name} thumbnail`}
                                className="size-full object-contain p-1"
                                loading="lazy"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
