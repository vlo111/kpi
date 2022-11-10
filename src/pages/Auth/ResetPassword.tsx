import React from 'react'
import { Row, Col } from 'antd'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES, passwordErrorMessage, passwordRegExp, passwordMinMaxError } from '../../helpers/constants'
import { Password } from '../../components/Forms/Input'
import { AsnButton } from '../../components/Forms/Button'
import { TitleAuth } from '../../components/Layout/TitleAuth'
import { rulesPassword } from '../../utils/ProjectUtils'

const RecoverPassword: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    console.log(values, 'sucess')
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }
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
            <TitleAuth>
              Reset Password
            </TitleAuth>
            <div style={{ fontSize: 'var(--headline-font-size)', width: '100%', marginBottom: '32px' }}>The password should have at least 8 characters</div>
            <Form.Item
            name="password"
            label="New Password"
            {...rulesPassword({ min: 8, message: passwordMinMaxError }, { max: 64, message: passwordMinMaxError }, { pattern: passwordRegExp, message: passwordErrorMessage })}
            style={ { marginBottom: '16px' } }
            >
              <Password placeholder="New Password"/>
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
              <AsnButton className='primary' type="primary" htmlType="submit">
                Reset Password
              </AsnButton>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AuthLayout >
  )
}

export default RecoverPassword
