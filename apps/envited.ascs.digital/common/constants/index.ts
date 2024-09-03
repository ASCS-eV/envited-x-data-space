import { Role } from '../types'

export { ERRORS } from './errors'
export { RESPONSES } from './response'
export { NAVIGATION, NAVIGATION_DASHBOARD } from './navigations'
export { ROLE_PROTECTED_ROUTES_MAP } from './routes'

export const MINIMUM_PROFILE_REQUIREMENTS = ['name', 'category', 'logo', 'description']
export const RESTRICTED_PROFILE_FIELDS = ['principalName', 'principalPhone', 'principalEmail']
export const MAX_FILE_SIZE = 5000000
export const FILE_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'] as string[]
export const AUTHORIZED_ROLES = [Role.federator, Role.principal, Role.provider, Role.user]
