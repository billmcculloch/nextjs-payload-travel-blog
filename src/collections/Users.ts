import { superAdminPermissions } from '@/lib/tenants'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
 auth: true,
admin: {
    // This controls sidebar visibility
    hidden: ({ user }) => {
      // If no user is logged in, hide it
      if (!user) return true;
      
      // If they are an admin, definitely show it
      if (user.roles?.includes('admin')) return false;
      
      // For regular users, return false so the tab remains VISIBLE
      return false; 
    },
  },
access: {
    // Keep the read/update restrictions from the previous step!
    read: ({ req: { user } }) => {
      if (!user) return false;
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
      options: ['super-admin', 'tenant-admin', 'tenant-member'],
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
