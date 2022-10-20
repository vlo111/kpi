import React from 'react'
import { Form, Typography, Space } from 'antd'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
import AnsInput from '../../components/Forms/Input'
import AnsButton from '../../components/Forms/Button'
import AuthLayout from '../../components/Layout/AuthLayout'

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
        initialValues={{
          remember: false
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        validateMessages={VALIDATE_MESSAGES}
        layout='vertical'
      >
        <Title level={2} className="text-center">Sign in</Title>
        <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
          <AnsInput />
        </Form.Item>
        <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
          <AnsInput.Password />
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
