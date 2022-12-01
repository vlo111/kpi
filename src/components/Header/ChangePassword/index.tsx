import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Space, message } from 'antd';
import styled from 'styled-components';
import get from 'lodash/get';

import useChangePassword from '../../../api/UserProfile/useChangePassword';
import { TVoid } from '../../../types/global';
import { passwordRegExp, VALIDATE_MESSAGES } from '../../../helpers/constants';
import AsnForm from '../../Forms/Form';
import AsnButton from '../../Forms/Button';
import AsnInput from '../../Forms/Input';

const { Title } = Typography;

const CreateTemplateContainer = styled.div`
  background:var(--white);
    border-top: 3px solid var(--dark-border-ultramarine);
    box-shadow: var(--base-box-shadow);
    border-radius: 20px;
    margin: 6.3vw 9vw 0px 9vw;
`;

const ChangePassword: React.FC = () => {
  const { mutate: changePassword, isLoading }: any = useChangePassword(
    {
      onSuccess: (data: any) => {
        console.log(data, 'data');
        void message.success('sucess', 2);
      },
      onError: ({ response }: any) => { console.log(response, 'resss'); }
    }
  );
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();
  const onFinish: TVoid = (values) => {
    try {
      changePassword(values);
    } catch (error) {
      const errorMessage = get(error, 'error.message', 'Something went wrong!');
      void message.error(errorMessage);
    }
  };
  const rulesConfirmPassword = [
    {
      required: true
    },
    { min: 8, max: 64 },
    { pattern: passwordRegExp },
    ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
      async validator (_: object, value: string) {
        if (getFieldValue('newPassword') === value) {
          return await Promise.resolve();
        }
        return await Promise.reject(new Error('The two passwords that you entered do not match!'));
      }
    })
  ];
  return (
    <CreateTemplateContainer>
        <Title level={4} style={{ color: 'var(--dark-1)', padding: '3vh 3vw' }}>Change Password</Title>
        <Row justify="center" align="middle" >
          <Col span={8}>
            <AsnForm
              form={form}
              initialValues={{
                remember: false
              }}
              autoComplete="off"
              layout="vertical"
              onFinish={onFinish}
              validateMessages={VALIDATE_MESSAGES}
            ><div style={{ marginBottom: '6vh' }}>
              <AsnForm.Item
                name="oldPassword"
                label="Old Password"
                rules={[{ required: true }, { min: 8, max: 64 }, { pattern: passwordRegExp }]}
              >
                <AsnInput.Password placeholder="Old Password" />
              </AsnForm.Item>
              <AsnForm.Item>
              <Title level={5} style={{ color: 'var(--dark-2)' }}>Your password must be at least 8 characters, must contain one number and one letter. The password cannot  match your email address.</Title>
              </AsnForm.Item>
              <AsnForm.Item
                name="newPassword"
                label="New password"
                rules={[{ required: true }, { min: 8, max: 64 }, { pattern: passwordRegExp }]}
              >
                <AsnInput.Password placeholder="New password" />
              </AsnForm.Item>
              <AsnForm.Item
                name="repeatPassword"
                label="Confirm New Password"
                rules={rulesConfirmPassword}
              >
                <AsnInput.Password placeholder="Confirm New Password" />
              </AsnForm.Item>
              </div>
              <AsnForm.Item>
                <Space size={[40, 16]} style={{ display: 'flex', justifyContent: 'center', marginBottom: '9vh' }}>
                  <AsnButton onClick={() => navigate('/user-profile')}>Cancel</AsnButton>
                  <AsnButton type="primary" htmlType="submit" style={{ width: 'clamp(12.5rem,12vw,24rem)' }} loading={isLoading}>
                    Set Password
                  </AsnButton>
                </Space>
              </AsnForm.Item>
            </AsnForm>
          </Col>
        </Row>
        </CreateTemplateContainer>
  );
};
export default ChangePassword;
