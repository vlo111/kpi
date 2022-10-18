import React, { useState } from 'react'
import { ReactComponent as CreateProjectSvg } from '../../assets/icons/create-project.svg'
import { Container } from './style'
import Steps from './steps'

export const Project: React.FC = () => {
  const [step, setStep] = useState<boolean>(false)

  return (
    !step
      ? (<Container onClick={() => setStep(!step)}> <CreateProjectSvg/> <span className="create-project-text">Create your first project</span> </Container>)
      : <Steps/>
  )
}
