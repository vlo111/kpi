import React from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES, passwordErrorMessage, passwordMinMaxError, passwordRegExp } from '../../helpers/constants'
import { Row, Col, message } from 'antd'
import AsnInput, { Password } from '../../components/Forms/Input'
import { AsnButton } from '../../components/Forms/Button'
import { useNavigate } from 'react-router-dom'
import { TitleAuth } from '../../components/Layout/TitleAuth'
import { rules, rulesPassword } from '../../utils/ProjectUtils'

const SignUp: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish: any = (values: { email: string, password: string, confirmPassword: string }) => {
    const { email, password, confirmPassword } = values
    console.log(password === email || confirmPassword === email)
    if (password === email || confirmPassword === email) {
      void message.error('password and email can not match', 1)
    }
    if (password !== email && confirmPassword !== email) {
      navigate(`/confirm-email/${email}`)
    }
    console.log(values, 'success')
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }
  return (
    <AuthLayout location='sign-up'>
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
              <Form.Item
              name="First Name"
              label="First Name"
              {...rules(3, 128)}
              style={ { marginBottom: '32px' } }
              >
                <AsnInput placeholder="First Name" />
              </Form.Item>
              <Form.Item
              name="Last Name"
               label="Last Name"
                {...rules(3, 128)}
                style={ { marginBottom: '32px' } }
                >
                <AsnInput placeholder="Last Name" />
              </Form.Item>
              <Form.Item
               name="email"
                label="Email Address"
                 rules={[{ required: true }, { type: 'email' }, { max: 128 }]}
                 style={ { marginBottom: '32px' } }
                 >
                <AsnInput placeholder="Email Address" />
              </Form.Item>
              <Form.Item
               name="Organisation Name"
                label="Organisation"
                 {...rules(2, 128)}
                 style={ { marginBottom: '32px' } }
                 >
                <AsnInput placeholder="Organisation" />
              </Form.Item>
              <Form.Item
               name="password"
               label="Password"
               {...rulesPassword({ min: 8, message: passwordMinMaxError }, { max: 64, message: passwordMinMaxError }, { pattern: passwordRegExp, message: passwordErrorMessage })}
               style={ { marginBottom: '32px' } }
               >
                <Password placeholder="Password" />
              </Form.Item>
              <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                {
                  required: true
                },
                { min: 8, message: passwordMinMaxError },
                { max: 64, message: passwordErrorMessage },
                { pattern: passwordRegExp, message: passwordErrorMessage },
                ({ getFieldValue }) => ({
                  async validator (_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return await Promise.resolve()
                    }
                    return await Promise.reject(new Error('The two passwords that you entered do not match!'))
                  }
                })
              ]}
              style={ { marginBottom: '32px' } }
              >
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
