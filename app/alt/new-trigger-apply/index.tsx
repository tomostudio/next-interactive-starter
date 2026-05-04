// @ts-nocheck
"use client"

import { domAnimation, LazyMotion, m } from "framer-motion"
import { gsap } from "gsap/dist/gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import Footer from "@/components/organisms/footer"
import Header from "@/components/organisms/header"
import Layout from "@/components/templates/layout"
import { fade } from "@/constants/transitions"
import useRegisterScrollTrigger from "@/hooks/use-register-scroll-trigger"
import DemoArticle from "./components/demo-article"
import HeroSection from "./components/hero-section"
import useScrollTriggerApplyAnimation from "./hooks/use-scroll-trigger-apply-animation"
import { animationObj } from "./utils/animation"

export default function NewTriggerApplyPageContent() {
  useRegisterScrollTrigger(gsap, ScrollTrigger)
  useScrollTriggerApplyAnimation(animationObj)

  return (
    <Layout>
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
            <DemoArticle title="SCROLL TRIGGER NO LOCOMOTIVE NEW TRIGGER WITH APPLY ANIMATION" />
          </m.main>

          <m.div variants={fade}>
            <Footer />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
