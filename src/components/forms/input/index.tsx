import React from 'react'
import { Form, Input } from 'antd'
import { IInput, InputType } from '../../../types/form'
import 'antd/dist/antd.css'
import { InputContainer } from './style'

const InputComponent: React.FC<IInput> = ({ placeHolder, type, label, validatePassword }) => {
  const passwordRules = [{
    required: true,
    message: 'Please input your password!'
  },
  validatePassword ? { min: 5, message: 'Password must be minimum 5 characters.' } : {}]

  const emailRules = [{
    required: true,
    type: 'email',
    message: 'The input is not valid E-mail!'
  }]

  const defaultRules = [{
    required: true,
    message: `The input is not valid ${label ?? ''}!`
  }]

  const rules = type === InputType.Password ? passwordRules : type === InputType.Email ? emailRules : defaultRules

  return (
        <InputContainer>
            <Form.Item
                label={label}
                name={label}
                rules={rules}
            >
                {type === InputType.Password
                  ? <Input.Password placeholder={placeHolder}/>
                  : <Input placeholder={placeHolder}/>}
            </Form.Item>
        </InputContainer>
  )
}

export default InputComponent
