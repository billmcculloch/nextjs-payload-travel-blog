import { contentPermissions, getTenantId } from '@/lib/tenants'
import type { CollectionConfig } from 'payload'

export const SiteSettings: CollectionConfig = {
  slug: 'site-settings',
  access: contentPermissions, 
  hooks: {
    beforeChange: [
      ({ req, data, operation }) => {
        if (operation === 'create') {
          data.tenant = getTenantId(req.user)
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      unique: true, 
      admin: {
        condition: (_, { user }) => user?.role === 'super-admin',
      },
    },
    {
  name: 'siteTitle',
  type: 'text',
  required: true,
  admin: {
    description: 'Displayed in the browser tab and site header',
  },
},
{
  type: 'row',
  fields: [
    {
      name: 'backgroundColor',
      type: 'text',
      defaultValue: '#ffffff',
      admin: {
        width: '50%',
        description: 'Page background color — hex value',
      },
    },
    {
      name: 'textColor',
      type: 'text',
      defaultValue: '#111111',
      admin: {
        width: '50%',
        description: 'Body text color — hex value',
      },
    },
  ],
},
  ],
}