import React from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Typography } from 'antd'
import { useParams } from 'react-router-dom'

const { Title } = Typography

const ConfirmMailSignUp: React.FC = () => {
  const { email } = useParams()
  console.log(email, 'emmm')
  return (
    <AuthLayout>
      <div>
      <Title level={1}
       style={{
         fontSize: 'var(--large-hedline-font-size)',
         color: 'var(--dark-border-ultramarine)',
         textAlign: 'center',
         marginBottom: '32px'
       }}
       >
       We&apos;ve Sent An Email To
      </Title>
      <div style={ { fontSize: '24px', color: '#68A395' } }>{email}</div>
      <div style={ { fontSize: 'var(--headline-font-size)' } }>Please make sure</div>
      </div>
    </AuthLayout>
  )
}

export default ConfirmMailSignUp