export type HomepageProject = {
    id: number;
    title: string;
    slug: string;
    category: string;
    deliverable: string | null;
    clientName: string | null;
    location: string | null;
    summary: string | null;
    mediaType: 'image' | 'video';
    mediaUrl: string | null;
};

export type ProjectDetail = HomepageProject & {
    content: string | null;
    status: string | null;
    startedAt: string | null;
    completedAt: string | null;
};

export type PaginatedHomepageProjects = {
    data: HomepageProject[];
    currentPage: number;
    nextPage: number | null;
    hasMorePages: boolean;
};
