// @ts-nocheck
import { gsap } from "gsap/dist/gsap"
import ScrollTrigger from "gsap/dist/ScrollTrigger"
import isFunction from "@/utils/is-function"

const applyAnimation = ({ animation }) => {
  gsap.registerPlugin(ScrollTrigger)
  const applyAnimation = ({ anim }) => {
    // Anim = animation
    // tl = timeline to push
    // ss = save style
    const tl = []
    if (anim) {
      // check if there are multiple animation
      if (Array.isArray(anim)) {
        // run multiple animation command
        anim.forEach((each_anim) => {
          // push each animation into array.
          // pushing animation = running the animation.
          const { settings, animation } = each_anim()

          const _tl = gsap.timeline(settings)
          animation.forEach((a) => {
            const k = Object.keys(a)[0]
            if (k === "to") {
              _tl.to(...a[k])
            } else if (k === "from") {
              _tl.from(...a[k])
            } else if (k === "set") {
              _tl.set(...a[k])
            } else if (k === "call") {
              _tl.call(a[k])
            }
          })

          tl.push(_tl)
        })
      }
    } else if (isFunction(anim)) {
      // pull object
      const { settings, animation } = anim()

      // push to array
      const _tl = gsap.timeline(settings)

      animation.forEach((a) => {
        const k = Object.keys(a)[0]
        if (k === "to") {
          _tl.to(...a[k])
        } else if (k === "from") {
          _tl.from(...a[k])
        } else if (k === "set") {
          _tl.set(...a[k])
        } else if (k === "call") {
          _tl.call(a[k])
        }
      })
      tl.push(_tl)
    }
    return tl
  }

  if (animation instanceof Object && !Array.isArray(animation)) {
    const _property = Object.getOwnPropertyNames(animation)

    //Create Array for Match Media
    const stMatchMedia = []

    // fill animation
    _property.forEach((p, _id) => {
      // push animation to object
      const pushData = {
        media: p,
        function: () => {
          //run apply animation function

          const _tl = applyAnimation({
            anim: animation[p],
          })

          return () => {}
        },
      }
      stMatchMedia.push(pushData)
    })

    // RUN Scrolltrigger MatchMedia
    const mm = gsap.matchMedia()

    stMatchMedia.forEach((mediaQuery) => {
      mm.add(mediaQuery.media, mediaQuery.function)
    })

    return mm
  } else {
    const ctx = gsap.context(() => {
      const _tl = applyAnimation({ anim: animation })
    })
    return ctx
  }
}

export default applyAnimation
