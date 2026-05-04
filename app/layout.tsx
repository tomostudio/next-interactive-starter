// @ts-nocheck
import "@/styles/tailwind.css"
import "@/styles/main.scss"
import Providers from "./providers"

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://next-interactive-starter.vercel.app"
const isPreviewNoCrawl =
  process.env.NEXT_PUBLIC_PREVIEW_NO_CRAWL === "true" ||
  process.env.PREVIEW_NO_CRAWL === "true"

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Next Interactive Starter",
    template: "%s | Next Interactive Starter",
  },
  description:
    "Next.js App Router starter with Sanity CMS, Tailwind CSS, Framer Motion, and GSAP preconfigured.",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Next Interactive Starter",
    description:
      "Next.js App Router starter with Sanity CMS, Tailwind CSS, Framer Motion, and GSAP preconfigured.",
    siteName: "Next Interactive Starter",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Interactive Starter",
    description:
      "Next.js App Router starter with Sanity CMS, Tailwind CSS, Framer Motion, and GSAP preconfigured.",
  },
  robots: isPreviewNoCrawl
    ? {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
          index: false,
          follow: false,
          noimageindex: true,
        },
      }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
