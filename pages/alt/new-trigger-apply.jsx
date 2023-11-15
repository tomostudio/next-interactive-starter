import { useRef, useEffect } from 'react'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { fade } from '@/helpers/preset/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'

import applyAnimation from '@/helpers/function/applyAnimation'

// NEW

import { gsap } from 'gsap/dist/gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'

export default function NewTriggerApply() {
  const animationObj = {
    '(min-width: 751px)': [
      () => {
        const id = 'si01'
        const elem = document.querySelector('.scrollsection .line')

        const settings = {
          scrollTrigger: {
            id: id,
            trigger: document.querySelector('.scrollsection'), // which page section will be tracked as the scroll trigger
            scrub: 0.5,
            start: 'top 0%',
            end: '+=100%',
            markers: true,
            // onUpdate: (e) => { console.log('1', Math.round(e.progress * 100)) }
          },
        }
        const animation = [
          {
            set: [
              elem,
              {
                background: 'rgba(253, 230, 138, 1)',
              },
            ],
          },
          {
            to: [
              elem,
              {
                scaleX: 0,
                transformOrigin: 'left center',
                background: 'rgba(253, 230, 0, 1)',
                ease: 'none',
                duration: 1,
              },
              0,
            ],
          },
        ]
        return { id, elem, settings, animation }
      },
    ],
    '(max-width: 750px)': [
      () => {
        const id = 'si02'
        const elem = document.querySelector('.scrollsection .line')

        const settings = {
          scrollTrigger: {
            id: id,
            trigger: document.querySelector('.scrollsection'), // which page section will be tracked as the scroll trigger
            scrub: 0.5,
            start: 'top 0%',
            end: '+=100%',
            markers: true,
            // onUpdate: (e) => { console.log('2', Math.round(e.progress * 100)) }
          },
        }
        const animation = [
          {
            set: [
              elem,
              {
                background: 'rgba(253, 230, 138, 1)',
              },
            ],
          },
          {
            to: [
              elem,
              {
                scaleX: 0,
                transformOrigin: 'left center',
                background: 'rgba(253, 0, 138, 1)',
                ease: 'none',
                duration: 2,
              },
              0,
            ],
          },
        ]
        return { id, elem, settings, animation }
      },
    ],
  }

  useEffect(() => {
    const animation = applyAnimation({ animation: animationObj, gsap: gsap })
    return () => animation.revert()
  }, [])

  return (
    <Layout>
      <NextSeo title="Home" />

      <Header />
      <LazyMotion features={domAnimation}>
        <m.div initial="initial" animate="enter" exit="exit">
          <m.section
            variants={fade}
            className="scrollsection h-screen w-full flex justify-center items-center p-10 "
          >
            <div className="w-full h-full line bg-yellow-200 bg-opacity-100"></div>
            <div className="absolute left-1/2 top 1/2 -translate-x-1/2 -translate-y-1/2 text-xl">
              {' '}
              Scroll and Watch the Bar Moves
            </div>
          </m.section>
          <m.main
            variants={fade}
            className="mb-12 md:mb-16 xl:mb-24 pt-24 md:pt-20"
          >
            <Container>
              <article>
                <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl mb-4">
                  SCROLL TRIGGER NO LOCOMOTIVE NEW TRIGGER WITH APPLY ANIMATION
                </h1>
                <div className="content max-w-3xl mb-4">
                  <h2>Some example content</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate.
                  </p>

                  <p
                    data-scroll
                    data-scroll-repeat
                    data-scroll-call="trigger"
                    className="trigger"
                  >
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <p>
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <h2>Some example content</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate.
                  </p>

                  <p>
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <h2>Some example content</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate.
                  </p>

                  <p
                    data-scroll
                    data-scroll-repeat
                    data-scroll-call="trigger"
                    className="trigger"
                  >
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <p>
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <h2>Some example content</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate.
                  </p>

                  <p>
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <p
                    data-scroll
                    data-scroll-repeat
                    data-scroll-call="trigger"
                    className="trigger"
                  >
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <h2>Some example content</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate.
                  </p>

                  <p>
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <p
                    data-scroll
                    data-scroll-repeat
                    data-scroll-call="trigger"
                    className="trigger"
                  >
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <h2>Some example content</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate.
                  </p>

                  <p>
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <h2>Some example content</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate.
                  </p>

                  <p>
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>

                  <h2>Some example content</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate.
                  </p>

                  <p>
                    Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                    sint occaecat cupidatat non proident, sunt in culpa qui
                    officia deserunt mollit anim id est laborum.
                  </p>
                </div>
              </article>
            </Container>
          </m.main>

          <m.div variants={fade}>
            <Footer />
          </m.div>
        </m.div>
      </LazyMotion>
    </Layout>
  )
}
