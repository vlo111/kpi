import React, { useRef, useState } from 'react'
import { Container } from './style'
import { ASInput } from '../../../forms/input'
import { Form } from 'antd'
import { InputRef, RefInput, UInputRef } from '../../../../types/form'
import { PlaceHolderDescription } from '../../../../data/projects'
import { ValidateProjectFirstStep } from '../../../../helpers/Validation'

interface IError {
  title: string
  description: string
}

const initialError = {
  title: '',
  description: ''
}

const GeneralInfo: React.FC = () => {
  const refTitle: RefInput = useRef(null)
  const refDescription: RefInput = useRef(null)
  const [error, setError] = useState<IError>(initialError)
  const onChange: (item: string) => void = (item: string) => {
    const title = (refTitle as InputRef).current?.input.value ?? ''
    const description = (refDescription as InputRef).current?.input.value ?? ''

    // let errorDescription = ''
    //
    // if (description.length < 10) {
    //   errorDescription = 'need to be > 10'
    // } else {
    //   errorDescription = ''
    // }
    //
    // setError({
    //   ...error,
    //   [item]: item === 'title' ? title : errorDescription
    // })
    // const err = { description, title }

    switch (item) {
      case 'description': {
        break
      }
    }

    // const [titleError, descriptionError] = ValidateProjectFirstStep(title, description)

    // if (title.length > 2 && title.length < 256) {
    //
    // }
  }
  return (
    <Container>
      <Form
        name="basic"
        initialValues={{
          remember: true
        }}
        layout="vertical"
        autoComplete="off"
        onFinish={() => {
        }}
      >
        <ASInput
          onRef={(ref: UInputRef) => {
            refTitle.current = ref
          }}
          requiredItem={true}
          label="Title"
          placeHolder="Example: AWDA"
          error={error?.title}
          onChange={() => onChange('title')}
        />
        <ASInput
          onRef={(ref: UInputRef) => {
            refDescription.current = ref
          }}
          area={true}
          requiredItem={true}
          label="Description"
          placeHolder={PlaceHolderDescription}
          error={error?.description}
          onChange={() => onChange('description')}
        />
      </Form>
    </Container>
  )
}

export default GeneralInfo
