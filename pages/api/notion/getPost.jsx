import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

export default async function handler(req, res) {
  const response = await notion.databases.query({
    database_id: '82999daa91ce4c27a67c3437d5ddc3c3',
    filter: {
      property: 'Published',
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: 'Updated',
        direction: 'descending',
      },
    ],
  })

  res.status(200).json(response.results)
}
