export default [
  {
    component: 'CNavItem',
    name: 'Startseite',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'Hallo!',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Inhalte',
  },
  {
    component: 'CNavGroup',
    name: 'Inserate',
    to: '/base',
    icon: 'cil-pencil',
    items: [
      {
        component: 'CNavItem',
        name: 'Inserate verwalten',
        to: '/base/accordion',
      },
      {
        component: 'CNavItem',
        name: 'Inserate erstellen',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Eigenschaften',
    to: '/buttons',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Eigenschaften verwalten',
        to: '/buttons/standard-buttons',
      },
      {
        component: 'CNavItem',
        name: 'Eigenschaft erstellen',
        to: '/buttons/button-groups',
      },
      {
        component: 'CNavItem',
        name: 'Optionen verwalten',
        to: '/buttons/standard-buttons',
      },
      {
        component: 'CNavItem',
        name: 'Option erstellen',
        to: '/buttons/standard-buttons',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Admin',
    to: '/icons',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'Admin verwalten',
        to: '/icons/brands',
      },
      {
        component: 'CNavItem',
        name: 'Admin erstellen',
        to: '/icons/flags',
      },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Ausloggen',
    to: '/widgets',
    icon: 'cil-calculator',
  },
]
