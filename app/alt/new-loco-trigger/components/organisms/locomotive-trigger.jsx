'use client'

import { useEffect } from 'react'
import { useLocomotiveScroll } from 'react-locomotive-scroll'
import { gsap } from 'gsap/dist/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import useRegisterScrollTrigger from '@/hooks/use-register-scroll-trigger'

export default function LocomotiveTrigger() {
  useRegisterScrollTrigger(gsap, ScrollTrigger)
  const { scroll } = useLocomotiveScroll()

  useEffect(() => {
    if (!scroll) {
      return
    }

    scroll.on('scroll', ScrollTrigger.update)

    let scrollerQuery = `#${scroll.el.id}`
    if (!scroll.el.id && scroll.el.className) {
      scrollerQuery = `.${scroll.el.className.replace(/ /g, '.')}`
    }

    ScrollTrigger.scrollerProxy(scrollerQuery, {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, { duration: 0, disableLerp: true })
          : scroll.scroll.instance.scroll.y
      },
      scrollLeft(value) {
        return arguments.length
          ? scroll.scrollTo(value, { duration: 0, disableLerp: true })
          : scroll.scroll.instance.scroll.x
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    })

    const lsUpdate = () => scroll.update()
    ScrollTrigger.addEventListener('refresh', lsUpdate)
    ScrollTrigger.refresh()

    const mm = gsap.matchMedia()

    mm.add('(min-width: 751px)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          id: 'si01',
          trigger: document.querySelector('.scrollsection'),
          scroller: `#${scroll.el.id}`,
          scrub: 1,
          start: 'top 0%',
          end: '+=100%',
        },
      })

      const elem = document.querySelector('.scrollsection .line')

      timeline.set(elem, { background: 'rgba(253, 230, 138, 1)' })
      timeline.to(
        elem,
        {
          scaleX: 0,
          transformOrigin: 'left center',
          background: 'rgba(0, 0, 138, 0)',
          ease: 'none',
          duration: 1,
        },
        0,
      )
    })

    mm.add('(max-width: 750px)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          id: 'si02',
          trigger: document.querySelector('.scrollsection'),
          scroller: `#${scroll.el.id}`,
          scrub: 1,
          start: 'top 0%',
          end: '+=100%',
        },
      })

      const elem = document.querySelector('.scrollsection .line')

      timeline.set(elem, { background: 'rgba(253, 230, 138, 1)' })
      timeline.to(
        elem,
        {
          scaleX: 0,
          transformOrigin: 'left center',
          background: 'rgba(253, 0, 0, 0)',
          ease: 'none',
          duration: 2,
        },
        0,
      )
    })

    return () => {
      ScrollTrigger.removeEventListener('refresh', lsUpdate)
      mm.revert()
    }
  }, [scroll])

  return null
}
