import React from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Typography } from 'antd'
import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import ErrorBackend from '../../components/Errors/ErrorBackend'
import AnsInput from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const ConfirmEmail: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    console.log(values, 'success')
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
                style={{ paddingTop: '17vh', display: 'flex', alignItems: 'center', flexDirection: 'column' }}
            >
                  <Title level={1}
                    style={{
                      fontSize: 'var(--large-hedline-font-size)',
                      color: 'var(--dark-border-ultramarine)',
                      textAlign: 'center',
                      marginBottom: '32px'
                    }}>
                    Send Confirmation Email
                </Title>
                <div style={{ width: 'clamp(15rem, 32vw, 30rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ErrorBackend message='Email confirmation link has expired. Please enter your email
                  address and we’ll send another confirmation link.' />
                    <div style={{ fontSize: 'var(--headline-font-size)', width: '100%', marginBottom: '20px' }}>Enter the email address associated with your
                     account and we’ll send you a link to confirm
                     your email.
                    </div>
                    <Form.Item style={{ width: '100%' }} name="email address" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
                      <AnsInput placeholder="Email Address" />
                    </Form.Item>
                    <Form.Item style={{ width: '100%', margin: '9px' }}>
                      <AnsButton style={{ width: '100%', fontSize: 'var(--headline-font-size)' }} type="primary" htmlType="submit">
                        Send Confirmation Email
                      </AnsButton>
                    </Form.Item>
                    <div style={{ fontSize: 'var(----base-font-size)', color: '#2A5578', cursor: 'pointer' }} onClick={() => navigate('/sign-in')}>Back To Sign In </div>
                  </div>
            </Form>
        </AuthLayout>
  )
}

export default ConfirmEmail
