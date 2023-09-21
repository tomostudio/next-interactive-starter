# Next Interactive Starter

Demo: [INCOMING]
A [Next.js](https://nextjs.org/) boilerplate with [TailwindCSS](https://tailwindcss.com/) [Framer Motion](https://www.framer.com/motion/),  [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/), [Sanity CMS](https://sanity.io) and [GSAP Scroll Trigger](https://github.com/greensock/GSAP).
A Fork from [Samuel Goddard Next Boilerplate](https://github.com/samuelgoddard/next-tailwind-motion.git).

## ✨ Featueres
- [Next 13](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/)
- [SASS](https://sass-lang.com/)
- [Sanity CMS](https://sanity.io)
- [Framer Motion](https://www.framer.com/motion/) (With [LazyMotion](https://www.framer.com/api/motion/lazy-motion/) setup for smaller bundle sizes)
- SEO preconfigured with [next-seo](https://github.com/garmeeh/next-seo)
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
    
    yarn
    yarn run dev
    ```

3.  **Open the source code and start editing!**

    Your site is will be running at `http://localhost:3000`

## 🗄 Directory Structure
```
|-- components
    |-- modules
    |-- utils
    |-- container.js *// A simple container component to wrap areas in a max width
    |-- footer.js *// Example footer component*
    |-- header.js *// Example header component*
    |-- seo.js *// Example seo component*
    |-- layout.js *// Layout component that can be used to wrap your pages in a global layout*
    |-- scrolltrigger.js *// A container to enable scrolltrigger interaction*
    |-- applyAnimation.js *// A container to enable scrolltrigger interaction with simple implementation*
|-- helpers
    |-- seo.config.js *// default SEO configuration helper, imported in `pages/_app.js`*
    |-- transitions.js *// re-usable framer motion transition helper with a basic 'fade' transition to get started*
    |-- globalscroll.js *// push locomotive scroll event to context or global window event*
|-- context
    |-- state.js  *// default react context initiation, currently preset to store locomotive scroll event as a context*
|-- pages
    |-- _app.js *// Includes default SEO component, Framer motion AnimatePresence & Locomotive Scroll init*
    |-- _document.js *// Default Next document component*
    |-- about.js
    |-- index.js
|-- public *// Next public assets*
|-- styles
    |-- _locomotive.scss *// custom locomotive scroll styles*
    |-- _fonts.scss *// custom webfont styles*
    |-- _typography.scss *// custom typographical styles*
    |-- main.scss *// Tailwind init and custom css imports*
|-- .gitignore
|-- jsconfig.json *// module aliasing*
|-- postcss.config.js *// Tailwind, CSS import, CSS nesting init*
|-- next.config.js *// Prefer Preact to React*
|-- package.json
|-- README.md
|-- tailwind.config.js
```
