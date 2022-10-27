import React from 'react'
import { useProject } from '../../../../hooks/useProject'

export const Second: React.FC = () => {
  const { prevCurrent } = useProject()
  return (
        <div>
            Second
            <button onClick={() => {
              prevCurrent(0)
            }}>prev</button>
        </div>
  )
}
