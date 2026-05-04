// @ts-nocheck
import Lenis from "@studio-freight/lenis"
import { useEffect, useRef } from "react"

export default function useLenisRaf() {
  const lenis = useRef(null)

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 3,
      easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    })

    let rafId = 0
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
