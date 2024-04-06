export interface ContactPagination {
    current_page: number;
    data: Contact[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
  
  export interface Contact {
    id: number;
    prenom: string;
    nom: string;
    adresse: string;
    fonction: string;
    telephone_fixe: string;
    telephone_mobile: string;
    site_web: string;
    email: string;
    commentaire: string;
    institutId: number;
    created_at: string | null;
    updated_at: string | null;
  }
  
  export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
  }
  