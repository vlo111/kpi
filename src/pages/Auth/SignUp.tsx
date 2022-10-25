import React from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import { Row, Col } from 'antd'
import AnsInput, { Password } from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
import { useNavigate } from 'react-router-dom'
import { TitleAuth } from '../../components/Layout/TitleAuth'

const SignUp: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish: any = (values: { email: string }) => {
    const { email } = values
    console.log(values, 'success')
    if (email) {
      navigate(`/confirm-email/${email}`)
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
                <AnsInput placeholder="First Name" />
              </Form.Item>
              <Form.Item name="Last Name" label="Last Name" rules={[{ required: true }]}>
                <AnsInput placeholder="Last Name" />
              </Form.Item>
              <Form.Item name="email" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
                <AnsInput placeholder="Email Address" />
              </Form.Item>
              <Form.Item name="Organisation Name" label="Organisation" rules={[{ required: true }]}>
                <AnsInput placeholder="Organisation" />
              </Form.Item>
              <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Password placeholder="Password" />
              </Form.Item>
              <Form.Item name="confirm password" label="Confirm Password" rules={[{ required: true }]}>
                <Password placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item>
                <Form.Item>
                    <AnsButton className='primary' type="primary" htmlType="submit">
                     Create Account
                    </AnsButton>
                </Form.Item>
              </Form.Item>
            </Form>
          </Col>
        </Row>
    </AuthLayout >
  )
}

export default SignUp
