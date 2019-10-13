import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Dashboard Usuários',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Corretoras',
    icon: 'nb-bar-chart',
    link: '/pages/broker',
    children: [
      {
        title: 'Cadastrar Corretora',
        icon: 'nb-plus',
        link: '/pages/broker/create-broker',
      },
      {
        title: 'Listagem de Corretoras',
        icon: 'nb-list',
        link: '/pages/broker/list-broker',
      },
    ],
  },
  {
    title: 'Planos',
    icon: 'nb-compose',
    link: '/pages/plans',
    children: [
      {
        title: 'Cadastrar Plano',
        icon: 'nb-plus',
        link: '/pages/plans/create-plan',
      },
      {
        title: 'Listagem de Planos',
        icon: 'nb-list',
        link: '/pages/plans/list-plan',
      },
    ],
  },
  {
    title: 'Usuários',
    icon: 'nb-person',
    link: '/pages/user',
    children: [
      {
        title: 'Cadastrar Usuário',
        icon: 'nb-plus',
        link: '/pages/user/create-user',
      },
      {
        title: 'Listagem de Usuários',
        icon: 'nb-list',
        link: '/pages/user/list-user',
      },
    ],
  },
  {
    title: 'Administradores',
    icon: 'nb-person',
    link: '/pages/admin',
    children: [
      {
        title: 'Cadastrar Administrador',
        icon: 'nb-plus',
        link: '/pages/admin/create-admin',
      },
      {
        title: 'Listagem de Administradores',
        icon: 'nb-list',
        link: '/pages/admin/list-admin',
      },
    ],
  },
  {
    title: 'Operações',
    icon: 'nb-tables',
    link: '/pages/trade',
  },
];
