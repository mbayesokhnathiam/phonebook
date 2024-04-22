interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: string;
    created_at: string;
    updated_at: string;
}

interface Authorisation {
    token: string;
    type: string;
}

export interface AuthResponse {
    status: string;
    user: User;
    authorisation: Authorisation;
}
