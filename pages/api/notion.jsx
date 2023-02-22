import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

export default async function handler(req, res) {
  const response = await notion.databases.query({
    database_id: 'b89cc134f51d4533ba2967963b2f84e6',
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
