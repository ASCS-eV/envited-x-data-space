import { Role } from '../types'
import { ROUTES } from './routes'

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Assets', href: '/assets' },
  { name: 'Members', href: '/members' },
  { name: 'Contact', href: '#' },
]

export const FEDERATOR_NAVIGATION_DASHBOARD = [
  {
    href: ROUTES.DASHBOARD.HOME,
    name: 'Dashboard',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.COMPANIES,
    name: 'Companies',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.PROFILE,
    name: 'Profile',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.USERS,
    name: 'Users',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.ASSETS,
    name: 'Assets',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.ACCOUNTING,
    name: 'Accounting',
    icon: '',
  },
]

export const PRINCIPAL_NAVIGATION_DASHBOARD = [
  {
    href: ROUTES.DASHBOARD.HOME,
    name: 'Dashboard',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.PROFILE,
    name: 'Profile',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.USERS,
    name: 'Users',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.ASSETS,
    name: 'Assets',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.ACCOUNTING,
    name: 'Accounting',
    icon: '',
  },
]

export const PROVIDER_NAVIGATION_DASHBOARD = [
  {
    href: ROUTES.DASHBOARD.HOME,
    name: 'Dashboard',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.ASSETS,
    name: 'Assets',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.ACCOUNTING,
    name: 'Accounting',
    icon: '',
  },
]

export const USER_NAVIGATION_DASHBOARD = [
  {
    href: ROUTES.DASHBOARD.HOME,
    name: 'Dashboard',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.ASSETS,
    name: 'Assets',
    icon: '',
  },
  {
    href: ROUTES.DASHBOARD.ACCOUNTING,
    name: 'Accounting',
    icon: '',
  },
]

export const NAVIGATION_DASHBOARD_MAP = {
  [Role.federator]: FEDERATOR_NAVIGATION_DASHBOARD,
  [Role.principal]: PRINCIPAL_NAVIGATION_DASHBOARD,
  [Role.provider]: PROVIDER_NAVIGATION_DASHBOARD,
  [Role.user]: USER_NAVIGATION_DASHBOARD,
}
