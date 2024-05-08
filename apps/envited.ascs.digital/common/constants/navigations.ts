import { ROUTES } from './routes'

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Assets', href: '/assets' },
  { name: 'Members', href: '/members' },
  { name: 'Contact', href: '#' },
]

export const NAVIGATION_DASHBOARD = [
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
]
