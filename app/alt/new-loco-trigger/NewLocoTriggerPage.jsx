'use client'

import { useRef } from 'react'
import Layout from '@/components/templates/layout'
import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'
import { fade } from '@/helpers/preset/transitions'

import { LocomotiveScrollProvider } from 'react-locomotive-scroll'

import PushScrollGlobal from '@/helpers/function/globalscroll'

import { LazyMotion, domAnimation, m } from 'framer-motion'

import HeroSection from './components/organisms/hero-section'
import DemoArticle from './components/organisms/demo-article'
import LocomotiveTrigger from './components/organisms/locomotive-trigger'

export default function NewLocoTriggerPage() {
  const containerRef = useRef(null)

  return (
    <Layout>
      <LocomotiveScrollProvider
        options={{
          smooth: false,
          lerp: 0.05,
          mobile: {
            smooth: false,
          },
        }}
        containerRef={containerRef}
        watch={[]}
      >
        <PushScrollGlobal />
        <LocomotiveTrigger />
        <div
          data-scroll-container
          ref={containerRef}
          id="scroll-container"
          className="test test2 test3"
        >
          <div data-scroll-section>
            <Header />
            <LazyMotion features={domAnimation}>
              <m.div initial="initial" animate="enter" exit="exit">
                <HeroSection
                  sectionClassName="scrollsection h-screen w-full flex justify-center items-center p-10 "
                  lineClassName="w-full h-full line bg-yellow-200 bg-opacity-100"
                />

                <m.main
                  variants={fade}
                  className="mb-12 md:mb-16 xl:mb-24 pt-24 md:pt-20"
                >
                  <DemoArticle title="SCROLL TRIGGER NO LOCOMOTIVE NEW TRIGGER" />
                </m.main>

                <m.div variants={fade}>
                  <Footer />
                </m.div>
              </m.div>
            </LazyMotion>
          </div>
        </div>
      </LocomotiveScrollProvider>
    </Layout>
  )
}
