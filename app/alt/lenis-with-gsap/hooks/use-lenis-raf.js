import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export default function useLenisRaf() {
  const lenis = useRef(null)

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    let rafId
    const raf = (time) => {
      lenis.current?.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      lenis.current?.destroy()
    }
  }, [])
}
