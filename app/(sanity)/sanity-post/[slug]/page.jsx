import FancyLink from '@/components/fancyLink'
import Layout from '@/components/layout'
import { client } from '@/helpers/sanity/client'
import urlFor from '@/helpers/sanity/urlFor'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'

const getData = async (slug) => {
  const data = await client(
    `
          *[_type == "post" && slug.current == "${slug}"] {
              ...,
              "slug": slug.current,
              mainImage
          }
      `,
  )
  return data
}

const PostPage = async({ params }) => {
  const { slug } = params

  const posts = await getData(slug)

  if (posts.length === 0) return null

  const [post] = posts

  return (
    <Layout>
      <div className="max-w-screen-lg w-full mx-auto flex flex-col space-y-8 px-4 mt-10">
        <FancyLink destination="/sanity-post">Back</FancyLink>
        <h1 className="text-4xl">{post.title}</h1>
        <div className="w-full flex flex-col space-y-2">
          <div className="relative w-full h-96">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.mainImage.alt}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
          <div className="pt-6">
            <PortableText value={post.body} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default PostPage
