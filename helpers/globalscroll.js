import { useAppContext } from 'context/state';
import { useEffect } from 'react'
import { useLocomotiveScroll } from 'react-locomotive-scroll'

export default function PushScrollGlobal() {
  const { scroll } = useLocomotiveScroll();
  const appContext = useAppContext();


  useEffect(() => {
    if (scroll) {
      // pass the scroll event to context
      appContext.setScrollState(scroll);
      //Create custom window event
      //Trigger Scroll Event
      scroll.on("scroll", (e) => {
        const event = new CustomEvent('LocoScroll', { detail: e });
        window.dispatchEvent(event);
      });
      //Trigger Call Event
      scroll.on("call", (target, enter, element) => {
        const event = new CustomEvent('LocoCall', { detail: {target, enter, element} });
        window.dispatchEvent(event);
      });
    }
    return () => {
    }
  }, [scroll])
  return <></>
}
