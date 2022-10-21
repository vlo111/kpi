import React from 'react'
import { Typography } from 'antd'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import AnsInput, { Password } from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Form } from '../../components/Forms/Form'
import ErrorBackend from '../../components/Errors/ErrorBackend'

const { Title } = Typography

const SignIn: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    console.log(values, 'success')
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }
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
        <div style={{ width: 'clamp(15rem, 32vw, 30rem)' }}>
          <Title level={1} style={{ fontSize: 'var(--large-hedline-font-size)', color: 'var(--dark-border-ultramarine)', textAlign: 'center' }}>Sign In</Title>
          <ErrorBackend message={`We have sent you an email confirmation. You need to
              confirm your email before you can login.
              Resend confirmation email.`}
          />
          <Form.Item name="email address" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
            <AnsInput placeholder="Email Address" />
          </Form.Item>
          <Form.Item style={{ margin: 0 }} name="password" label="Password" rules={[{ required: true }]}>
            <Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <a style={{
              color: 'var(--forget-password-gray)'
            }} href="/forgot-password">Forgot password?</a>
          </Form.Item>
          <Form.Item>
            <AnsButton style={{ height: '40px', width: '100%', fontSize: 'var(--hedline-font-size)' }} type="primary" htmlType="submit">
              Sign In
            </AnsButton>
          </Form.Item>
        </div>
      </Form>
    </AuthLayout >
  )
}

export default SignIn
