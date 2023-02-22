'use client'

import FancyLink from '@/components/fancyLink'
import Layout from '@/components/layout'
import Image from 'next/image'
import { use, useEffect, useState } from 'react'

// const getData = async () => fetch('https://next-interactive-starter.vercel.app/api/notion').then((res) => res.json())
const NotionPost = () => {
//   const post = use(getData())
  return (
    <Layout>
      <div className="max-w-screen-lg w-full mx-auto flex flex-col space-y-8 px-4 mt-10">
        <h1 className="text-4xl">Notion Post</h1>
      </div>
    </Layout>
  )
}

export default NotionPost
