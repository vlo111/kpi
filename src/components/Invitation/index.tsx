import React from 'react'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES, passwordErrorMessage, passwordMinMaxError, passwordRegExp } from '../../helpers/constants'
import { Row, Col, Typography } from 'antd'

import { Password } from '../../components/Forms/Input'
import { AsnButton } from '../../components/Forms/Button'
import { TitleAuth } from '../../components/Layout/TitleAuth'
import { rulesPassword } from '../../utils/ProjectUtils'

const Inivation: React.FC = () => {
  const [form] = Form.useForm()
  const { Paragraph } = Typography

  const onFinish: any = (values: { email: string, password: string, confirmPassword: string }) => {
    const { password, confirmPassword } = values
    console.log(password || confirmPassword)
    console.log(values, 'success')
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }
  const rulesConfirmPassword = [
    {
      required: true
    },
    { min: 8, message: passwordMinMaxError },
    { max: 64, message: passwordErrorMessage },
    { pattern: passwordRegExp, message: passwordErrorMessage },
    ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
      async validator (_: object, value: string) {
        if (!value || getFieldValue('password') === value) {
          return await Promise.resolve()
        }
        return await Promise.reject(new Error('The two passwords that you entered do not match!'))
      }
    })
  ]
  const marginInput = { marginBottom: '32px' }
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
              <TitleAuth >Accept Invitation</TitleAuth>
              <Paragraph style={{ fontSize: 'var(--headline-font-size)', color: '#424242' }}>Simply enter the password to use for your new account below and we will set it for you. Your username will be your email address.  </Paragraph>

              <Form.Item
               name="password"
               label="Password"
               {...rulesPassword({ min: 8, message: passwordMinMaxError }, { max: 64, message: passwordMinMaxError }, { pattern: passwordRegExp, message: passwordErrorMessage })}
               style={ { ...marginInput } }
               >
                <Password placeholder="Enter Password" />
              </Form.Item>
              <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={rulesConfirmPassword}
              style={ { ...marginInput } }
              >
                <Password placeholder="Confirm Password" />
              </Form.Item>
              <Form.Item>
                <Form.Item>
                    <AsnButton className='primary' type="primary" htmlType="submit">
                     Submit
                    </AsnButton>
                </Form.Item>
              </Form.Item>
            </Form>
          </Col>
        </Row>
    </AuthLayout >
  )
}

export default Inivation
