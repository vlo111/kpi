import React, { useState } from 'react'
import Steps from './Steps'
import { CreateProject } from './CreateProject'

export const Project: React.FC = () => {
  const [step, setStep] = useState<boolean>(false)

  return (!step ? <CreateProject setStep={setStep} /> : <Steps/>)
}
