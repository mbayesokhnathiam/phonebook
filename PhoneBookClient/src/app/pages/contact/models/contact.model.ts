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
  