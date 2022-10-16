import React from 'react'
import 'antd/dist/antd.css'
import { ButtonContainer } from './style'
import { Button } from 'antd'
import { ButtonType, IButton } from '../../../types/form'

const ButtonComponent: React.FC<IButton> = ({
  value,
  type = ButtonType.Primary,
  onClick
}) => {
  return (
        <ButtonContainer>
            <Button onClick={onClick} htmlType='submit' type={type === ButtonType.Primary ? 'primary' : 'default'}>{value}</Button>
        </ButtonContainer>
  )
}

export default ButtonComponent
