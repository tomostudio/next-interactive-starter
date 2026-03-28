'use client'

import { useEffect } from 'react'
import applyAnimation from '@/helpers/function/applyAnimation'
import { gsap } from 'gsap/dist/gsap'

export default function useScrollTriggerApplyAnimation(animationObj) {
  useEffect(() => {
    const animation = applyAnimation({ animation: animationObj, gsap: gsap })
    return () => animation.revert()
  }, [animationObj])
}
