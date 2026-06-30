export type ProductCategory = {
    id: number;
    name: string;
    slug: string;
};

export type ProductCardItem = {
    id: number;
    name: string;
    category: string | null;
    isNew: boolean;
    poweredBy: string | null;
    imageUrl: string | null;
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
