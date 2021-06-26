import Head from 'next/head'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import FancyLink from '@/components/fancyLink'
import { fade } from "@/helpers/transitions"
import { LazyMotion, domAnimation, m } from "framer-motion"

export default function Home() {
  return (
    <Layout>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Nextjs boilerplate - Home</title>
        <meta
        name="description"
        content="nextJS boilerplate"
        />
        <meta name="og:title" content="Website Title" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header />
      
      <LazyMotion features={domAnimation}>
        <m.div
          initial="initial"
          animate="enter"
          exit="exit"
          className="mb-12 md:mb-16 xl:mb-24"
        >
          <Container>
            <m.div variants={fade}>
              <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl mb-4">Home Page</h1>
              <div className="content max-w-3xl mb-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              </div>
              
              <FancyLink destination="/about" a11yText="Navigate to the about page" label="About Page" />
            </m.div>
          </Container>
        </m.div>
      </LazyMotion>

      <Footer />
    </Layout>
  )
}
