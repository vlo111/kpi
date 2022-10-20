import React, { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './router'
import { AuthProvider } from './hooks/useAuth'

import 'antd/dist/antd.min.css'

// const ReactQueryDevtoolsProduction = React.lazy(async () => {
//   return await import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
//     default: d.ReactQueryDevtools
//   }))
// }
// )

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const Root: React.FC = () => {
  const [showDevtools, setShowDevtools] = useState(false)

  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {
          showDevtools && (
            <React.Suspense fallback={null}>
              {/* <ReactQueryDevtoolsProduction /> */}
            </React.Suspense>
          )
        }
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default Root
