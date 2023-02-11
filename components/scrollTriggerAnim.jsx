import gsap from 'gsap';
export const applyAnimation = ({ anim, tl = [], ss }) => {
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
            tl[tl.length - 1].to(...a[k]);
          } else if (k === 'from') {
            tl[tl.length - 1].from(...a[k]);
          } else if (k === 'set') {
            tl[tl.length - 1].set(...a[k]);
          } else if (k === 'call') {
            tl[tl.length - 1].call(a[k]);
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
        tl[tl.length - 1].to(...a[k]);
      } else if (k === 'from') {
        tl[tl.length - 1].from(...a[k]);
      }
    });
  }
};
