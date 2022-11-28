import { Row, Col, Typography, Space } from 'antd'
import styled from 'styled-components'
import React from 'react'
import { Form } from '../../../components/Forms/Form'
import { Password } from '../../Forms/Input'
import { AsnButton } from '../../Forms/Button'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const CreateTemplateContainer = styled.div`
  background:var(--white);
    border-top: 3px solid var(--dark-border-ultramarine);
    box-shadow: var(--base-box-shadow);
    border-radius: 20px;
    margin: 6.3vw 9vw 0px 9vw;
  .ant-btn-icon-only{
    border-radius: 50%;
    position: absolute;
    left: 86px;
    top: 90px;
    height: 23px;
    width: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

`

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
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  ({ getFieldValue }) => ({
                    async validator (_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return await Promise.resolve()
                      }
                      return await Promise.reject(
                        new Error('The two passwords that you entered do not match!')
                      )
                    }
                  })
                ]}
              >
                <Password placeholder="Confirm New Password" />
              </Form.Item>
              </div>
              <Form.Item>
                <Space size={[40, 16]} style={{ display: 'flex', justifyContent: 'center', marginBottom: '9vh' }}>
                  <AsnButton onClick={() => navigate('/user-profile')}>Cancel</AsnButton>
                  <AsnButton type="primary" htmlType="submit" style={{ width: 'clamp(12.5rem,12vw,24rem)' }}>
                    Set Password
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
