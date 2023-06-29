import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { Row, Col, Space, message, Typography } from 'antd';

import { AsnInput } from '../../components/Forms/Input';
import { AsnForm } from '../../components/Forms/Form';
import { AsnButton } from '../../components/Forms/Button';
import { AsnAlert } from '../../components/Forms/Alert';
import { TVoid } from '../../types/global';
import {
  passwordRegExp,
  VALIDATE_MESSAGES,
  PATHS
} from '../../helpers/constants';
import {
  IResetPassword,
  ISuccessMessage,
  ITokenMessage
} from '../../types/auth';
import useGetIntivitationResult from '../../api/UserProfile/useGetIntivitationResult';
import useGetIntivitationToken from '../../api/UserProfile/useGetIntivitationToke';
import { TitleAuth } from '../../components/Layout/TitleAuth';

import { ReactComponent as NotAccessSvg } from '../../assets/icons/error_404.svg';

const { Title } = Typography;

const NotAccessContent = styled(Space)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-space-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h5,
  h3 {
    color: var(--dark-1);
    font-size: 20px;
    font-weight: var(--font-normal);
  }
  h5 {
    font-size: 14px !important;
  }
`;

const Invitation: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [errorToken, setErrorToken] = useState<string>('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const { mutate: invitationPasswordToken }: any = useGetIntivitationToken({
    onSuccess: () => {},
    onError: (error: ITokenMessage) => {
      setErrorToken(error.response.data.message);
    }
  });
  useEffect(() => {
    if (token != null) {
      invitationPasswordToken({ token });
    }
  }, [token]);

  const { mutate: invitationPassword, isLoading }: any =
    useGetIntivitationResult({
      onSuccess: ({ data }: ISuccessMessage) => {
        void message.success(data.result, 2);
        navigate(`/${PATHS.SIGNIN}`);
      },
      onError: ({ response }: any) => {
        setError(response.data.message);
      }
    });
  const [form] = AsnForm.useForm();
  const onFinish: TVoid = (values: IResetPassword) => {
    const { password, confirmPassword } = values;
    invitationPassword({ password, repeatPassword: confirmPassword, token });
  };

  const rulesConfirmPassword = [
    {
      required: true
    },
    { min: 8, max: 16 },
    { pattern: passwordRegExp },
    ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
      async validator (_: object, value: string) {
        if (getFieldValue('password') === value) {
          return await Promise.resolve();
        }
        throw new Error('The two passwords that you entered do not match!');
      }
    })
  ];

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      {(token === null || errorToken === 'Invalid token') && (
        <NotAccessContent direction="vertical">
          <NotAccessSvg />
          <Title level={3}>We are sorry,</Title>
          <Title level={5}>but the invitation is expired.</Title>
        </NotAccessContent>
      )}
      {token !== null && errorToken !== 'Invalid token' && (
        <Col span={8} style={{ maxWidth: '460px' }}>
          <AsnForm
            form={form}
            onFinish={onFinish}
            validateMessages={VALIDATE_MESSAGES}
            layout="vertical"
          >
            <TitleAuth>Accept Invitation</TitleAuth>
            {error?.length > 0 && <AsnAlert type="error" message={error} />}
            <AsnForm.Item
              name="password"
              label="New password"
              rules={[
                { required: true },
                { min: 8, max: 16 },
                { pattern: passwordRegExp }
              ]}
            >
              <AsnInput.Password placeholder="New password" />
            </AsnForm.Item>
            <AsnForm.Item
              name="confirmPassword"
              label="Confirm New Password"
              rules={rulesConfirmPassword}
            >
              <AsnInput.Password placeholder="Confirm New Password" />
            </AsnForm.Item>
            <AsnForm.Item>
              <Space
                size="middle"
                style={{ width: '100%' }}
                direction="vertical"
              >
                <AsnButton
                  htmlType="submit"
                  className="primary"
                  style={{ width: '100%' }}
                  loading={isLoading}
                >
                  Submit
                </AsnButton>
              </Space>
            </AsnForm.Item>
          </AsnForm>
        </Col>
      )}
    </Row>
  );
};

export default Invitation;
