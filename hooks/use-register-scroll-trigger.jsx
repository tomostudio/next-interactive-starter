'use client'

import { useEffect } from 'react'
import gsapDefault from 'gsap'
import { ScrollTrigger as scrollTriggerDefault } from 'gsap/dist/ScrollTrigger'

export default function useRegisterScrollTrigger(
  gsap = gsapDefault,
  ScrollTrigger = scrollTriggerDefault,
) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
  }, [gsap, ScrollTrigger])
}
