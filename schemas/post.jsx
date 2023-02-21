import { defineType } from 'sanity'

import blockContentType from './blockContent'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ]
    },
    {
      name: 'body',
      title: 'Body',
      type: blockContentType.name,
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: "mainImage"
    },
  },
})
