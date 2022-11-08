import React from 'react'
import { Row, Col } from 'antd'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import AuthLayout from '../../components/Layout/AuthLayout'
import AsnInput, { Password } from '../../components/Forms/Input'
import { AsnButton } from '../../components/Forms/Button'
import { Form } from '../../components/Forms/Form'
import { useNavigate } from 'react-router-dom'
import { TitleAuth } from '../../components/Layout/TitleAuth'
import { rulesPassword } from '../../utils/ProjectUtils'

const SignIn: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish: any = (values: any) => {
    console.log(values, 'values')
    const { password } = values
    console.log(/\d/.test(password))
    navigate('/confirm-email')
  }
  const onFinishFailed: any = (values: any) => {
    console.log(values, 'values')
  }
  return (

    <AuthLayout location='sign-in'>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={8} style={{ maxWidth: '460px' }} >
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
            <Form.Item name="email" label="Email Address" rules={[{ required: true }, { type: 'email' }, { max: 128 }]}>
              <AsnInput placeholder="Email Address" />
            </Form.Item>
            <Form.Item name="password" label="Password"
              {...rulesPassword(8, 128, { pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, message: 'ashxtiiiiiiiiiiiiiiiiii' })}
            >
              <Password placeholder="Password" />
            </Form.Item>
            <div style={{ color: ' #A2A2A2', fontSize: 'var(--base-font-size)', cursor: 'pointer', marginBottom: '24px' }} onClick={() => navigate('/forgot-password')}>Forgot password?</div>
            <Form.Item>
              <AsnButton type="primary" className='primary' htmlType="submit" >
                Sign In
              </AsnButton>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AuthLayout>
  )
}

export default SignIn
