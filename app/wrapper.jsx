'use client'

import { AppWrapper } from 'context/state'

const Wrapper = ({ children }) => {
  return <AppWrapper>{children}</AppWrapper>
}

export default Wrapper
