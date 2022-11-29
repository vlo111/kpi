import React, { useState } from 'react';
import { Row, Col, message, Space } from 'antd';
import get from 'lodash/get';
import { useNavigate } from 'react-router-dom';

import { VALIDATE_MESSAGES, passwordRegExp } from '../../helpers/constants';
import AsnInput from '../../components/Forms/Input';
import AsnButton from '../../components/Forms/Button';
import useSignUpApi from '../../api/Auth/useSignUpApi';
import { TitleAuth } from '../../components/Layout/TitleAuth';
import AsnForm from '../../components/Forms/Form';
import { SignUpForm } from '../../types/auth';
import ErrorBeckend from '../../components/Errors/AnsAlert';

const SignUp: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();
  const { mutate: signUp, isLoading }: any = useSignUpApi(
    {
      onSuccess: () => {
        const email: string = form.getFieldValue('email');
        void message.success('sucess', 1);
        navigate(`/resend-confirmation/${email}`);
      },
      onError: ({ response }: any) => { setError(response.data.message); }
    }
  );
  const onFinish = (values: SignUpForm): void => {
    try {
      signUp(values);
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
        if (getFieldValue('password') === value) {
          return await Promise.resolve();
        }
        return await Promise.reject(new Error('The two passwords that you entered do not match!'));
      }
    })
  ];
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8} style={ { maxWidth: '460px' } } >
        <AsnForm
          name="signUp"
          form={form}
          onFinish={(values) => onFinish(values as SignUpForm)}
          autoComplete="off"
          validateMessages={VALIDATE_MESSAGES}
          layout="vertical"
        >
           <TitleAuth>Sign Up</TitleAuth>
           {(error.length > 0) && <ErrorBeckend type="error" message={error} />}
          <AsnForm.Item name="firstName" label="First Name"
            rules={[{ required: true }, { min: 3, max: 128 }]}>
            <AsnInput placeholder="First Name" />
          </AsnForm.Item>
          <AsnForm.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }, { min: 3, max: 128 }]}
          >
            <AsnInput placeholder="Last Name" />
          </AsnForm.Item>
          <AsnForm.Item
            name="email"
            label="Email Address"
            rules={[{ required: true }, { type: 'email' }, { max: 128 }]}
          >
            <AsnInput placeholder="Email Address" />
          </AsnForm.Item>
          <AsnForm.Item
            name="organization" label="Organisation Name"
            rules={[{ required: true }, { min: 2, max: 128 }]}
          >
            <AsnInput placeholder="Organisation Name" />
          </AsnForm.Item>
          <AsnForm.Item name="password" label="Password" rules={[{ required: true }, { min: 8, max: 64 }, { pattern: passwordRegExp }]}>
            <AsnInput.Password placeholder="Password" />
          </AsnForm.Item>
          <AsnForm.Item name="repeatPassword" label="Confirm Password" rules={rulesConfirmPassword}>
            <AsnInput.Password placeholder="Confirm Password" />
          </AsnForm.Item>
          <AsnForm.Item>
            <Space size="middle" style={{ width: '100%' }} direction="vertical">
              <AsnButton
                htmlType="submit"
                loading={isLoading}
                className="primary"
              >
                Create Account
              </AsnButton>
            </Space>
          </AsnForm.Item>
        </AsnForm>
      </Col>
    </Row>
  );
};

export default SignUp;
