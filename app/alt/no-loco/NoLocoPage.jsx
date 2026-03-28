'use client'

import { useRef, useEffect } from 'react'
import Layout from '@/components/templates/layout'
import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'
import { fade } from '@/helpers/preset/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ScrollTriggerWrapper from '@/components/organisms/scrolltrigger.jsx'
import useRegisterScrollTrigger from '@/hooks/use-register-scroll-trigger'
import { bindLocoCallLogger } from '@/utils/loco-events'
import HeroSection from './components/organisms/hero-section'
import DemoArticle from './components/organisms/demo-article'
import { animationObj } from './utils/animation'

export default function NoLocoPage() {
  useRegisterScrollTrigger(gsap, ScrollTrigger)

  useEffect(() => {
    const cleanupLocoCall = bindLocoCallLogger()

    let ctx = gsap.context(() => {})
    return () => {
      cleanupLocoCall()
      ctx.revert()
    }
  }, [])

  return (
    <Layout>
      <ScrollTriggerWrapper animation={animationObj} locomotive={false}>
        <Header />
        <LazyMotion features={domAnimation}>
          <m.div initial="initial" animate="enter" exit="exit">
            <HeroSection
              sectionClassName="scrollsection h-screen-half w-full flex justify-center items-center p-10 "
              lineClassName="w-full h-full line bg-yellow-200 bg-opacity-0 md:bg-opacity-100"
            />
            <m.main
              variants={fade}
              className="mb-12 md:mb-16 xl:mb-24 pt-24 md:pt-20"
            >
              <DemoArticle title="SCROLL TRIGGER NO LOCOMOTIVE" />
            </m.main>

            <m.div variants={fade}>
              <Footer />
            </m.div>
          </m.div>
        </LazyMotion>
      </ScrollTriggerWrapper>
    </Layout>
  )
}
