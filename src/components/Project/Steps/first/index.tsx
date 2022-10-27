import React from 'react'
import { useProject } from '../../../../hooks/useProject'

export const First: React.FC = () => {
  const { nextCurrent } = useProject()
  return (
        <div>
            first
            <button onClick={() => {
              nextCurrent(1)
            }}>next</button>
        </div>
  )
}
