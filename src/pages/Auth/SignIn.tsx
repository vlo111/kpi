import React from 'react';
import { Row, Col, message } from 'antd';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import get from 'lodash/get';
import { useAuth } from '../../hooks/useAuth';

import { PATHS, VALIDATE_MESSAGES } from '../../helpers/constants';
import AsnInput from '../../components/Forms/Input';
import AsnButton from '../../components/Forms/Button';
import useSignInApi from '../../api/Auth/useSignInApi';
import { TitleAuth } from '../../components/Layout/TitleAuth';
import AsnForm from '../../components/Forms/Form';

const ForgotPassword = styled.div`
  color: var(--forget-password-gray); 
  font-size: var(--base-font-size);
  cursor: pointer;
  margin-bottom: 24px;
`;
const SignIn: React.FC = () => {
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();
  const { login, isToken } = useAuth();
  const { mutate: signIn, isLoading }: any = useSignInApi(
    {
      onSuccess: (payload: { data: { id: string, firstName: string, lastName: string, email: string, accessToken: string } }) => {
        const { id, firstName, lastName, email, accessToken } = payload.data;
        login({
          id,
          firstName,
          lastName,
          email
        });
        isToken(accessToken);
        navigate(PATHS.ROOT);
      },
      onError: ({ response }: any) => { console.log(response.data.message, 'error'); }
    }
  );
  const onFinish: any = (values: any) => {
    try {
      console.log(values);
      signIn(values);
    } catch (error) {
      const errorMessage = get(error, 'error.message', 'Something went wrong!');
      void message.error(errorMessage);
    }
  };
  const onFinishFailed = (): void => {
    console.log('error');
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8} style={{ maxWidth: '460px' }}>
        <AsnForm
          name="signin"
          form={form}
          initialValues={{
            remember: false
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={VALIDATE_MESSAGES}
          layout="vertical"
        >
          <TitleAuth>
            Sign In
          </TitleAuth>
          <AsnForm.Item
            name="email"
            label="Email Address"
            rules={[{ required: true }, { type: 'email' }, { max: 128 }]}
          >
            <AsnInput placeholder="Email Address" />
          </AsnForm.Item>
          <AsnForm.Item name="password" label="Password" rules={[{ required: true }, { min: 8, max: 64 }]} style={{ marginBottom: '16px' }}>
            <AsnInput.Password placeholder="Password" />
          </AsnForm.Item>
          <ForgotPassword onClick={() => navigate('/forgot-password')}>Forgot password?</ForgotPassword>
          <AsnForm.Item>
              <AsnButton htmlType="submit" loading={isLoading} className='primary'>
                Sign In
              </AsnButton>
          </AsnForm.Item>
        </AsnForm>
      </Col>
    </Row >
  );
};

export default SignIn;
