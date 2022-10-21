import React from 'react'
import { Typography } from 'antd'
import AuthLayout from '../../components/Layout/AuthLayout'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import { ReactComponent as Key } from '../../assets/icons/forgot.svg'
import { Form } from '../../components/Forms/Form'
import AnsInput from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    console.log(values, 'success')
    navigate('/reset-password')
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }
  const navigate = useNavigate()
  return (
    <AuthLayout>
      <Form
        name="signin"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={VALIDATE_MESSAGES}
        layout="vertical"
        style={{ paddingTop: '17vh' }}
      >
        <div style={{ width: 'clamp(15rem, 32vw, 30rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Key style={{ marginBottom: '32px' }} />
          <Title level={1} style={{ fontSize: 'var(--large-hedline-font-size)', color: 'var(--dark-border-ultramarine)', textAlign: 'center', marginBottom: '32px' }}>Forgot Password</Title>
          <div style={{ fontSize: 'var(--hedline-font-size)', width: '100%', marginBottom: '32px' }}>Please enter the email you use to sign in to Meetk.</div>
          <Form.Item style={{ width: '100%' }} name="email address" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
            <AnsInput placeholder="Email Address" />
          </Form.Item>
          <Form.Item style={{ width: '100%', margin: '9px' }}>
            <AnsButton style={{ height: '40px', width: '100%', fontSize: 'var(--hedline-font-size)' }} type="primary" htmlType="submit">
              Reset Password
            </AnsButton>
          </Form.Item>
          <div style={{ fontSize: 'var(----base-font-size)', color: '#2A5578', cursor: 'pointer' }} onClick={() => navigate('/sign-in')}>Back To Sign In </div>
        </div>
      </Form>
    </AuthLayout >
  )
}

export default ForgotPassword
