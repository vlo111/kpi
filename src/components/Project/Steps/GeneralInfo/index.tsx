import React, { useRef } from 'react'
import AsnInput, { TextArea } from '../../../Forms/Input'
import { Form } from '../../../Forms/Form'
import styled from 'styled-components'
import { PlaceHolderDescription, VALIDATE_MESSAGES } from '../../../../helpers/constants'

export const Container = styled.div`
  background: var(--white);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--base-box-shadow);
`

const GeneralInfo: React.FC = () => {
  const refTitle = useRef(null)
  const refDescription = useRef(null)

  return (
    <Container>
      <Form
        layout="vertical"
        validateMessages={VALIDATE_MESSAGES}
      >
        <Form.Item name='Title' label="Title" rules={[{ required: true, min: 2, max: 256 }]}>
          <AsnInput ref={refTitle} placeholder="Example: AWDA" />
        </Form.Item>
        <Form.Item name='Description' label="Description" rules={[{ required: true, min: 1, max: 2048 }]}>
          <TextArea ref={refDescription} placeholder={PlaceHolderDescription}/>
        </Form.Item>
      </Form>
    </Container>
  )
}

export default GeneralInfo
