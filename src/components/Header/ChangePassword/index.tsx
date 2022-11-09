import styled from 'styled-components'
import { Row, Col } from 'antd'
import React from 'react'
import { Form } from '../../../components/Forms/Form'
import { Password } from '../../Forms/Input'
import { AsnButton } from '../../Forms/Button'
import { useNavigate } from 'react-router-dom'

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm()
  const CreateTemplateContainer = styled.div`
    background: #ffffff;
    border-top: 3px solid #2a5578;
    box-shadow: -4px -4px 4px rgba(42, 85, 120, 0.05),
    4px 4px 4px rgba(42, 85, 120, 0.05);
    border-radius: 20px;
    height: calc(100% - 150px);
    .buttonContainer {
      display: flex;
      justify-content: space-around;
      width: 100%;
      position: relative;
      top: 36px;
    }
    p{
        font-weight: 700;
        font-size: 20px;
        line-height: 25px;
        color: #111B23;
        position: relative;
        top: 32px;
        left: 32px;
        width: 37%;
    }
    .text{
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: #263238;
    }
  `
  const navigate = useNavigate()
  return (
      <CreateTemplateContainer>
        <p>Change Password</p>
        <Row justify="center" align="middle" style={{ minHeight: '60vh', minWidth: '530px' }}>
          <Col span={8} style={{ maxWidth: '460px' }}>
            <Form
              name="signin"
              form={form}
              initialValues={{
                remember: false
              }}
              autoComplete="off"
              layout="vertical"
              style={{ width: '460px' }}
            >
                 <Form.Item
                name="Old Password"
                label="Old Password"
                rules={[{ required: true }, { min: 8 }, { max: 64 }]}
              >
                <Password placeholder="Old Password" />
              </Form.Item>
              <Form.Item>
              <span className='text'>Your password must be at least 8 characters, must contain one number and one letter. The password cannot  match your email address.</span>
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
              <Form.Item>
                <div className="buttonContainer">
                  <AsnButton onClick={() => navigate('/user-profile')}>Cancel</AsnButton>
                  <AsnButton type="primary" htmlType="submit">
                    Save changes
                  </AsnButton>
                </div>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </CreateTemplateContainer>
  )
}

export default ChangePassword
