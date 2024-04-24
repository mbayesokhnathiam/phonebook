import { User } from "./user.model";

export interface UserPagination {
    current_page: number;
    data: User[];
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
  

  
  export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
  }
  