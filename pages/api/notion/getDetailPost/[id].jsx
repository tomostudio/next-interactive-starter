import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

const notion = new Client({ auth: process.env.NOTION_ACCESS_TOKEN })

const n2m = new NotionToMarkdown({ notionClient: notion })

export default async function handler(req, res) {
  const { id } = req.query

  try {
    const getBlock = await notion.blocks.children.list({
      block_id: id,
    })

    const getPage = await notion.pages.retrieve({
      page_id: id,
    })


    const mdBlocks = await n2m.pageToMarkdown(id)
    let blocks = n2m.toMarkdownString(mdBlocks);

    res.status(200).json({
      page: getPage,
      blocks: blocks,
    })
  } catch (e) {
    res.status(200).json({
      message: 'Data Not Found!',
      status: 404,
    })
  }
}
