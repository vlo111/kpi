import React from 'react'

import { Form } from '../../../Forms/Form'
import styled from 'styled-components'
import { Items } from './Items'

const Collapses = styled.div`
`

export const Last: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    console.log(values, 'finish')
    // publish
  }

  return (
    <Collapses>
      <Form form={form} name="dynamic_form_item" onFinish={onFinish}>
        <Items name={'Organisations'}/>
        <Items name={'Regions'}/>
        <Items name={'Sectors'}/>
      </Form>
    </Collapses>
  )
}
