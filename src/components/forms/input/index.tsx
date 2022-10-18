import React from 'react'
import { Input } from 'antd'
import { IInput, InputType } from '../../../types/form'
import 'antd/dist/antd.css'
import { InputContainer } from './style'
import { Item } from './Item'

const { TextArea } = Input

export const ASInput: React.FC<IInput> = ({
  id,
  onRef,
  onChange,
  placeHolder,
  type,
  label,
  validatePassword,
  error,
  requiredItem = false,
  area = false
}) => {
  const password = <Input.Password
    id={id}
    onChange={onChange}
    ref={(ref) => onRef?.(ref)}
    placeholder={placeHolder}
  />

  const input = <Input
    id={id}
    onChange={onChange}
    ref={(ref) => onRef?.(ref)}
    placeholder={placeHolder}
  />

  const textarea = <TextArea onChange={onChange} placeholder={placeHolder}/>

  const children = area ? textarea : (type === InputType.Password ? password : input)

  const props = {
    label,
    name: label,
    validateStatus: error ?? '',
    validatePassword,
    help: error,
    type,
    children
  }
  // const FormItem = error
  //   ? <Form.Item label={label} name={label} rules={rules}
  //                validateStatus={error && 'error'}
  //                help={error}> {children} </Form.Item>
  //   : <Form.Item label={label} name={label} rules={rules}> {children} </Form.Item>
  return (
    <InputContainer requiredItem={requiredItem}>
      <Item data={props} />
    </InputContainer>
  )
}
