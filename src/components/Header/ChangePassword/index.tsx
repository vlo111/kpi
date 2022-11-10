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
    background:var(--white);
    border-top: 3px solid var(--dark-border-ultramarine);
    box-shadow: var(--base-box-shadow);
    border-radius: 20px;

    .buttonContainer {
      display: flex;
      justify-content: space-around;
      width: 100%;
      grid-gap: 10px;
    }
    p{
        font-weight: var(--font-bold);
        font-size: var(--headline-font-size);
        color: var(--dark-1);
        position: relative;
        top: 32px;
        left: 32px;
        width: 37%;
    }
    .text{
        font-size: var(--base-font-size);
        color: var(--dark-2);
    }
  `
  const navigate = useNavigate()
  return (
      <CreateTemplateContainer>
        <p>Change Password</p>
        <Row justify="center" align="middle" >
          <Col span={8}>
            <Form
              name="signin"
              form={form}
              initialValues={{
                remember: false
              }}
              autoComplete="off"
              layout="vertical"
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
