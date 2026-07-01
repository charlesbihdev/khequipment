export type HomepagePromo = {
    id: number;
    title: string;
    eyebrow: string;
    subtitle: string | null;
    description: string | null;
    mediaType: 'image' | 'video';
    mediaUrl: string;
    ctaUrl: string;
    product: {
        name: string;
        slug: string;
    } | null;
};
