import '@/styles/main.scss'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { ContextWrapper } from 'context/state'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <>
      {router.pathname === '/admin/[[...index]]' ? (
        <Component {...pageProps} />
      ) : (
        <AnimatePresence mode={'wait'}>
          <ContextWrapper>
            <Component {...pageProps} key={router.asPath} />
          </ContextWrapper>
        </AnimatePresence>
      )}
    </>
  )
}
