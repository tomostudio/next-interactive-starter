// @ts-nocheck
"use client"

import gsapDefault from "gsap"
import { ScrollTrigger as scrollTriggerDefault } from "gsap/dist/ScrollTrigger"
import { useEffect } from "react"

export default function useRegisterScrollTrigger(
  gsap = gsapDefault,
  ScrollTrigger = scrollTriggerDefault,
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [gsap, ScrollTrigger])
}
