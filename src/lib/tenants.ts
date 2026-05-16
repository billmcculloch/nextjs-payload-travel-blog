import type { Access, AccessArgs, TypedUser } from 'payload'

export function getTenantId(user: any): string | undefined {
  if (!user?.tenant) return undefined
  if (typeof user.tenant === 'string') return user.tenant
  if (typeof user.tenant === 'object') return user.tenant.id
  return undefined
}

export const byTenant: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'super-admin') return true
  const tenantId = getTenantId(user)
  if (!tenantId) return false  // no tenant = no access
  return { tenant: { equals: tenantId } }
}

export const contentPermissions ={
  read: ({ req: { user, url } }: AccessArgs) => {
    const isAdmin = url?.includes('/admin')

    if (!isAdmin) {
      return true
    }

    if (!user) return false
    
    const tenantId = getTenantId(user)
    if (!tenantId) return false 
    
    return { tenant: { equals: tenantId } }
  },
  update: ({ req: { user } }: AccessArgs) => {
    if (!user) return false
    const tenantId = getTenantId(user)
    if (!tenantId) return false 
    return { tenant: { equals: tenantId } }
  },
  create: ({ req: { user } }: AccessArgs) => {
    if (!user) return false
    const tenantId = getTenantId(user)
    if (!tenantId) return false 
    return { tenant: { equals: tenantId } }
  },
  delete: ({ req: { user } }: AccessArgs) => {
    if (!user) return false
    const tenantId = getTenantId(user)
    if (!tenantId) return false 
    return { tenant: { equals: tenantId } }
  },
}

export const superAdminPermissions = {
  read: ({ req: { user } }: AccessArgs) => user?.role === 'super-admin',
  update: ({ req: { user } }: AccessArgs) => user?.role === 'super-admin',
  create: ({ req: { user } }: AccessArgs) => user?.role === 'super-admin',
  delete: ({ req: { user } }: AccessArgs) => user?.role === 'super-admin',
}