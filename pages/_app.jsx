import '@/styles/main.scss'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '@/helpers/seo.config'
import { ContextWrapper } from 'context/state'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      <DefaultSeo {...SEO} />

        <AnimatePresence mode={'wait'}>
          <ContextWrapper>
            <Component {...pageProps} key={router.asPath} />
          </ContextWrapper>
        </AnimatePresence>
    </>
  )
}
