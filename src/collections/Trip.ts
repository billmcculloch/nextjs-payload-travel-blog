import type { CollectionConfig } from 'payload'

export const Trip: CollectionConfig = {
  slug: 'trip',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['visitedAt', 'title', 'city', 'country', 'type', 'published'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'For CMS reference. Not used on site',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        condition: (_, siblingData) => !siblingData?.id,
        description: 'Set once on creation. Cannot be changed later.',
      },
    },
    {
      name: 'visitedAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'MMMM yyyy',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Coffee', value: 'coffee' },
        { label: 'Food', value: 'food' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'This determines whether the trip is displayed on the site or not',
      },
    },
  ],
}
