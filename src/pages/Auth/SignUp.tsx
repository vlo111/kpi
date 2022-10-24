import React from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
// import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import { Typography, Space, Row, Col, Form } from 'antd'
import AnsInput, { Password } from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const SignUp: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish: any = (values: { email: string }) => {
    const { email } = values
    console.log(values, 'success')
    navigate(`/confirm-email/${email}`)
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
      >
        <Row type="flex" justify="center" align="middle" style={{ minHeight: '100vh' }}>

          <Col span={8} >
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
              <Title level={2} className="text-center" justify="center" align="middle">Sign Up</Title>
              <Form.Item name="First Name" label="First Name" rules={[{ required: true }]}>
                <AnsInput placeholder="First Name" />
              </Form.Item>
              <Form.Item name="Last Name" label="Last Name" rules={[{ required: true }]}>
                <AnsInput placeholder="Last Name" />
              </Form.Item>
              <Form.Item name="email" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
                <AnsInput placeholder="Email Address" />
              </Form.Item>
              <Form.Item name="Organisation Name" label="Organisation Name" rules={[{ required: true }]}>
                <AnsInput placeholder="Organisation Name" />
              </Form.Item>
              <Form.Item name="password" label="Confirm Password" rules={[{ required: true }]}>
                <Password placeholder="Password" />
              </Form.Item>
              <Form.Item name="confirm password" label="Confirm Password" rules={[{ required: true }]}>
                <Password placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item>
                <Form.Item>
                  <Space size="middle">
                    <AnsButton style={{ height: '40px', width: '100%', fontSize: 'var(--hedline-font-size)' }} type="primary" htmlType="submit">
                      Sign In
                    </AnsButton>
                  </Space>
                </Form.Item>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Form>
    </AuthLayout >
  )
}

export default SignUp
