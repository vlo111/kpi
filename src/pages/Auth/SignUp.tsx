import React from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import { Typography } from 'antd'
import AnsInput, { Password } from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const { Title } = Typography
const SignUpForm = styled(Form)`
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 15%;
`

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
            <SignUpForm
                name="signup"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={VALIDATE_MESSAGES}
                layout="vertical"
            >
                <div style={{ width: 'clamp(15rem, 32vw, 30rem)' }}>
                    <Title level={1} style={{
                      fontSize: 'var(--large-hedline-font-size)',
                      color: 'var(--dark-border-ultramarine)',
                      textAlign: 'center',
                      marginBottom: '32px'
                    }}>Sign Up</Title>
                    <Form.Item name="First Name" label="First Name" rules={[{ required: true }]}>
                        <AnsInput placeholder="First Name"/>
                    </Form.Item>
                    <Form.Item name="Last Name" label="Last Name" rules={[{ required: true }]}>
                        <AnsInput placeholder="Last Name"/>
                    </Form.Item>
                    <Form.Item name="email" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
                        <AnsInput placeholder="Email Address"/>
                    </Form.Item>
                    <Form.Item name="Organisation Name" label="Organisation Name" rules={[{ required: true }]}>
                        <AnsInput placeholder="Organisation Name"/>
                    </Form.Item>
                    <Form.Item name="password" label="Confirm Password" rules={[{ required: true }]}>
                        <Password placeholder="Password"/>
                    </Form.Item>
                    <Form.Item name="confirm password" label="Confirm Password" rules={[{ required: true }]}>
                        <Password placeholder="Confirm Password"/>
                    </Form.Item>
                    <Form.Item>
                        <AnsButton style={{ height: '40px', width: '100%', fontSize: 'var(--hedline-font-size)' }}
                                   type="primary" htmlType="submit">
                            Sign In
                        </AnsButton>
                    </Form.Item>
                </div>
            </SignUpForm>
        </AuthLayout>
  )
}

export default SignUp
