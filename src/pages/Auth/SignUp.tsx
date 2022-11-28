import React from 'react';
import { Row, Col, message, Space } from 'antd';
import get from 'lodash/get';
import { useNavigate } from 'react-router-dom';

import { VALIDATE_MESSAGES, passwordRegExp } from '../../helpers/constants';
import AsnInput from '../../components/Forms/Input';
import AsnButton from '../../components/Forms/Button';
import useSignUpApi from '../../api/Auth/useSignUpApi';
import { TitleAuth } from '../../components/Layout/TitleAuth';
import { Form } from '../../components/Forms/Form';
import { SignUpForm } from '../../types/auth';

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: signUp, isLoading }: any = useSignUpApi(
    {
      onSuccess: (payload: any) => {
        void message.success('sucess', 1);
      },
      onError: (error: any) => {
        console.log(error);
      }
    }
  );
  const onFinish = (values: SignUpForm): void => {
    try {
      const { email } = values;
      signUp(values);
      navigate(`/resend-confirmation/${email}`);
    } catch (error) {
      const errorMessage = get(error, 'error.message', 'Something went wrong!');
      void message.error(errorMessage);
    }
  };

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed');
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
        <Form
          name="signUp"
          form={form}
          initialValues={{
            remember: false
          }}
          onFinish={(values) => onFinish(values as SignUpForm)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={VALIDATE_MESSAGES}
          layout="vertical"
        >
           <TitleAuth>Sign Up</TitleAuth>
          <Form.Item name="firstName" label="First Name"
            rules={[{ required: true }, { min: 3, max: 128 }]}>
            <AsnInput placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true }, { min: 3, max: 128 }]}
          >
            <AsnInput placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true }, { type: 'email' }, { max: 128 }]}
          >
            <AsnInput placeholder="Email Address" />
          </Form.Item>
          <Form.Item
            name="organization" label="Organisation Name"
            rules={[{ required: true }, { min: 2, max: 128 }]}
          >
            <AsnInput placeholder="Organisation Name" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }, { min: 8, max: 64 }, { pattern: passwordRegExp }]}>
            <AsnInput.Password placeholder="Password" />
          </Form.Item>
          <Form.Item name="repeatPassword" label="Confirm Password" rules={rulesConfirmPassword}>
            <AsnInput.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item>
            <Space size="middle" style={{ width: '100%' }} direction="vertical">
              <AsnButton
                htmlType="submit"
                loading={isLoading}
                className="primary"
              >
                Create Account
              </AsnButton>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUp;
