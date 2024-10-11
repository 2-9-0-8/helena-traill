'use client'

import { FaustProvider } from '@faustwp/experimental-app-router/ssr'

export function Providers({ children }: { children: React.ReactNode }) {
  return <FaustProvider>{children}</FaustProvider>
}