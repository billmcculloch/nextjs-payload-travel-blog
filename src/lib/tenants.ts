import type { Access, TypedUser } from 'payload'

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

type PayloadRequest ={
  req: { user: TypedUser }
}

export const contentPermissions ={
  read: ({ req: { user } }: PayloadRequest) => {
    if (!user) return false
    const tenantId = getTenantId(user)
    if (!tenantId) return false 
    return { tenant: { equals: tenantId } }
  },
  update: ({ req: { user } }: PayloadRequest) => {
    if (!user) return false
    const tenantId = getTenantId(user)
    if (!tenantId) return false 
    return { tenant: { equals: tenantId } }
  },
  create: ({ req: { user } }: PayloadRequest) => {
    if (!user) return false
    const tenantId = getTenantId(user)
    if (!tenantId) return false 
    return { tenant: { equals: tenantId } }
  },
  delete: ({ req: { user } }: PayloadRequest) => {
    if (!user) return false
    const tenantId = getTenantId(user)
    if (!tenantId) return false 
    return { tenant: { equals: tenantId } }
  },
}

export const superAdminPermissions = {
  read: ({ req: { user } }: PayloadRequest) => user?.role === 'super-admin',
  update: ({ req: { user } }: PayloadRequest) => user?.role === 'super-admin',
  create: ({ req: { user } }: PayloadRequest) => user?.role === 'super-admin',
  delete: ({ req: { user } }: PayloadRequest) => user?.role === 'super-admin',
}