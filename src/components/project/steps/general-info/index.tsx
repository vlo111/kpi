import React from 'react'
import { Container } from './style'
import { ASInput } from '../../../forms/input'
import { Form } from 'antd'

const GeneralInfo: React.FC = () => {
  return (
    <Container>
      <Form
        name="basic"
        initialValues={{
          remember: true
        }}
        layout="vertical"
        autoComplete="off"
        onFinish={() => {}}
      >
        <ASInput requiredItem={true} label="Title" />
        <ASInput requiredItem={true} label="Description" />
      </Form>
    </Container>
  )
}

export default GeneralInfo
