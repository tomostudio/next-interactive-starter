import { gsap } from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
const applyAnimation = ({ animation }) => {
  gsap.registerPlugin(ScrollTrigger);
  const applyAnimation = ({ anim }) => {
    // Anim = animation
    // tl = timeline to push
    // ss = save style
    let tl = [];
    if (anim) {
      // check if there are multiple animation
      if (anim instanceof Array) {
        // run multiple animation command
        anim.forEach((each_anim) => {
          // push each animation into array.
          // pushing animation = running the animation.
          const { settings, animation } = each_anim();

          let _tl = gsap.timeline(settings);
          animation.forEach((a) => {
            const k = Object.keys(a)[0];
            if (k === 'to') {
              _tl.to(...a[k]);
            } else if (k === 'from') {
              _tl.from(...a[k]);
            } else if (k === 'set') {
              _tl.set(...a[k]);
            } else if (k === 'call') {
              _tl.call(a[k]);
            }
          });

          tl.push(_tl);
        });
      }
    } else if (isFunction(anim)) {
      // pull object
      const { settings, animation } = anim();

      // push to array
      let _tl = gsap.timeline(settings);

      animation.forEach((a) => {
        const k = Object.keys(a)[0];
        if (k === 'to') {
          _tl.to(...a[k]);
        } else if (k === 'from') {
          _tl.from(...a[k]);
        } else if (k === 'set') {
          _tl.set(...a[k]);
        } else if (k === 'call') {
          _tl.call(a[k]);
        }
      });
      tl.push(_tl);
    }
    return tl;
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
        function: () => {
          //run apply animation function

          const tl = applyAnimation({
            anim: animation[p],
          });

          return () => {};
        },
      };
      stMatchMedia.push(pushData);
    });

    // RUN Scrolltrigger MatchMedia
    let mm = gsap.matchMedia();

    stMatchMedia.forEach((mediaQuery) => {
      mm.add(mediaQuery.media, mediaQuery.function);
    });

    return mm;
  } else {
    let ctx = gsap.context(() => {
      const tl = applyAnimation({ anim: animation });
    });
    return ctx;
  }
};

export default applyAnimation;
