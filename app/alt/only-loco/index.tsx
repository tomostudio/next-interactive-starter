// @ts-nocheck
"use client"

import { domAnimation, LazyMotion, m } from "framer-motion"
import { useEffect, useRef } from "react"
import { LocomotiveScrollProvider } from "react-locomotive-scroll"
import Footer from "@/components/organisms/footer"
import Header from "@/components/organisms/header"
import PushScrollGlobal from "@/components/organisms/push-scroll-global"
import Layout from "@/components/templates/layout"
import { fade } from "@/constants/transitions"
import { bindLocoCallLogger } from "@/utils/loco-events"
import DemoArticle from "./components/demo-article"
import HeroSection from "./components/hero-section"

export default function OnlyLocoPageContent() {
  const containerRef = useRef(null)

  useEffect(() => {
    const cleanupLocoCall = bindLocoCallLogger()
    return () => cleanupLocoCall()
  }, [])

  return (
    <Layout>
      <LocomotiveScrollProvider
        options={{ smooth: false, lerp: 0.05 }}
        containerRef={containerRef}
        watch={[]}
      >
        <PushScrollGlobal />
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
                  sectionClassName="scrollsection h-screen-half w-full flex justify-center items-center p-10 "
                  lineClassName="w-full h-full line bg-yellow-200 bg-opacity-0 md:bg-opacity-100"
                />
                <m.main
                  variants={fade}
                  className="mb-12 md:mb-16 xl:mb-24 pt-24 md:pt-20"
                >
                  <DemoArticle title="LOCOMOTIVE WITH SCROLL TRIGGER NO SMOOTH" />
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
