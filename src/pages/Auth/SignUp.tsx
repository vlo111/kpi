import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, message, Space } from 'antd';

import useSignUpApi from '../../api/Auth/useSignUpApi';
import { VALIDATE_MESSAGES, passwordRegExp, PATHS } from '../../helpers/constants';
import { SignUpForm, ISuccessMessage } from '../../types/auth';
import { TVoid } from '../../types/global';

import { AsnInput } from '../../components/Forms/Input';
import { AsnButton } from '../../components/Forms/Button';
import { TitleAuth } from '../../components/Layout/TitleAuth';
import { AsnForm } from '../../components/Forms/Form';
import { AsnAlert } from '../../components/Forms/Alert';

const SignUp: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();
  const { mutate: signUp, isLoading }: any = useSignUpApi(
    {
      onSuccess: ({ data }: ISuccessMessage) => {
        const email: string = form.getFieldValue('email');
        void message.success(data.result, 2);
        navigate(`/${PATHS.RESENDCONFIRMATION.replace(':email', email)}`);
      },
      onError: ({ response }: any) => { setError(response.data.message); }
    }
  );
  const onFinish: TVoid = (values: SignUpForm) => {
    try {
      signUp(values);
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
        return await Promise.reject(new Error('The two passwords that you entered do not match!'));
      }
    })
  ];
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={8} style={ { maxWidth: '460px' } } >
        <AsnForm
          data-testid="signUpForm"
          name="signUp"
          form={form}
          onFinish={onFinish}
          validateMessages={VALIDATE_MESSAGES}
          layout="vertical"
        >
           <TitleAuth>Sign Up</TitleAuth>
           {(error.length > 0) && <AsnAlert type="error" message={error} />}
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
          <AsnForm.Item name="password" label="Password" rules={[{ required: true }, { min: 8, max: 16 }, { pattern: passwordRegExp }]}>
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
