import React from 'react'
import { Form } from 'antd'
import 'antd/dist/antd.css'
import { getRules } from '../../../helpers/Utils'

export const Item: any = ({ data }: any) => {
  console.log(getRules(data.type, data.label, data.min, data.max))
  return (
    <Form.Item {...data} rules={getRules(data.type, data.label, data.min, data.max) }>
      {data.children}
    </Form.Item>
  )
}
