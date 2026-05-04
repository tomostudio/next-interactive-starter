// @ts-nocheck
"use client"

import { gsap } from "gsap/dist/gsap"
import { useEffect } from "react"

export default function useScrollTriggerAnimation() {
  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add("(min-width: 751px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "si01",
          trigger: document.querySelector(".scrollsection"), // which page section will be tracked as the scroll trigger
          scrub: 1,
          start: "top 0%",
          end: "+=100%",
        },
      })

      const elem = document.querySelector(".scrollsection .line")

      tl.set(elem, { background: "rgba(253, 230, 138, 1)" })
      tl.to(
        elem,
        {
          scaleX: 0,
          transformOrigin: "left center",
          background: "rgba(253, 230, 0, 1)",
          ease: "none",
          duration: 1,
        },
        0,
      )
      return () => {
        // optional
        // custom cleanup code here (runs when it STOPS matching)
      }
    })
    mm.add("(max-width: 750px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "si02",
          trigger: document.querySelector(".scrollsection"), // which page section will be tracked as the scroll trigger
          scrub: 1,
          start: "top 0%",
          end: "+=100%",
        },
      })

      const elem = document.querySelector(".scrollsection .line")

      tl.set(elem, { background: "rgba(253, 230, 138, 1)" })
      tl.to(
        elem,
        {
          scaleX: 0,
          transformOrigin: "left center",
          background: "rgba(253, 0, 138, 1)",
          ease: "none",
          duration: 2,
        },
        0,
      )
      return () => {
        // optional
        // custom cleanup code here (runs when it STOPS matching)
      }
    })
    return () => mm.revert()
  }, [])
}
