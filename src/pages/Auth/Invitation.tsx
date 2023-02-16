import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Row, Col, Space, message } from 'antd';

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
import { IResetPassword, ISuccessMessage } from '../../types/auth';
import useGetIntivitationResult from '../../api/UserProfile/useGetIntivitationResult';
import useGetIntivitationToken from '../../api/UserProfile/useGetIntivitationToke';
import { TitleAuth } from '../../components/Layout/TitleAuth';

const Invitation: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { mutate: invitationPasswordToken }: any = useGetIntivitationToken({
    onSuccess: () => {},
    onError: () => {
      <Navigate to={`/${PATHS.ERROR_500}`} />;
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
  const navigate = useNavigate();
  const onFinish: TVoid = (values: IResetPassword) => {
    const { password, confirmPassword } = values;
    try {
      invitationPassword({ password, repeatPassword: confirmPassword, token });
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
        if (getFieldValue('password') === value) {
          return await Promise.resolve();
        }
        throw new Error('The two passwords that you entered do not match!');
      }
    })
  ];
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8} style={{ maxWidth: '460px' }}>
        <AsnForm
          form={form}
          onFinish={onFinish}
          validateMessages={VALIDATE_MESSAGES}
          layout="vertical"
        >
          <TitleAuth>Accept Invitation</TitleAuth>
          {error.length > 0 && <AsnAlert type="error" message={error} />}
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
            <Space size="middle" style={{ width: '100%' }} direction="vertical">
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
    </Row>
  );
};

export default Invitation;
