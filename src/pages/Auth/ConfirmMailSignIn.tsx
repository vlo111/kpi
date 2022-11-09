import React from 'react'
import styled from 'styled-components'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Row, Col } from 'antd'
import { Form } from '../../components/Forms/Form'
import { VALIDATE_MESSAGES } from '../../helpers/constants'
// import ErrorBackend from '../../components/Errors/ErrorBackend'
import AsnInput from '../../components/Forms/Input'
import { AsnButton } from '../../components/Forms/Button'
import { useNavigate } from 'react-router-dom'
import { TitleAuth } from '../../components/Layout/TitleAuth'

const ConfirmEmail: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish: any = (values: any) => {
    console.log(values, 'success')
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')
  }
  const BackSignIn = styled.div`
    font-size: var(--base-font-size);
    color:#2A5578; 
    cursor: pointer; 
    text-align: center;
    font-weight: 300;
  `
  const Description = styled.div`
    font-size: var(--headline-font-size); 
    width: 100%; 
    margin-bottom: 16px; 
    line-height: 25px;
  `
  return (
    <AuthLayout>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <TitleAuth style={{ maxWidth: '50vw' }}>Send Confirmation Email</TitleAuth>
        <Row justify="center" align="middle" style={ { width: '100%' } }>
          <Col span={8} style={{ maxWidth: '460px' }} >
            <Form
              name="signin"
              form={form}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              validateMessages={VALIDATE_MESSAGES}
              layout="vertical"
            >
              {/* <ErrorBackend message='Email confirmation link has expired. Please enter your email
                  address and we’ll send another confirmation link.' /> */}
            <Description>Enter the email address associated with your
                account and we’ll send you a link to confirm
                your email.
              </Description>
              <Form.Item
               name="email address"
               label="Email Address"
               rules={[{ required: true }, { type: 'email' }, { max: 128 }]}
               style={ { marginBottom: '32px' } }
                >
                <AsnInput placeholder="Email Address" />
              </Form.Item>
              <Form.Item style={ { marginBottom: '8px' } }>
                <AsnButton className='primary' type="primary" htmlType="submit">
                  Send Confirmation Email
                </AsnButton>
              </Form.Item>
              <BackSignIn onClick={() => navigate('/sign-in')}>Back To Sign In </BackSignIn>
            </Form>
          </Col>
        </Row>
      </div>
    </AuthLayout>
  )
}

export default ConfirmEmail
