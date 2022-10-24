import React, { FC } from 'react'
import { ErrorMessage } from '../../types/pages'
import { ReactComponent as Warning } from '../../assets/icons/warning.svg'

const ErrorBackend: FC<ErrorMessage> = ({ message }) => {
  return (
    <div style={{
      background: 'rgba(234, 31, 77, 0.1)',
      border: '1px solid var(--error)',
      borderRadius: '5px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '32px'
    }}>
      < Warning style={{ paddingLeft: '14px', width: '45px', height: '45px' }} />
      <span style={{ color: 'var(--error)', fontSize: 'var(--font-size-semismall)' }}>{message}</span>
    </div>
  )
}

export default ErrorBackend