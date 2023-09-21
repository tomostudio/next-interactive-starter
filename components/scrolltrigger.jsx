import { useEffect, forwardRef, useState } from 'react';

import { useLocomotiveScroll } from 'react-locomotive-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import isFunction from '@/helpers/function/isFunction';

import React from 'react';

const ScrollTriggerWrapper = forwardRef((props, ref) => {
  const { scroll } = useLocomotiveScroll();
  const { children, animation, locomotive } = props;
  const [scrollInitState, setScrollInit] = useState(false);

  // Initiate Scrolltrigger
  gsap.registerPlugin(ScrollTrigger);

  // init scroll
  if (locomotive)
    useEffect(() => {
      if (scroll && !scrollInitState) {
        setScrollInit(true);

        // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
        scroll.on('scroll', ScrollTrigger.update);

        let scrollerQuery = `#${scroll.el.id}`;
        if (!scrollerQuery) {
          scrollerQuery = `.${scroll.el.className.replace(/ /g, '.')}`;
        }

        // INIT SCROLLTRIGGER
        ScrollTrigger.scrollerProxy(scrollerQuery, {
          scrollTop(value) {
            return arguments.length
              ? scroll.scrollTo(value, { duration: 0, disableLerp: true })
              : scroll.scroll.instance.scroll.y;
          }, // we don't have to define a scrollLeft because we're only scrolling vertically.
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
          pinType: document.querySelector(scrollerQuery).style.transform
            ? 'transform'
            : 'fixed',
        });
      }
      return () => {
        setScrollInit(false);
      };
    }, [scroll]);

  const processUseEffectArray = () => {
    return locomotive ? [scrollInitState, animation] : [];
  };
  // init timeilne / animation
  useEffect(() => {
    let ctx = gsap.context(() => {
      const resetAnimation = () => {
        //Get All Timeline and Clear
        gsap.globalTimeline.clear();

        if (currentTL) {
          Object.entries(currentTL).forEach(([key, tl]) => {
            // go through each timeline.
            tl.forEach((eachTL) => {
              // kill timeline
              eachTL.pause(0).kill(true);
            });
            // delete cleared object
            delete currentTL[key];
          });
        }

        //Get All Scroll Trigger and Clear
        let allTrigger = ScrollTrigger.getAll();
        allTrigger.forEach((trigger) => {
          trigger.kill(true);
        });

        //Clear Array
        tlSaveStyle = [];
      };
      let tlSaveStyle = [];
      let currentTL = {};

      const applyAnimation = ({ anim, tl = [], ss }) => {
        // Anim = animation
        // tl = timeline to push
        // ss = save style
        if (anim) {
          // check if there are multiple animation
          if (anim instanceof Array) {
            // run multiple animation command
            anim.forEach((each_anim) => {
              // push each animation into array.
              // pushing animation = running the animation.
              const { settings, elem, animation } = each_anim();

              tl.push(gsap.timeline(settings));

              if (ss) ss.push(elem);

              animation.forEach((a) => {
                const k = Object.keys(a)[0];
                if (k === 'to') {
                  tl.at(-1).to(...a[k]);
                } else if (k === 'from') {
                  tl.at(-1).from(...a[k]);
                } else if (k === 'set') {
                  tl.at(-1).set(...a[k]);
                } else if (k === 'call') {
                  tl.at(-1).call(a[k]);
                }
              });
            });
          }

          return tl;
        } else if (isFunction(anim)) {
          // pull object
          const { settings, elem, animation } = anim();

          // push to array
          tl.push(gsap.timeline(settings));

          if (ss) ss.push(elem);

          animation.forEach((a) => {
            const k = Object.keys(a)[0];
            if (k === 'to') {
              tl.at(-1).to(...a[k]);
            } else if (k === 'from') {
              tl.at(-1).from(...a[k]);
            }
          });
        }
      };

      if (animation instanceof Object && !(animation instanceof Array)) {
        const _property = Object.getOwnPropertyNames(animation);

        //Create Array for Match Media
        const stMatchMedia = [];

        // fill animation
        _property.forEach((p, id) => {
          // push animation to object

          const pushData = {
            media: p,
            function: function () {
              //run apply animation function

              currentTL[`${p}`] = applyAnimation({
                anim: animation[p],
                ss: tlSaveStyle,
              });

              return () => {
                tlSaveStyle.forEach((ss) => {
                  gsap.set(ss, { clearProps: true });
                });

                ScrollTrigger.refresh(true);
                //Kill All Timeline during breakpoint
                if (currentTL[`${p}`])
                  currentTL[`${p}`].forEach((eachTL) => {
                    eachTL.pause(0).kill();
                    eachTL.clear();
                  });

                delete currentTL[`${p}`];
              };
            },
          };
          stMatchMedia.push(pushData);
        });

        // console.log(stMatchMedia);

        // RUN Scrolltrigger MatchMedia
        let mm = gsap.matchMedia();

        stMatchMedia.forEach((mediaQuery) => {
          mm.add(mediaQuery.media, mediaQuery.function);
        });
      } else {
        // Fill Animation normally, no breakpoints
        resetAnimation();
        currentTL[`global`] = applyAnimation({ anim: animation });
      }
    });
    return () => {
      ctx.revert();
    };
  }, [...processUseEffectArray()]);

  return <>{children}</>;
});

export default ScrollTriggerWrapper;
