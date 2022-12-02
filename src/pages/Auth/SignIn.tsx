import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, message } from 'antd';
import styled from 'styled-components';

import { useAuth } from '../../hooks/useAuth';
import { handleErrorMessage } from '../../helpers/utils';
import { IUser, ISignInForm } from '../../types/auth';
import { TVoid } from '../../types/global';
import { PATHS, VALIDATE_MESSAGES } from '../../helpers/constants';
import AsnInput from '../../components/Forms/Input';
import AsnButton from '../../components/Forms/Button';
import { TitleAuth } from '../../components/Layout/TitleAuth';
import AsnForm from '../../components/Forms/Form';
import { AsnAlert } from '../../components/Forms/Alert';

import useSignInApi from '../../api/Auth/useSignInApi';

const ForgotPassword = styled.div`
  color: var(--forget-password-gray); 
  font-size: var(--base-font-size);
  cursor: pointer;
  margin-bottom: 24px;
`;
const SignIn: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();
  const email = form.getFieldValue('email');
  const { login, isToken } = useAuth();
  const { mutate: signIn, isLoading }: any = useSignInApi(
    {
      onSuccess: (payload: { data: IUser }) => {
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
      onError: ({ response }: any) => { setError(handleErrorMessage(response)); }
    }
  );
  const onFinish: TVoid = (values: ISignInForm) => {
    try {
      signIn(values);
    } catch (error: any) {
      void message.error(error, 2);
    }
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8} style={{ maxWidth: '460px' }}>
        <AsnForm
          name="signin"
          form={form}
          onFinish={onFinish}
          validateMessages={VALIDATE_MESSAGES}
          layout="vertical"
        >
          <TitleAuth>
            Sign In
          </TitleAuth>
          {(error.length > 0) && <AsnAlert type="error" message={error} email={email} />}
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
          <ForgotPassword onClick={() => navigate(`/${PATHS.FORGOTPASSWORD}`)}>Forgot password?</ForgotPassword>
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
