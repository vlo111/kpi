import React from 'react'
import { IInput } from '../../../types/form'
import { v4 as uuidv4 } from 'uuid'
import { InputContainer } from './style'

export const Input: React.FC<IInput> = ({
  id = uuidv4(),
  label,
  placeHolder,
  onRef,
  error,
  style
}) => {
  const labelEl = (label != null) && <label htmlFor={id}>{label}</label>
  const errorEl = (error != null) && <span className="error">{error}</span>
  return (
        <InputContainer error={error ?? ''}>
        <div>
            {labelEl}
            <input placeholder={placeHolder} ref={(ref) => onRef?.(ref)} id={id} style={style}/>
            {errorEl}
        </div>
        </InputContainer>
  )
}
