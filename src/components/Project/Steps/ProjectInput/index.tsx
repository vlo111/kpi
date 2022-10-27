import React, { useState } from 'react'
import { IResultArea } from '../../../../types/project'
import { ResultArea } from '../../../../helpers/fakeData'
import InputResult from './InputResult'

const ProjectInfo: React.FC = () => {
  const [resultArea, setResultArea] = useState<IResultArea[]>(ResultArea)

  return (
        <InputResult resultArea={resultArea} />
  )
}

export default ProjectInfo
