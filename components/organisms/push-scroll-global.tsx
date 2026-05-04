// @ts-nocheck

import { useEffect } from "react"
import { useLocomotiveScroll } from "react-locomotive-scroll"
import { useAppContext } from "@/context/state"

export default function PushScrollGlobal() {
  const { scroll } = useLocomotiveScroll()
  const { setScrollState } = useAppContext()

  useEffect(() => {
    if (!scroll) {
      return
    }

    setScrollState(scroll)

    const onScroll = (eventDetail) => {
      const event = new CustomEvent("LocoScroll", { detail: eventDetail })
      window.dispatchEvent(event)
    }

    const onCall = (target, enter, element) => {
      const event = new CustomEvent("LocoCall", {
        detail: { target, enter, element },
      })
      window.dispatchEvent(event)
    }

    scroll.on("scroll", onScroll)
    scroll.on("call", onCall)

    return () => {
      if (typeof scroll.off === "function") {
        scroll.off("scroll", onScroll)
        scroll.off("call", onCall)
      }
    }
  }, [scroll, setScrollState])

  return null
}
