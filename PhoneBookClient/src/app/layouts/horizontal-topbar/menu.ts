import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    id: 1,
    label: 'MENUITEMS.MENU.TEXT',
    isTitle: true
  },
  // {
  //   id: 2,
  //   label: 'MENUITEMS.DASHBOARD.TEXT',
  //   icon: 'mdi mdi-speedometer',
  //   link: '/'
  // },
  {
    id: 3,
    label: 'Contact',
    icon: 'mdi mdi-form-select',
    subItems: [
      {
        id: 8,
        label: 'Recherche',
        link: '/contact/search',
        parentId: 4
      },
      {
        id: 8,
        label: 'Recherche rapide',
        link: '/contact/advanced/search',
        parentId: 4
      }
      
    ]
  }
  ,
  {
    id: 4,
    label: 'Paramètrage',
    icon: 'mdi mdi-form-select',
    subItems: [
      {
        id: 5,
        label: 'Pays',
        link: '/settings/pays',
        parentId: 4
      },
      {
        id: 6,
        label: 'Ville',
        link: '/settings/ville',
        parentId: 4
      },
      {
        id: 7,
        label: 'Type',
        link: '/settings/type',
        parentId: 4
      }
      ,
      {
        id: 8,
        label: 'Institution',
        link: '/settings/institut',
        parentId: 4
      }

      
    ]
  }
  

];
