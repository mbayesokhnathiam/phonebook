// export interface Contact {
//     id: number;
//     prenom: string;
//     nom: string;
//     adresse: string;
//     fonction: string;
//     telephone_fixe: string;
//     telephone_mobile: string;
//     site_web: string;
//     email: string;
//     commentaire: string;
//     institutId: number;
//     created_at: string | null;
//     updated_at: string | null;
// }
interface TypeInstitut {
  id: number;
  nom: string;
  villeId: number;
  created_at: string; // Vous pouvez utiliser un type Date si nécessaire
  updated_at: string; // Vous pouvez utiliser un type Date si nécessaire
  ville: Ville;
}

interface Ville {
  id: number;
  nom: string;
  paysId: number;
  created_at: string; // Vous pouvez utiliser un type Date si nécessaire
  updated_at: string; // Vous pouvez utiliser un type Date si nécessaire
  pays: Pays;
}

interface Pays {
  id: number;
  code: number;
  alpha2: string;
  alpha3: string;
  nom_en_gb: string;
  nom_fr_fr: string;
  created_at: string; // Vous pouvez utiliser un type Date si nécessaire
  updated_at: string; // Vous pouvez utiliser un type Date si nécessaire
}

interface Institut {
  id: number;
  nom: string;
  telephone_fixe: string | null;
  adresse: string;
  site_web: string | null;
  typeInstitutId: number;
  created_at: string; // Vous pouvez utiliser un type Date si nécessaire
  updated_at: string; // Vous pouvez utiliser un type Date si nécessaire
  type_institut: TypeInstitut;
}
export interface Contact {
  id: number;
  prenom: string;
  nom: string;
  fonction: string;
  telephone_fixe: string | null;
  telephone_mobile: string | null;
  telephone_domicile: string | null;
  email: string | null;
  commentaire: string;
  institutId: number;
  created_at: string; // Vous pouvez utiliser un type Date si nécessaire
  updated_at: string; // Vous pouvez utiliser un type Date si nécessaire
  institut: Institut;
}
