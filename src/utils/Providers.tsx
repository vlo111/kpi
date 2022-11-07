import React from 'react'
import { ProjectProvider } from '../hooks/project/useProject'
import { AuthProvider } from '../hooks/useAuth'
import { combineComponents } from './CombineComponents'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from '../Router'
import { RouterProvider } from 'react-router-dom'
import { GeneralInfoProvider } from '../hooks/project/useGeneralInfo'
import { ProjectInputProvider } from '../hooks/project/useProjectInput'
import { ProjectDetailsProvider } from '../hooks/project/useProjectDetails'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const providers = [
  ProjectProvider,
  ProjectDetailsProvider,
  ProjectInputProvider,
  GeneralInfoProvider,
  AuthProvider,
  () => <RouterProvider router={router} />,
  () => <QueryClientProvider client={queryClient} />
]
export const Providers = combineComponents(...providers)
