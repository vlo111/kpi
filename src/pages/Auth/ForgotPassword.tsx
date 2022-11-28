import React from 'react';
import styled from 'styled-components';
import { Row, Col, message } from 'antd';
import get from 'lodash/get';
import { VALIDATE_MESSAGES } from '../../helpers/constants';
import useForgotPassword from '../../api/Auth/useForgotPassword';
import { Form } from '../../components/Forms/Form';
import AsnInput from '../../components/Forms/Input';
import AsnButton from '../../components/Forms/Button';
import { useNavigate } from 'react-router-dom';
import { TitleAuth } from '../../components/Layout/TitleAuth';
import { ReactComponent as KeySvg } from '../../assets/icons/forgot.svg';

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: forgotPassword, isLoading }: any = useForgotPassword(
    {
      onSuccess: (payload: any) => {
        void message.success('sucess', 1);
        navigate('/reset-password');
      },
      onError: (error: any) => {
        console.log(error);
      }
    }
  );
  const onFinish: any = (values: any) => {
    try {
      forgotPassword(values);
    } catch (error) {
      const errorMessage = get(error, 'error.message', 'Something went wrong!');
      void message.error(errorMessage);
    }
  };

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed');
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
          <Form
            name="signin"
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={VALIDATE_MESSAGES}
            layout="vertical"
          >
            <KeySvg style={{ width: '100%', marginBottom: '26px' }} />
            <TitleAuth>Forget Password</TitleAuth>
            <Description>Please enter the email you use to sign in to Meetk.</Description>
            <Form.Item
             name="email"
             label="Email Address"
             rules={[{ required: true }, { type: 'email' }, { max: 128 }]}
             >
              <AsnInput placeholder="Email Address" />
            </Form.Item>
            <Form.Item style={ { marginBottom: '9px' } }>
              <AsnButton className='primary' type="primary" htmlType="submit" loading={isLoading}>
                Reset Password
              </AsnButton>
            </Form.Item>
            <BackSignIn onClick={() => navigate('/sign-in')}>Back To Sign In </BackSignIn>
          </Form>
        </Col>
      </Row>
  );
};

export default ForgotPassword;
