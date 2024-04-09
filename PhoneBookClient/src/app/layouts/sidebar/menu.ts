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
    isCollapsed: true,
    subItems: [
      {
        id: 8,
        label: 'Rechercher',
        link: '/contact/search',
        parentId: 4
      }
      
    ]
  }
  // ,
  // {
  //   id: 4,
  //   label: 'MENUITEMS.SETTINGS.TEXT',
  //   icon: 'mdi mdi-form-select',
  //   isCollapsed: true,
  //   subItems: [
  //     {
  //       id: 5,
  //       label: 'MENUITEMS.SETTINGS.LIST.PAYS',
  //       link: '/settings/pays',
  //       parentId: 4
  //     },
  //     {
  //       id: 6,
  //       label: 'MENUITEMS.SETTINGS.LIST.VILLE',
  //       link: '/settings/ville',
  //       parentId: 4
  //     },
  //     {
  //       id: 7,
  //       label: 'MENUITEMS.SETTINGS.LIST.TYPE',
  //       link: '/settings/type',
  //       parentId: 4
  //     }
  //     ,
  //     {
  //       id: 8,
  //       label: 'MENUITEMS.SETTINGS.LIST.INSTITUT',
  //       link: '/settings/institut',
  //       parentId: 4
  //     }

      
  //   ]
  // }
  

];
