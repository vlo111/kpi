import React, { useState } from 'react'
import 'antd/dist/antd.min.css'

// const ReactQueryDevtoolsProduction = React.lazy(async () => {
//   return await import('@tanstack/react-query-devtools/build/lib/index.prod.js').then((d) => ({
//     default: d.ReactQueryDevtools
//   }))
// }
// )

const Root: React.FC = () => {
  const [showDevtools, setShowDevtools] = useState(false)

  React.useEffect(() => {
    // @ts-expect-error
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <>
      {showDevtools && (
        <React.Suspense fallback={null}>
          {/* <ReactQueryDevtoolsProduction /> */}
        </React.Suspense>
      )}
    </>
  )
}

export default Root
