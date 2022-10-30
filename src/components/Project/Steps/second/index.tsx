import React from 'react'
import { ProjectInput } from './ProjectInput'
import InputResult from './InputResult'
import { useProject } from '../../../../hooks/useProject'

export const Second: React.FC = () => {
  const { resultArea } = useProject()

  return (
        <ProjectInput>
            <InputResult resultArea={resultArea} />
        </ProjectInput>
  )
}
