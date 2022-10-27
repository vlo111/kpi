import React, { useState } from 'react'
import { ProjectSteps } from './Steps'
import { CreateProject } from './CreateProject'

export const Project: React.FC = () => {
  const [step, setStep] = useState<boolean>(false)

  return !step ? <CreateProject setStep={setStep} /> : <ProjectSteps />
}
