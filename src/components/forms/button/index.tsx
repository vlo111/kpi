import React from 'react'
import 'antd/dist/antd.css'
import { ButtonContainer } from './style'
import { Button } from 'antd'
import { ButtonType, IButton } from '../../../types/form'

const ButtonComponent: React.FC<IButton> = ({ value, type = ButtonType.Primary }) => {
  return (
        <ButtonContainer>
            <Button type={type === ButtonType.Primary ? 'primary' : 'default'}>{value}</Button>
        </ButtonContainer>
  )
}

export default ButtonComponent
