import type { AccessArgs } from 'payload'

import { headers } from 'next/headers'
import { NextRequest } from 'next/server'
import { User } from '@/payload-types'

export async function getTenant() {
  const headersList = await headers()

  const tenant = headersList.get('x-tenant')

  if (!tenant) {
    return null
  }

  return tenant
}

export const getTenantFromReq = (req: NextRequest) => {
  return req.headers.get('x-tenant')
}

export function getTenantId(user: User): string | number | undefined {
  if (!user?.tenant) return undefined
  if (typeof user.tenant === 'string') return user.tenant
  if (typeof user.tenant === 'object') return user.tenant.id
  return undefined
}

export const contentPermissions = {
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
