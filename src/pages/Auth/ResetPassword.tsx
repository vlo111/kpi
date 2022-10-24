import React from 'react'
import { Row, Col } from 'antd'
import AuthLayout, { TitleAuth } from '../../components/Layout/AuthLayout'
import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import AnsInput, { Password } from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'

const RecoverPassword: React.FC = () => {
  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    console.log(values, 'success')
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
            <div style={{ fontSize: 'var(--headline-font-size)', width: '100%', marginBottom: '32px' }}>The password should have atleast 6 characters</div>
            <Form.Item name="password" label="New Password" rules={[{ required: true }]}>
              <Password placeholder="New Password" />
            </Form.Item>
            <Form.Item name="confirm password" label="Confirm Password" rules={[{ required: true }]}>
              <AnsInput placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
              <AnsButton className='primary' type="primary" htmlType="submit">
                Reset Password
              </AnsButton>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </AuthLayout >
  )
}

export default RecoverPassword
