import { m } from 'framer-motion'
import { fade } from '@/helpers/preset/transitions'

import Line from '../atoms/line'
import Caption from '../molecules/caption'

export default function HeroSection({ sectionClassName, lineClassName }) {
  return (
    <m.section variants={fade} className={sectionClassName}>
      <Line className={lineClassName} />
      <Caption>Scroll and Watch the Bar Moves</Caption>
    </m.section>
  )
}
