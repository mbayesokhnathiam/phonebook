import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  {
    id: 4,
    label: 'Paramètrage',
    icon: 'mdi mdi-cog-outline',
    subItems: [
      
      {
        id: 5,
        label: 'Pays',
        link: '/settings/pays',
        parentId: 4
      },
      {
        id: 6,
        label: 'Villes',
        link: '/settings/ville',
        parentId: 4
      },
      {
        id: 7,
        label: 'Types d\'institutions',
        link: '/settings/type',
        parentId: 4
      }
      ,
      {
        id: 8,
        label: 'Institutions',
        link: '/settings/institut',
        parentId: 4
      },
      {
        id: 8,
        label: 'Nouveau contact',
        link: '/contact/creer',
        parentId: 4
      },
      {
        id: 9,
        label: 'Importer les contacts',
        link: '/settings/contact/import',
        parentId: 5
      },
      {
        id: 11,
        label: 'Utilisateurs',
        link: '/users/list',
        parentId: 5
        
      }
      
    ]
  }
  
  
  

];
