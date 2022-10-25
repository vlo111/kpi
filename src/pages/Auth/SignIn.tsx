import React from 'react'
import { Row, Col } from 'antd'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import AuthLayout from '../../components/Layout/AuthLayout'
import AnsInput, { Password } from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
import { Form } from '../../components/Forms/Form'
import { useNavigate } from 'react-router-dom'
import { TitleAuth } from '../../components/Layout/TitleAuth'

const SignIn: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish: any = (values: any) => {
    console.log(values, 'values')
    navigate('/confirm-email')
  }
  const onFinishFailed: any = (values: any) => {
    console.log(values, 'values')
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
            <TitleAuth>
              Sign In
            </TitleAuth>
            <Form.Item name="email" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
              <AnsInput placeholder="Email Address" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Password placeholder="Password" />
            </Form.Item>
            <div style={{ color: ' #A2A2A2', fontSize: 'var(--base-font-size)', cursor: 'pointer', marginBottom: '24px' }} onClick={() => navigate('/forgot-password')}>Forgot password?</div>
            <Form.Item>
                <AnsButton type="primary" className='primary' htmlType="submit" >
                  Sign In
                </AnsButton>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AuthLayout>
  )
}

export default SignIn
