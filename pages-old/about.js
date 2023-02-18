import { useRef, useEffect } from 'react'
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Container from '@/components/container'
import FancyLink from '@/components/fancyLink'
import { fade } from '@/helpers/transitions'
import { LocomotiveScrollProvider } from 'react-locomotive-scroll'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import PushScrollGlobal from '@/helpers/globalscroll'
import { useAppContext } from '../context/state.js';
import ScrollTriggerWrapper from '@/components/scrolltrigger.js'

export default function About() {
  const containerRef = useRef(null)
  const appContext = useAppContext();

  // set animation variable to be pass to the scroll trigger component.
  // Input Animation without breakpoints
  const animationObj = [() => {
    const id = 'si01'
    const elem = '.scrollsection .line';
    const settings = {
      scrollTrigger: {
        id: id,
        trigger: '.scrollsection', // which page section will be tracked as the scroll trigger
        scroller: '#scroll-container', // id of scroll container
        scrub: true,
        start: 'top 0%',
        end: 'bottom 0%',
        // onUpdate: (e) => { console.log('1', Math.round(e.progress * 100)) }
      }
    }

    // Input Animation
    const animation = [
      {
        "to": [elem, {
          scaleX: 0,
          transformOrigin: "left center",
          ease: "none"
        }]
      }]

    return { id, elem, settings, animation }
  }, () => {
    const id = 'si01'
    const elem = '.scrollsection2 .line2';
    const settings = {
      scrollTrigger: {
        id: id,
        trigger: '.scrollsection2', // which page section will be tracked as the scroll trigger
        scroller: '#scroll-container', // id of scroll container
        scrub: true,
        start: 'top 50%',
        end: '+=50%',
        // onUpdate: (e) => { console.log('1', Math.round(e.progress * 100)) }
      }
    }

    // Input Animation
    const animation = [{
      "set": [elem, {
        scaleX: 0,
        transformOrigin: "left center"
      }]
    },
    {
      "to": [elem, {
        scaleX: 1,
        ease: "none"
      }]
    }, {
      "set": [elem, {
        background: 'rgba(250,240,10,1)',
      }]
    },
    { "call": () => { console.log('call') } }]

    return { id, elem, settings, animation }
  },]

  useEffect(() => {
    window.addEventListener("LocoCall", (e) => { console.log(e.detail) });
    return () => {
      window.removeEventListener("LocoCall", (e) => { console.log(e.detail) });
    }
  }, [appContext])

  return (
    <Layout>
      <NextSeo title="About" />

      <LocomotiveScrollProvider
        options={{ smooth: true, lerp: 0.05 }}
        containerRef={containerRef}
        watch={[]}
      >
        <PushScrollGlobal />
        <div data-scroll-container ref={containerRef} id="scroll-container">
          <div data-scroll-section>
            <ScrollTriggerWrapper animation={animationObj}>
              <Header />
              <LazyMotion features={domAnimation}>
                <m.div
                  initial="initial"
                  animate="enter"
                  exit="exit"
                >
                  <m.main
                    initial="initial"
                    animate="enter"
                    exit="exit" variants={fade} className="mb-12 md:mb-16 xl:mb-24 pt-24 md:pt-20" onAnimationStart={() => { console.log(' enter') }}
                    onAnimationComplete={definition => {
                      console.log('Completed animating', definition)
                    }}>
                    <Container>
                      <section className="scrollsection h-screen-1/2 w-full bg-blue-100 flex justify-center items-center p-10">
                        <div className="w-full h-full bg-white line"></div>
                      </section>
                      <section className="scrollsection2 h-screen-1/2 w-full bg-red-100 flex justify-center items-center mb-10 p-10">
                        <div className="w-full h-full bg-white line2 scale-x-0"></div>
                      </section>
                      <article>
                        <h1 className="font-bold text-2xl md:text-3xl xl:text-4xl mb-4">Next x Tailwind x Motion x Locomotive</h1>
                        <div className="content max-w-3xl mb-4">
                          <h2>Some example content</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                          <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                          <h2>Some example content</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                          <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                          <h2>Some example content</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                          <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                          <h2>Some example content</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                          <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                          <h2>Some example content</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                          <h2>Some example content</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                          <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                          <h2>Some example content</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                          <p data-scroll data-scroll-repeat data-scroll-call="trigger" className="trigger">Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                          <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                          <h2>Some example content</h2>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.</p>

                          <p data-scroll data-scroll-repeat data-scroll-call="trigger" className="trigger">Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                          <p>Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>

                        <FancyLink destination="/" a11yText="Navigate to the home page" label="Home Page" />
                      </article>
                    </Container>
                  </m.main>

                  <m.div variants={fade}>
                    <Footer />
                  </m.div>
                </m.div>
              </LazyMotion>
            </ScrollTriggerWrapper>
          </div>
        </div>
      </LocomotiveScrollProvider>
    </Layout>
  )
}
