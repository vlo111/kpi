import React, { useRef } from 'react'
import { Container } from './style'
import { PlaceHolderDescription, ValidateMessages } from '../../../../data/projects'
import AsnInput, { TextArea } from '../../../forms/input'
import { Form } from '../../../forms/form'

const GeneralInfo: React.FC = () => {
  const refTitle = useRef(null)
  const refDescription = useRef(null)

  return (
    <Container>
      <Form
        layout="vertical"
        validateMessages={ValidateMessages}
      >
        <Form.Item name='Title' label="Title" rules={[{ required: true, min: 5, max: 8 }]}>
          <AsnInput ref={refTitle} placeholder={PlaceHolderDescription} />
        </Form.Item>
        <Form.Item name='Description' label="Description" rules={[{ required: true, min: 5, max: 8 }]}>
          <TextArea ref={refDescription} placeholder={PlaceHolderDescription}/>
        </Form.Item>
      </Form>
    </Container>
  )
}

export default GeneralInfo
