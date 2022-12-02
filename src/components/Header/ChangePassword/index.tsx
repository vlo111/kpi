import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Typography, Space, message } from 'antd';
import styled from 'styled-components';

import AsnInput from '../../Forms/Input';
import AsnForm from '../../Forms/Form';
import AsnButton from '../../Forms/Button';
import { AsnAlert } from '../../Forms/Alert';
import { TVoid } from '../../../types/global';
import { passwordRegExp, VALIDATE_MESSAGES, PATHS } from '../../../helpers/constants';
import { ISuccessMessage } from '../../../types/auth';
import useChangePassword from '../../../api/UserProfile/useChangePassword';

const { Title } = Typography;

const CreateTemplateContainer = styled.div`
  background:var(--white);
    border-top: 3px solid var(--dark-border-ultramarine);
    box-shadow: var(--base-box-shadow);
    border-radius: 20px;
    margin: 6.3vw 9vw 0px 9vw;
`;

const ChangePassword: React.FC = () => {
  const [error, setError] = useState<string>('');
  const { mutate: changePassword, isLoading }: any = useChangePassword(
    {
      onSuccess: ({ data }: ISuccessMessage) => {
        void message.success(data?.result, 2);
        navigate(`/${PATHS.USERPROFILE}`);
      },
      onError: ({ response }: any) => { setError(response.data.message); }
    }
  );
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();
  const onFinish: TVoid = (values) => {
    try {
      changePassword(values);
    } catch (error: any) {
      void message.error(error, 2);
    }
  };
  const rulesConfirmPassword = [
    {
      required: true
    },
    { min: 8, max: 16 },
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
          {(error.length > 0) && <AsnAlert type="error" message={error} />}
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
                rules={[{ required: true }, { min: 8, max: 16 }, { pattern: passwordRegExp }]}
              >
                <AsnInput.Password placeholder="Old Password" />
              </AsnForm.Item>
              <AsnForm.Item
                name="newPassword"
                label="New password"
                rules={[{ required: true }, { min: 8, max: 16 }, { pattern: passwordRegExp }]}
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
                  <AsnButton onClick={() => navigate(`/${PATHS.USERPROFILE}`)}>Cancel</AsnButton>
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
