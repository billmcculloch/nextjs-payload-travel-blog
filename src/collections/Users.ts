import { superAdminPermissions } from '@/lib/tenants'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
 auth: true,
admin: {
    hidden: false
}, 
access: {
    read: ({ req: { user } }) => {
      if (!user) return false;

      if(user?.role === 'super-admin') return true

      return { id: { equals: user.id } };
    },
    update: ({ req: { user } }) => {
      if (!user) return false;
      return { id: { equals: user.id } };
    },
  }, 
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        // Prevent tenant-admins from spoofing their tenant
        if (operation === 'update' && req.user?.role !== 'super-admin') {
          delete data.tenant
          delete data.role
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      options: ['super-admin', 'tenant-admin'],
      defaultValue: 'tenant-admin',
      required: true,
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      admin: {
        condition: (_, { user }) => user?.role === 'super-admin',
      },
    },
  ],
}
