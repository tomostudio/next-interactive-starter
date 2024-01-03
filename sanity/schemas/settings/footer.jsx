import { defineType } from 'sanity'

export default defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    {
      title: 'Footer Text',
      name: 'footerText',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Contact',
      name: 'contact',
      type: 'object',
      fields: [
        {
          title: 'Instagram',
          name: 'instagram',
          type: 'url',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Youtube',
          name: 'youtube',
          type: 'url',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Email',
          name: 'email',
          type: 'email',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Phone Number',
          name: 'phone_number',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      title: 'CTA Button',
      name: 'cta_button',
      type: 'object',
      validation: (Rule) => Rule.required(),
      fields: [
        {
          title: 'Name',
          name: 'name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Email / Link',
          name: 'option',
          type: 'boolean',
          initialValue: false,
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Email',
          name: 'email',
          type: 'email',
          hidden: ({ parent }) => parent?.option,
          validation: (Rule) =>
            Rule.custom((field, context) =>
              !context?.parent?.option ? (field ? true : 'Required') : true,
            ),
        },
        {
          title: 'Link',
          name: 'link',
          type: 'url',
          hidden: ({ parent }) => !parent?.option,
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }).custom((field, context) =>
              context?.parent?.option ? (field ? true : 'Required') : true,
            ),
        },
      ],
    },
    {
      title: 'Credits Text',
      name: 'credits',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare() {
      return {
        title: 'Footer',
      }
    },
  },
})
