'use client'

import FancyLink from '@/components/fancyLink'
import Layout from '@/components/layout'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'

const getData = async () => fetch('https://next-interactive-starter.vercel.app/api/notion').then((res) => res.json())
const NotionPost = () => {
  const post = use(getData())
  return (
    <Layout>
      <div className="max-w-screen-lg w-full mx-auto flex flex-col space-y-8 px-4 mt-10">
        <h1 className="text-4xl">Notion Post</h1>
        {post?.map(({properties, cover}, id) => (
          <div
            className="w-full h-fit flex flex-col space-y-2 border-2 rounded border-black bg-gray-100"
            key={id}
          >
            <div className="relative w-full h-48">
              <Image
                className="p-2"
                src={cover.file.url}
                alt={properties.Name.title[0].plain_text}
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
            <h2 className="text-2xl px-4 py-2 border-t-2 border-black">
              {properties.Name.title[0].plain_text}
            </h2>
            <div className="px-4 py-2">
              <div className="mt-6">
                <FancyLink
                  destination={`/sanity-post/${properties.Slug.formula.string}`}
                  a11yText="Navigate to the about page"
                  label="READ MORE"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default NotionPost
