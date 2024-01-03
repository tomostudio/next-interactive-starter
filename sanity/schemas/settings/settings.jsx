import { defineType } from 'sanity'

export default defineType({
  name: 'generalSettings',
  title: 'General',
  type: 'document',
  initialValue: () => ({
    webTitle: 'Sanity Starter',
  }),
  fields: [
    {
      name: 'webTitle',
      title: 'Website Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Default SEO',
      description:
        'Search Engine Optimization allows to improve the ranking in search results.',
      name: 'seo',
      type: 'object',
      fields: [
        {
          name: 'seo_description',
          description:
            'Enter up to 400 characters to describe this website. This description is what will be displayed on search engines or when this page is being shared (e.g. Google or WhatsApp).',
          type: 'string',
          title: 'Description',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'seo_keywords',
          description:
            'Enter some keywords to describe this website (separated by commas)',
          type: 'string',
          title: 'Keywords',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'seo_image',
          title: 'Image',
          description:
            '800 x 600 | PNG / JPEG / WEBP | max 100kb. This image is what will be displayed on search engines or when this page is being shared (e.g. Google or WhatsApp)',
          type: 'image',
          validation: (Rule) => Rule.required(),
          fields: [
            {
              title: 'Alt Text',
              name: 'alt',
              type: 'string',
              initialValue: 'Sanity Starter',
            },
          ],
        },
      ],
    },
    {
      name: 'share',
      title: 'Share',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'message',
          title: 'Message',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'General',
      }
    },
  },
})
