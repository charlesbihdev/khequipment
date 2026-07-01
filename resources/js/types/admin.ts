export type AdminPaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type Paginator<T> = {
    data: T[];
    from: number | null;
    to: number | null;
    total: number;
    links: AdminPaginationLink[];
};

export type SelectOption = {
    id: number;
    name: string;
};
