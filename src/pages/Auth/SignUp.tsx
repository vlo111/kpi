import React from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import { Row, Col, message } from 'antd'
import AsnInput, { Password } from '../../components/Forms/Input'
import { AsnButton } from '../../components/Forms/Button'
import { useNavigate } from 'react-router-dom'
import { TitleAuth } from '../../components/Layout/TitleAuth'

const SignUp: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish: any = (values: { email: string, password: string, confirmPassword: string }) => {
    const { email, password, confirmPassword } = values
    console.log(values, 'success')
    if (email && (password === confirmPassword)) {
      navigate(`/confirm-email/${email}`)
    }
    if ((password !== confirmPassword)) {
      void message.error("Password and Confirm password doesn't match")
    }
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }
  return (
    <AuthLayout>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col span={8} style={ { maxWidth: '460px' } } >
            <Form
              name="signin"
              form={form}
              initialValues={{
                remember: false
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              validateMessages={VALIDATE_MESSAGES}
              layout='vertical'
            >
              <TitleAuth>Sign Up</TitleAuth>
              <Form.Item name="First Name" label="First Name" rules={[{ required: true }, { min: 3 }, { max: 128 }]}>
                <AsnInput placeholder="First Name" />
              </Form.Item>
              <Form.Item name="Last Name" label="Last Name" rules={[{ required: true }, { min: 3 }, { max: 128 }]}>
                <AsnInput placeholder="Last Name" />
              </Form.Item>
              <Form.Item name="email" label="Email Address" rules={[{ required: true }, { type: 'email' }, { max: 128 }]}>
                <AsnInput placeholder="Email Address" />
              </Form.Item>
              <Form.Item name="Organisation Name" label="Organisation" rules={[{ required: true }, { min: 2 }, { max: 128 }]}>
                <AsnInput placeholder="Organisation" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }, { min: 8 }, { max: 64 }]}>
                <Password placeholder="Password" />
              </Form.Item>
              <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true }, { min: 8 }, { max: 64 }]}>
                <Password placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item>
                <Form.Item>
                    <AsnButton className='primary' type="primary" htmlType="submit">
                     Create Account
                    </AsnButton>
                </Form.Item>
              </Form.Item>
            </Form>
          </Col>
        </Row>
    </AuthLayout >
  )
}

export default SignUp
