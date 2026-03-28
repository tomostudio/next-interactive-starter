'use client'

import { useRef } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'
import ScrollTriggerWrapper from '@/components/organisms/scrolltrigger'
import PushScrollGlobal from '@/helpers/function/globalscroll'
import { fade } from '@/helpers/preset/transitions'
import useRegisterScrollTrigger from '@/hooks/use-register-scroll-trigger'

import { animationObj } from './utils/animation'
import Article from './components/organisms/article'

export default function HomePage() {
  const containerRef = useRef(null)

  useRegisterScrollTrigger()

  return (
    <LocomotiveScrollProvider
      options={{ smooth: true, lerp: 0.05 }}
      containerRef={containerRef}
      watch={[]}
    >
      <PushScrollGlobal />
      <div data-scroll-container ref={containerRef} id="scroll-container">
        <div data-scroll-section>
          <ScrollTriggerWrapper animation={animationObj} locomotive>
            <Header />
            <LazyMotion features={domAnimation}>
              <m.div initial="initial" animate="enter" exit="exit">
                <m.section
                  variants={fade}
                  className="scrollsection relative h-screen-half w-full flex justify-center items-center p-10"
                >
                  <div className="w-full h-full line bg-yellow-200 bg-opacity-0 md:bg-opacity-100" />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-center px-4">
                    Scroll and Watch the Bar Moves
                  </div>
                </m.section>

                <m.main
                  variants={fade}
                  className="mb-12 md:mb-16 xl:mb-24 pt-24 md:pt-20"
                >
                  <Article />
                </m.main>

                <m.div variants={fade}>
                  <Footer />
                </m.div>
              </m.div>
            </LazyMotion>
          </ScrollTriggerWrapper>
        </div>
      </div>
    </LocomotiveScrollProvider>
  )
}
