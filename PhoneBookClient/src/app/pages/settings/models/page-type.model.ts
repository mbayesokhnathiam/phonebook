export interface TypeItem {
    id: number;
    nom: string;
    villeId: number;
    created_at: string | null;
    updated_at: string | null;
}

interface LinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PageType {
    current_page: number;
    data: TypeItem[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkItem[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

