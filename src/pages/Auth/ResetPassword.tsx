import React, { useState } from 'react';
import { Row, Col, message } from 'antd';
import AsnInput from '../../components/Forms/Input';
import AsnForm from '../../components/Forms/Form';
import { VALIDATE_MESSAGES, passwordRegExp } from '../../helpers/constants';
import AsnButton from '../../components/Forms/Button';
import { TitleAuth } from '../../components/Layout/TitleAuth';
import styled from 'styled-components';
import useResetPassword from '../../api/Auth/useResetPassword';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ErrorBeckend from '../../components/Errors/AnsAlert';

const Description = styled.div`
  font-size: var(--headline-font-size); 
  width: 100%; 
  margin-bottom: 32px;
`;

const ResetPassword: React.FC = () => {
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const [form] = AsnForm.useForm();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const { mutate: resetPassword, isLoading }: any = useResetPassword(
    {
      onSuccess: (payload: any) => {
        void message.success('sucess', 1);
        navigate('/sign-in');
      },
      onError: ({ response }: any) => { setError(response.data.message); }
    }
  );

  const onFinish: any = (values: any) => {
    const { password, confirmPassword } = values;
    try {
      resetPassword({ password, repeatPassword: confirmPassword, token });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (): void => {
    console.log('failed');
  };
  const rulesConfirmPassword = [
    {
      required: true
    },
    { min: 8, max: 64 },
    { pattern: passwordRegExp },
    ({ getFieldValue }: { getFieldValue: (name: string) => string }) => ({
      async validator (_: object, value: string) {
        if (getFieldValue('password') === value) {
          return await Promise.resolve();
        }
        return await Promise.reject(new Error('The two passwords that you entered do not match!'));
      }
    })
  ];
  return (
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={8} style={{ maxWidth: '460px' }} >
          <AsnForm
            name="signin"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={VALIDATE_MESSAGES}
            layout="vertical"
          >
            <TitleAuth>
              Reset Password
            </TitleAuth>
            {(error.length > 0) && <ErrorBeckend type="error" message={error} />}
            <Description>The password should have at least 8 characters</Description>
            <AsnForm.Item
            name="password"
            label="New Password"
            rules={[{ required: true }, { min: 8, max: 64 }, { pattern: passwordRegExp }]}
            style={ { marginBottom: '16px' } }
            >
              <AsnInput.Password placeholder="New Password"/>
            </AsnForm.Item>
            <AsnForm.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={rulesConfirmPassword}
             >
              <AsnInput.Password placeholder="Confirm Password" />
            </AsnForm.Item>
            <AsnForm.Item>
              <AsnButton className='primary' type="primary" htmlType="submit" loading={isLoading}>
                Reset Password
              </AsnButton>
            </AsnForm.Item>
          </AsnForm>
        </Col>
      </Row>
  );
};

export default ResetPassword;
