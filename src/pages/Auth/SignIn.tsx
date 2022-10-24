import React from 'react'
import { Form, Typography, Row, Col, Space } from 'antd'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import AuthLayout from '../../components/Layout/AuthLayout'

import AnsInput, { Password } from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
const { Title } = Typography

const SignIn: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {

  }
  const onFinishFailed = (values: any) => {
    console.log(values, 'values')
  }
  return (
    <AuthLayout>
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
            <Title level={2} className="text-center" justify="center" align="middle">Sign in</Title>

            <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
              <AnsInput />
            </Form.Item>
            <Form.Item name="password" label="Confirm Password" rules={[{ required: true }]}>
              <Password placeholder="Password" />
            </Form.Item>
            <a style={{ float: 'right', color: '#0B847F' }} href="/forgot-password">Forgot password?</a>
            <Form.Item>
              <Space size="middle">
                <AnsButton htmlType="submit" >
                  Sign In
                </AnsButton>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AuthLayout>
  )
}

export default SignIn
