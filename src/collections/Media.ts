import { contentPermissions } from '@/lib/tenants'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: contentPermissions,
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'create') {
          data.tenant = req.user?.tenant
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: false, // media can be unscoped if you prefer
      admin: {
        condition: (_, { user }) => user?.role === 'super-admin',
      },
    },
  ],
}
