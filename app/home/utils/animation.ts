// @ts-nocheck
export const animationObj = {
  "(min-width: 751px)": [
    () => ({
      id: "home-desktop",
      elem: ".scrollsection .line",
      settings: {
        scrollTrigger: {
          id: "home-desktop",
          trigger: ".scrollsection",
          scroller: "#scroll-container",
          scrub: true,
          start: "top 0%",
          end: "+=100%",
        },
      },
      animation: [
        {
          set: [
            ".scrollsection .line",
            {
              background: "rgba(253, 230, 138, 1)",
            },
          ],
        },
        {
          to: [
            ".scrollsection .line",
            {
              scaleX: 0,
              transformOrigin: "left center",
              background: "rgba(253, 230, 138, 0)",
              ease: "none",
              duration: 1,
            },
            0,
          ],
        },
      ],
    }),
  ],
  "(max-width: 750px)": [
    () => ({
      id: "home-mobile",
      elem: ".scrollsection .line",
      settings: {
        scrollTrigger: {
          id: "home-mobile",
          trigger: ".scrollsection",
          scroller: "#scroll-container",
          scrub: true,
          start: "top 0%",
          end: "+=100%",
        },
      },
      animation: [
        {
          set: [
            ".scrollsection .line",
            {
              background: "rgba(253, 230, 138, 0)",
            },
          ],
        },
        {
          to: [
            ".scrollsection .line",
            {
              scaleX: 0,
              transformOrigin: "left center",
              background: "rgba(253, 230, 138, 1)",
              ease: "none",
              duration: 2,
            },
            0,
          ],
        },
      ],
    }),
  ],
}
