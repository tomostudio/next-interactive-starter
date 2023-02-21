'use client'

import FancyLink from '@/components/fancyLink'
import Layout from '@/components/layout'
import { client } from '@/helpers/sanity/client'
import urlFor from '@/helpers/sanity/urlFor'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const SanityPost = () => {
  const [post, setPost] = useState([])
  const getData = async () => {
    const data = await client(
      `
        *[_type == "post"] {
            ...,
            "slug": slug.current,
            mainImage
        }
    `,
    )
    setPost(data)
  }
  useEffect(() => {
    getData()
  }, [])
  
  return (
    <Layout>
      <div className="max-w-screen-lg w-full mx-auto flex flex-col space-y-8 px-4 mt-10">
        <h1 className="text-4xl">Santiy Post</h1>
        {post?.map((data, id) => (
          <div
            className="w-full h-fit flex flex-col space-y-2 border-2 rounded border-black bg-gray-100"
            key={id}
          >
            <div className="relative w-full h-48">
              <Image
                className="p-2"
                src={urlFor(data.mainImage).url()}
                fill
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
            <h2 className="text-2xl px-4 py-2 border-t-2 border-black">
              {data.title}
            </h2>
            <div className="px-4 py-2">
              <PortableText value={data.body} />
              <div className="mt-6">
                <FancyLink
                  destination={`/sanity-post/${data.slug}`}
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

export default SanityPost
