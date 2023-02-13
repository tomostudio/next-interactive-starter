import { gsap } from 'gsap/dist/gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
const applyAnimation = ({ animation }) => {
  gsap.registerPlugin(ScrollTrigger);
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
    let currentTL = {};

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
          });

          return () => {
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

    // RUN Scrolltrigger MatchMedia
    let mm = gsap.matchMedia();

    stMatchMedia.forEach((mediaQuery) => {
      mm.add(mediaQuery.media, mediaQuery.function);
    });
    return mm;
  } else {
    let ctx = gsap.context(() => {
      let currentTL = {};
      currentTL[`global`] = applyAnimation({ anim: animation });
    });
    return ctx;
  }
};

export default applyAnimation;
