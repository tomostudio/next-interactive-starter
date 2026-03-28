'use client'

import { ContextWrapper } from 'context/state'

export default function Providers({ children }) {
  return <ContextWrapper>{children}</ContextWrapper>
}
