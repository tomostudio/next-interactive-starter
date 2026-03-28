# Next Interactive Starter

Demo: [INCOMING]
A [Next.js](https://nextjs.org/) boilerplate with App Router, [TailwindCSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/), [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/), [Sanity CMS](https://sanity.io), and [GSAP Scroll Trigger](https://github.com/greensock/GSAP).
A Fork from [Samuel Goddard Next Boilerplate](https://github.com/samuelgoddard/next-tailwind-motion.git).

## ✨ Features
- [Next 16 App Router](https://nextjs.org/)
- [Tailwind 4](https://tailwindcss.com/)
- Tailwind v4 CSS-first setup (`@import "tailwindcss";`, no `tailwind.config.js` required)
- [SASS](https://sass-lang.com/) for global/custom styles
- [Sanity CMS](https://sanity.io)
- [Framer Motion](https://www.framer.com/motion/) (With [LazyMotion](https://www.framer.com/api/motion/lazy-motion/) setup for smaller bundle sizes)
- SEO preconfigured with Next.js Metadata API (`app/layout.jsx`) + route-level canonical URLs
- Dynamic `robots.txt` via App Router route handler:
  - Preview mode (`NEXT_PUBLIC_PREVIEW_NO_CRAWL=true`) => `noindex, nofollow`
  - Production mode => crawlable + `/admin` blocked
- Dynamic `sitemap.xml` via App Router route handler (homepage + all `/alt/*` routes)
- [Module Aliasing](https://nextjs.org/docs/advanced-features/module-path-aliases) preconfigured with `jsconfig.json`
- [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) preconfigured for smooth, lerp based page scrolling
- [GSAP Scroll Trigger](https://github.com/greensock/GSAP) preconfigured for custom scroll animation.

## 🚀 Quick start

1.  **Clone the repo**

    ```sh
    git clone https://github.com/tomostudio/next-interactive-starter.git
    ```

2.  **Start developing**

    Navigate into your new site’s directory and install the local dependencies first, then run the dev command.

    ```sh
    cd next-interactive-starter/

    nvm use
    yarn
    yarn run dev
    ```

3.  **Open the source code and start editing!**

    Your site will run at `http://localhost:3000`

## ⚙️ Environment

Create `.env.local` as needed:

```sh
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_PREVIEW_NO_CRAWL=false

NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=...
NEXT_PUBLIC_SANITY_API_VERSION=2023-11-06
```

- Set `NEXT_PUBLIC_PREVIEW_NO_CRAWL=true` for preview environments to output `noindex, nofollow`.
- Set it back to `false` (or unset) for production so metadata remains crawlable.
- Set `NEXT_PUBLIC_SITE_URL` to your public domain so canonical URL, OpenGraph URL, `robots.txt`, and `sitemap.xml` are correct.

## 🗄 Directory Structure
```
|-- app
    |-- home/components/* *// route-local atomic components for homepage*
    |-- alt/<slug>/components/templates/* *// route-local components per alt page*
    |-- admin/[[...index]]/components/templates/* *// route-local studio template*
    |-- layout.jsx *// global layout + metadata config*
    |-- page.jsx *// homepage route wrapper*
    |-- robots.js *// dynamic robots.txt output*
    |-- sitemap.js *// dynamic sitemap.xml output*
|-- components
    |-- atoms/container.jsx
    |-- molecules/
    |-- organisms/header.jsx
    |-- organisms/footer.jsx
    |-- organisms/scrolltrigger.jsx
    |-- templates/layout.jsx
|-- helpers
    |-- preset/transitions.jsx
    |-- function/globalscroll.jsx
|-- context
    |-- state.jsx
|-- public *// Next public assets*
|-- styles
    |-- tailwind.css
    |-- main.scss
    |-- _locomotive.scss
    |-- _fonts.scss
    |-- _utils.scss
|-- .gitignore
|-- .nvmrc
|-- jsconfig.json *// module aliasing*
|-- postcss.config.js
|-- next.config.js
|-- package.json
|-- README.md
```
