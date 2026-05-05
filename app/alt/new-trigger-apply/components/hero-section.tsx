// @ts-nocheck
import { m } from "framer-motion"
import { fade } from "@/constants/transitions"
import Caption from "./caption"
import Line from "./line"

export default function HeroSection({ sectionClassName, lineClassName }) {
  return (
    <m.section variants={fade} className={sectionClassName}>
      <Line className={lineClassName} />
      <Caption>Scroll and Watch the Bar Moves</Caption>
    </m.section>
  )
}
