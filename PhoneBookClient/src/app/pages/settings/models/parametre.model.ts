export interface TypeItem {
    id: number;
    nom: string;
    villeId: number;
    created_at: string | null;
    updated_at: string | null;
}

export interface VilleItem {
    id: number;
    nom: string;
    paysId: number;
    created_at: string | null;
    updated_at: string | null;
}

export interface PaysItem {
    id: number;
    code: string;
    nom_fr_fr: string;
    created_at: string | null;
    updated_at: string | null;
}

export interface InstitutItem {
    id: number;
    nom: string;
    telephone_fixe: string;
    adresse: string;
    site_web: string | null;
    typeInstitutId: number;
    created_at: Date | null;
    updated_at: Date | null;
  }
  

interface LinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

export interface VilleType {
    current_page: number;
    data: VilleItem[];
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

export interface PaysType {
    current_page: number;
    data: PaysItem[];
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

export interface InstitutType {
    current_page: number;
    data: InstitutItem[];
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

