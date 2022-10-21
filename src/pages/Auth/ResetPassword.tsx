import React from 'react'
import { Typography } from 'antd'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import AnsInput, { Password } from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'

const { Title } = Typography

const RecoverPassword: React.FC = () => {
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
        <div style={{ width: 'clamp(15rem, 32vw, 30rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Title level={1} style={{ fontSize: 'var(--large-hedline-font-size)', color: 'var(--dark-border-ultramarine)', textAlign: 'center', marginBottom: '24px' }}>Reset Password</Title>
          <div style={{ fontSize: 'var(--hedline-font-size)', width: '100%', marginBottom: '32px' }}>The password should have atleast 6 characters</div>
          <Form.Item style={{ width: '100%' }} name="password" label="New Password" rules={[{ required: true }]}>
            <Password placeholder="New Password" />
          </Form.Item>
          <Form.Item style={{ width: '100%' }} name="confirm password" label="Confirm Password" rules={[{ required: true }]}>
            <AnsInput placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item style={{ width: '100%', margin: '9px' }}>
            <AnsButton style={{ height: '40px', width: '100%', fontSize: 'var(--hedline-font-size)' }} type="primary" htmlType="submit">
              Reset Password
            </AnsButton>
          </Form.Item>
        </div>
      </Form>
    </AuthLayout>
  )
}

export default RecoverPassword
