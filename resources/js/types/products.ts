export type ProductCategory = {
    id: number;
    name: string;
    slug: string;
};

export type ProductBrand = {
    name: string;
    slug: string;
};

export type ProductCardItem = {
    id: number;
    name: string;
    slug: string;
    category: string | null;
    isNew: boolean;
    poweredBy: string | null;
    imageUrl: string | null;
};

export type ProductDetailImage = {
    id: number;
    url: string;
};

export type ProductDetail = {
    id: number;
    name: string;
    slug: string;
    brand: string | null;
    category: string | null;
    isNew: boolean;
    poweredBy: string | null;
    drumCapacity: string | null;
    operatingWeight: string | null;
    description: string | null;
    images: ProductDetailImage[];
};

export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type PaginatedProducts = {
    data: ProductCardItem[];
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    per_page: number;
    to: number | null;
    total: number;
};
