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
    to: '/classified',
    icon: 'cil-pencil',
    items: [
      {
        component: 'CNavItem',
        name: 'Inserate verwalten',
        to: '/classified/list',
      },
      {
        component: 'CNavItem',
        name: 'Inserate erstellen',
        to: '/classified/create',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Eigenschaften',
    to: '/property/group',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Eigenschaften verwalten',
        to: '/property/group/list',
      },
      {
        component: 'CNavItem',
        name: 'Eigenschaft erstellen',
        to: '/property/group/create',
      },
      {
        component: 'CNavItem',
        name: 'Optionen verwalten',
        to: '/property/group/option/list',
      },
      {
        component: 'CNavItem',
        name: 'Option erstellen',
        to: '/property/group/option/create',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Admin',
    to: '/icons',
    icon: 'cil-people',
    items: [
      {
        component: 'CNavItem',
        name: 'Admin verwalten',
        to: '/admin/list',
      },
      {
        component: 'CNavItem',
        name: 'Admin erstellen',
        to: '/admin/create',
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
