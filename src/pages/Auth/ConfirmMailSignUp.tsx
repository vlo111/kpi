import React from 'react'
import { useParams } from 'react-router-dom'
import AuthLayout from '../../components/Layout/AuthLayout'
import { Row, Col, Space } from 'antd'
import { TitleAuth } from '../../components/Layout/TitleAuth'
import { AsnButton } from '../../components/Forms/Button'
import { ReactComponent as Checked } from '../../assets/icons/checked.svg'

const ConfirmMailSignUp: React.FC = () => {
  const { email } = useParams()
  return (
    <AuthLayout>
      <Row align='middle' justify='center' style={{ minHeight: '100vh' }}>
        <Col span={8} style={{ maxWidth: '460px' }}>
          <Space direction='vertical' size={16}>
            <Row justify='start'>
              <TitleAuth style={{ minWidth: '50vw', marginBottom: '0', textAlign: 'left' }}>We&apos;ve Sent An Email To</TitleAuth>
            </Row>
            <Row justify='start' style={{ fontSize: '24px', color: '#68A395' }}>{email}</Row>
            <Row justify='start' style={{ fontSize: 'var(--headline-font-size)' }}>Please make sure</Row>
            <Row>
              <Space direction='horizontal' size={7}>
                <Checked />
                <div style={{ fontSize: 'var(--headline-font-size)' }}>You&apos;ve entered it<span style={{ color: 'var(--dark-border-ultramarine)' }}> correctly</span></div>
              </Space>
            </Row>
            <Row>
              <Space direction='horizontal' size={7}>
                <Checked />
                <div style={{ fontSize: 'var(--headline-font-size)' }}>This email is <span style={{ color: 'var(--dark-border-ultramarine)' }}>linked to your profile</span></div>
              </Space>
            </Row>
            <Row>
              <Space direction='horizontal' size={7} align='baseline'>
                <Checked />
                <div style={{ fontSize: 'var(--headline-font-size)' }}>Check your <span style={{ color: 'var(--dark-border-ultramarine)' }}>spam and notifications folders<br></br>in your inbox</span></div>
              </Space>
            </Row>
            <Row>
              <AsnButton style={{ marginTop: '41px' }} className='primary' type="primary" htmlType="submit">
                Re-Send Confirmation Email
              </AsnButton>
            </Row>
          </Space>
        </Col>
      </Row>
    </AuthLayout>
  )
}

export default ConfirmMailSignUp
