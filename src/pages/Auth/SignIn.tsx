import React from 'react'
import { Typography, Space } from 'antd'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import AnsInput, { Password } from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Form } from '../../components/Forms/Form'
import { ReactComponent as LogoSvg } from '../../assets/icons/logo.svg'

const { Title } = Typography

const SignIn: any = () => {
  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {

  }
  const onFinishFailed: any = (values: any) => {
    console.log(values, 'values')
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
        <div style={{ width: 'clamp(15rem, 32vw, 30rem)' }}>
          <div style={{ textAlign: 'center', marginBottom: '3vw' }}>
            <LogoSvg/>
          </div>
          <Title level={1} style={{ fontSize: 'var(--large-hedline-font-size)', color: 'var(--dark-border-ultramarine)', textAlign: 'center' }}>Sign in</Title>
          <Form.Item name="email address" label="Email Address" rules={[{ required: true }, { type: 'email' }]}>
            <AnsInput placeholder="Email Address"/>
          </Form.Item>
          <Form.Item style={{ margin: 0 }} name="password" label="Password" rules={[{ required: true }]}>
            <Password placeholder="Password"/>
          </Form.Item>
          <Form.Item>
            <a style={{
              color: 'var(--forget-password-gray)'
            }} href="/forgot-password">Forgot password?</a>
          </Form.Item>
          <Form.Item>
            <Space size="middle">
              <AnsButton style={{ height: '40px' }} type="primary" htmlType="submit">
                Sign In
              </AnsButton>
            </Space>
          </Form.Item>
        </div>
      </Form>
    </AuthLayout>
    // <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
    //     <Col span={8} >
    //         <Form
    //             name="signin"
    //             form={form}
    //             initialValues={{
    //               remember: false
    //             }}
    //             onFinish={onFinish}
    //             onFinishFailed={onFinishFailed}
    //             autoComplete="off"
    //             validateMessages={VALIDATE_MESSAGES}
    //             layout='vertical'
    //         >
    //             <Title level={2} className="text-center">Sign in</Title>
    //             <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
    //                 <AnsInput />
    //             </Form.Item>
    //             <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
    //                 <AnsInput.Password />
    //             </Form.Item>
    //             <a style={{ float: 'right', color: '#0B847F' }} href="/forgot-password">Forgot password?</a>
    //             <Form.Item>
    //                 <Space size="middle">
    //                     <AnsButton htmlType="submit" >
    //                         Sign In
    //                     </AnsButton>
    //                 </Space>
    //             </Form.Item>
    //         </Form>
    //     </Col>
    // </Row>
  )
}

export default SignIn
