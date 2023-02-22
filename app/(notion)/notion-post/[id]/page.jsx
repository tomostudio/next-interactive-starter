'use client'

import FancyLink from '@/components/fancyLink'
import Layout from '@/components/layout'
import Image from 'next/image'
import { use } from 'react'
import ReactMarkdown from "react-markdown";

const getData = async (id) =>
  fetch(`https://next-interactive-starter.vercel.app/api/notion/getDetailPost/${id}`).then((res) =>
    res.json(),
  )

const PostPage = ({ params }) => {
  const { id } = params

  const post = use(getData(id))

  if (post.status === 404) return null

  return (
    <Layout>
      <div className="max-w-screen-lg w-full mx-auto flex flex-col space-y-8 px-4 mt-10">
        <FancyLink destination="/sanity-post" label="Back" />
        <h1 className="text-4xl">
          {post.page.properties.Name.title[0].plain_text}
        </h1>
        <div className="w-full flex flex-col space-y-2">
          <div className="relative w-full h-96">
            <Image
              src={post.page.cover.file.url}
              alt={post.page.properties.Name.title[0].plain_text}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
          <div className="pt-6">
            <ReactMarkdown>{post.blocks}</ReactMarkdown>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostPage
