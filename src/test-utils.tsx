import React from 'react'
import { render } from '@testing-library/react'
import { queryClient } from './Root'
import { QueryClientProvider } from '@tanstack/react-query'

const AllTheProviders: any = ({ children }: any) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export const customRender: any = (ui: any, options: any) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'
