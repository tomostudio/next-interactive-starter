const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://next-interactive-starter.vercel.app'

const routes = [
  '/',
  '/alt/lenis-with-gsap',
  '/alt/loco-no-smooth',
  '/alt/new-loco-trigger',
  '/alt/new-trigger',
  '/alt/new-trigger-apply',
  '/alt/no-loco',
  '/alt/only-loco',
]

export default function sitemap() {
  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
    lastModified: new Date(),
  }))
}
