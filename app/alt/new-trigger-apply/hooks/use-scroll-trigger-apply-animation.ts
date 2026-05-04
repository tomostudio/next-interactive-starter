// @ts-nocheck
"use client"

import { gsap } from "gsap/dist/gsap"
import { useEffect } from "react"
import applyAnimation from "@/utils/apply-animation"

export default function useScrollTriggerApplyAnimation(animationObj) {
  useEffect(() => {
    const animation = applyAnimation({ animation: animationObj, gsap: gsap })
    return () => animation.revert()
  }, [animationObj])
}
