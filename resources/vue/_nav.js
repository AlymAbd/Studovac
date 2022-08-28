let home = [
  {
    component: 'CNavItem',
    name: 'Домашняя',
    to: '/secret_place/home',
    icon: 'cil-cursor',
  },
  {
    component: 'CNavItem',
    name: 'Мои смены',
    to: '/secret_place/sessions',
    icon: 'cil-star',
  },
]

let employees = [
  {
    component: 'CNavGroup',
    name: 'Сотрудники',
    to: '/secret_place/employees',
    icon: 'cil-user',
    items: [
      {
        component: 'CNavItem',
        name: 'Список',
        to: '/secret_place/employees/list',
      },
      {
        component: 'CNavItem',
        name: 'Создать',
        to: '/secret_place/employees/create',
      },
    ],
  },
]

let survey = [
  {
    component: 'CNavGroup',
    name: 'Опросы',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'Список',
        to: '/secret_place/survey',
      },
      {
        component: 'CNavItem',
        name: 'Создать',
        to: '/secret_place/create_survey',
      },
      {
        component: 'CNavItem',
        name: 'Вопросы и варианты',
        to: '/secret_place/create_question',
      },
    ],
  },
]

let analytics = [
  {
    component: 'CNavTitle',
    name: 'Аналитика',
  },
  {
    component: 'CNavItem',
    name: 'Моя статистика',
    to: '/widgets',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavItem',
    name: 'Аналитика обзвонов',
    to: '/widgets',
    icon: 'cil-chart-pie',
  },
]

let projects = [
  {
    component: 'CNavTitle',
    name: 'Основное',
  },
  {
    component: 'CNavGroup',
    name: 'Обзвон',
    to: '/base',
    icon: 'cil-phone',
    items: [
      {
        component: 'CNavItem',
        name: 'Сегодня',
        to: '/base/accordion',
      },
      {
        component: 'CNavItem',
        name: 'История',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Пользователи',
    to: '/base',
    icon: 'cil-contact',
    items: [
      {
        component: 'CNavItem',
        name: 'Список',
        to: '/base/breadcrumbs',
      },
      {
        component: 'CNavItem',
        name: 'Активность',
        to: '/base/accordion',
      },
    ],
  },
]

export default [].concat(home, employees, survey, analytics, projects)
