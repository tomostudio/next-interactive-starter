import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

export const getPost = async () => {
  const response = await notion.databases.query({
    database_id: 'b89cc134f51d4533ba2967963b2f84e6',
  })
  return response.results
}
