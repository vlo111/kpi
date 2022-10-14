import React from 'react'
import { Input } from 'antd'
import { IInput } from '../../../types/form'

export const Input1: React.FC<IInput> = ({ placeHolder }) => {
  return (
        <div>
            <Input placeholder={placeHolder} />
        </div>
  )
}
