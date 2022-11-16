import { Row, Col, Typography, Space } from 'antd'
import React from 'react'
import { Form } from '../../../components/Forms/Form'
import { Password } from '../../Forms/Input'
import { AsnButton } from '../../Forms/Button'
import { useNavigate } from 'react-router-dom'
import { CreateTemplateContainer } from '../../Forms/UserProfile'

const { Title } = Typography

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  return (
      <CreateTemplateContainer>
        <Title level={4} style={{ color: 'var(--dark-1)', padding: '3vh 3vw' }}>Change Password</Title>
        <Row justify="center" align="middle" >
          <Col span={8}>
            <Form
              form={form}
              initialValues={{
                remember: false
              }}
              autoComplete="off"
              layout="vertical"
            ><div style={{ marginBottom: '6vh' }}>
              <Form.Item
                name="Old Password"
                label="Old Password"
                rules={[{ required: true }, { min: 8 }, { max: 64 }]}
              >
                <Password placeholder="Old Password" />
              </Form.Item>
              <Form.Item>
              <Title level={5} style={{ color: 'var(--dark-2)' }}>Your password must be at least 8 characters, must contain one number and one letter. The password cannot  match your email address.</Title>
              </Form.Item>
              <Form.Item
                name="New password"
                label="New password"
                rules={[{ required: true }, { min: 8 }, { max: 64 }]}
              >
                <Password placeholder="New password" />
              </Form.Item>
              <Form.Item
                name="Confirm New Password"
                label="Confirm New Password"
                rules={[{ required: true }, { min: 8 }, { max: 64 }]}
              >
                <Password placeholder="Confirm New Password" />
              </Form.Item>
              </div>
              <Form.Item>
                <Space style={{ display: 'flex', justifyContent: 'center', marginBottom: '9vh' }}>
                  <AsnButton onClick={() => navigate('/user-profile')}>Cancel</AsnButton>
                  <AsnButton type="primary" htmlType="submit" style={{ width: 'clamp(14rem,17vw,24rem)' }}>
                    Save changes
                  </AsnButton>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </CreateTemplateContainer>
  )
}

export default ChangePassword
