import {
  VIEW_TRANSACTIONS,
  ADD_TRANSACTIONS,
  EDIT_TRANSACTIONS,
} from './permissions'

export default [
  {
    icon: '✨',
    title: 'Home',
    path: '/home',
    menu: true,
  },
  {
    icon: '📄',
    title: 'Transaction list',
    path: '/list',
    menu: true,
    permission: VIEW_TRANSACTIONS,
  },
  {
    icon: '🗒',
    title: 'New Transaction',
    path: '/new',
    menu: true,
    permission: ADD_TRANSACTIONS,
  },
  {
    icon: '📝',
    title: 'Edit Transaction',
    path: '/edit',
    permission: EDIT_TRANSACTIONS,
  }
]
