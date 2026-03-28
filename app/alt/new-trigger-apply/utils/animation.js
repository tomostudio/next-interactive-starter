export const animationObj = {
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
