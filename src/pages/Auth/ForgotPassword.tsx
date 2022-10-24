import React from 'react'
import { Row, Col } from 'antd'
import AuthLayout, { TitleAuth } from '../../components/Layout/AuthLayout'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import { ReactComponent as Key } from '../../assets/icons/forgot.svg'
import { Form } from '../../components/Forms/Form'
import AnsInput from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
import { useNavigate } from 'react-router-dom'

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
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={8} style={{ maxWidth: '460px' }} >
          <Form
            name="signin"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={VALIDATE_MESSAGES}
            layout="vertical"
          >
            <Key style={{ width: '100%', marginBottom: '24px' }} />
            <TitleAuth>Forget Password</TitleAuth>
            <div style={{ fontSize: 'var(--headline-font-size)', width: '100%', marginBottom: '24px' }}>Please enter the email you use to sign in to Meetk.</div>
            <Form.Item name="email address" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
              <AnsInput placeholder="Email Address" />
            </Form.Item>
            <Form.Item>
              <AnsButton className='primary' type="primary" htmlType="submit">
                Reset Password
              </AnsButton>
            </Form.Item>
            <div style={{ fontSize: 'var(--base-font-size)', color: '#2A5578', cursor: 'pointer', textAlign: 'center' }} onClick={() => navigate('/sign-in')}>Back To Sign In </div>
          </Form>
        </Col>
      </Row>
    </AuthLayout >
  )
}

export default ForgotPassword
