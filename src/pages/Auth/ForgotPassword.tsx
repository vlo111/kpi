import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, message } from 'antd';
import styled from 'styled-components';
import get from 'lodash/get';

import useForgotPassword from '../../api/Auth/useForgotPassword';
import { VALIDATE_MESSAGES, PATHS } from '../../helpers/constants';
import { TVoid } from '../../types/global';
import { ISuccessMessage } from '../../types/auth';
import AsnForm from '../../components/Forms/Form';
import AsnInput from '../../components/Forms/Input';
import AsnButton from '../../components/Forms/Button';
import AsnAlert from '../../components/Errors';
import { TitleAuth } from '../../components/Layout/TitleAuth';
import { ReactComponent as KeySvg } from '../../assets/icons/forgot.svg';

const ForgotPassword: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();
  const { mutate: forgotPassword, isLoading }: any = useForgotPassword(
    {
      onSuccess: ({ data }: ISuccessMessage) => {
        void message.success(data.result, 2);
      },
      onError: ({ response }: any) => { setError(response.data.message); }
    }
  );
  const onFinish: TVoid = (values: { email: string }) => {
    try {
      forgotPassword(values);
    } catch (error) {
      const errorMessage = get(error, 'error.message', 'Something went wrong!');
      void message.error(errorMessage);
    }
  };

  const BackSignIn = styled.div`
    font-size: var(--base-font-size);
    color: var(--dark-border-ultramarine); 
    cursor: pointer; 
    text-align: center;
    font-weight: var(--font-regular);
  `;
  const Description = styled.div`
    font-size: var(--headline-font-size); 
    width: 100%; 
    margin-bottom: 32px; 
    line-height: 25px;
  `;

  return (
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col span={8} style={{ maxWidth: '460px' }} >
          <AsnForm
            name="signin"
            form={form}
            onFinish={onFinish}
            validateMessages={VALIDATE_MESSAGES}
            layout="vertical"
          >
            <KeySvg style={{ width: '100%', marginBottom: '26px' }} />
            <TitleAuth>Forget Password</TitleAuth>
            {(error.length > 0) && <AsnAlert type="error" message={error} />}
            <Description>Please enter the email you use to sign in to Meetk.</Description>
            <AsnForm.Item
             name="email"
             label="Email Address"
             rules={[{ required: true }, { type: 'email' }, { max: 128 }]}
             >
              <AsnInput placeholder="Email Address" />
            </AsnForm.Item>
            <AsnForm.Item style={ { marginBottom: '9px' } }>
              <AsnButton className='primary' type="primary" htmlType="submit" loading={isLoading}>
                Reset Password
              </AsnButton>
            </AsnForm.Item>
            <BackSignIn onClick={() => navigate(PATHS.SIGNIN)}>Back To Sign In </BackSignIn>
          </AsnForm>
        </Col>
      </Row>
  );
};

export default ForgotPassword;
