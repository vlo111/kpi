import React from 'react'
import { ProjectProvider } from '../hooks/useProject'
import { AuthProvider } from '../hooks/useAuth'
import { combineComponents } from './CombineComponents'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from '../Router'
import { RouterProvider } from 'react-router-dom'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const providers = [
  ProjectProvider,
  AuthProvider,
  () => <RouterProvider router={router} />,
  () => <QueryClientProvider client={queryClient} />
]
export const Providers = combineComponents(...providers)
