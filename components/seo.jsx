import React from 'react'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { urlForImage } from '@/sanity/lib/image'

const SEO = ({
  inputSEO = '',
  defaultSEO = '',
  webTitle = '',
  title = '',
  pagelink = 'https://next-interactive-starter.vercel.app',
}) => {
  const description = inputSEO
    ? inputSEO.seo_description
      ? inputSEO.seo_description
      : ''
    : defaultSEO.seo_description
    ? defaultSEO.seo_description
    : ''
  const image = inputSEO
    ? inputSEO.seo_image?.asset
      ? urlForImage(inputSEO.seo_image).auto("format").width(800).url()
      : ''
    : defaultSEO.seo_image?.asset
    ? urlForImage(defaultSEO.seo_image).auto("format").width(800).url()
    : ''

  const image_alt = inputSEO
    ? inputSEO.seo_image?.alt
      ? inputSEO.seo_image?.alt
      : ''
    : defaultSEO.seo_image?.alt
    ? defaultSEO.seo_image?.alt
    : ''

  const meta_keywords = inputSEO
    ? inputSEO.seo_keywords
      ? inputSEO.seo_keywords
      : ''
    : defaultSEO.seo_keywords
    ? defaultSEO.seo_keywords
    : ''

  const pagetitle = title && webTitle ? `${title} | ${webTitle}` : `Next Starter`
  const canonicalLink = `https://next-interactive-starter.vercel.app${
    pagelink ? `${pagelink.startsWith('/') ? '' : '/'}${pagelink}` : ''
  }`

  return (
    <>
      <NextSeo
        title={pagetitle}
        description={description}
        canonical={canonicalLink}
        openGraph={{
          url: canonicalLink,
          title: pagetitle,
          description: description,
          images: [
            {
              url: image,
              alt: image_alt,
            },
          ],
          site_name: webTitle,
        }}
        twitter={{
          site: webTitle,
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <meta name="keywords" content={meta_keywords} />
      </Head>
    </>
  )
}

export default SEO
