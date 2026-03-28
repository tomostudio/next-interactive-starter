const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://next-interactive-starter.vercel.app'

const isPreviewNoCrawl =
  process.env.NEXT_PUBLIC_PREVIEW_NO_CRAWL === 'true' ||
  process.env.PREVIEW_NO_CRAWL === 'true'

export default function robots() {
  return {
    rules: isPreviewNoCrawl
      ? [
          {
            userAgent: '*',
            disallow: '/',
          },
        ]
      : [
          {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/admin/*'],
          },
        ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
