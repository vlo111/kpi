import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, message, Space, Typography, Form } from 'antd';
import get from 'lodash/get';

import { VALIDATE_MESSAGES } from '../../helpers/constants';
import AsnInput from '../../components/Forms/Input';
import AsnButton from '../../components/Forms/Button';
import useSignUpApi from '../../api/Auth/useSignUpApi';

const { Title } = Typography;

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: signUp, isLoading } = useSignUpApi({
    onSuccess: (payload: any) => {
      navigate('/');
      console.log(payload.data, 'payload.data');
    },
    onError: () => {}
  });
  const onFinish: any = (values: any) => {
    console.log(values, 'values');
    try {
      signUp(values);
    } catch (error) {
      const errorMessage = get(error, 'error.message', 'Something went wrong!');
      void message.error(errorMessage);
    }
  };

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed');
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={5}>
        <Title level={2} className="text-center">
          Sign Up
        </Title>
        <Form
          name="signUp"
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
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true }, { min: 3, max: 128 }]}
          >
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
            name="organization"
            label="Organisation Name"
            rules={[{ required: true }, { max: 128 }]}
          >
            <AsnInput placeholder="Organisation Name" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, min: 6 }]}
          >
            <AsnInput.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="repeatPassword"
            label="Confirm Password"
            rules={[{ required: true, min: 6 }]}
          >
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
