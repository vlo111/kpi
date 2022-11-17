import React from 'react'

import { Form } from '../../../Forms/Form'
import styled from 'styled-components'
import { Items } from './Items'

const Collapses = styled.div`
  #dynamic_form_item > .ant-row {
    margin-bottom: 54px;
  }
  
  .footer .ant-form-item {
    margin: 0;
  }
  
  .delete-item {
    width: 100%;
    height: 100%;
    justify-content: center;
    cursor: pointer;
  }
  
  button {
    width: 100%;
    background: var(--white) !important;
    font-size: var(--base-font-size) !important;
    color: var(--dark-2) !important;
    border: 1px solid var(--dark-5) !important;
  }
  
  input {
    border: 1px solid var(--dark-5) !important;
    box-shadow: none;
    
    &:focus, &:hover {
      border: 1px solid var(--dark-5) !important;
      box-shadow: none;
    }
  }
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
