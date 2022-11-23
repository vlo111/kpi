import React from 'react';
import { Row, Col, Form, Space, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import get from 'lodash/get';

import { PATHS, VALIDATE_MESSAGES } from '../../helpers/constants';
import AsnInput from '../../components/Forms/Input';
import AsnButton from '../../components/Forms/Button';
import useSignInApi from '../../api/Auth/useSignInApi';

const { Title } = Typography;

const SignIn: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate: signIn, isLoading } = useSignInApi(
    {
      onSuccess: (payload: any) => {
        console.log(payload.data, 'payload.data');

        navigate(`/${PATHS.ROOT}`);
      },
      onError: (error: any) => { void message.error(error); }
    }
  );
  const onFinish: any = (values: any) => {
    console.log(values, 'values');
    try {
      signIn(values);
    } catch (error) {
      const errorMessage = get(error, 'error.message', 'Something went wrong!');
      void message.error(errorMessage);
    }
  };
  const onFinishFailed: any = (values: any) => {
    console.log(values, 'values');
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={6}>
        <Title level={2} className="text-center">Sign In</Title>
        <Form
          name="signin"
          form={form}
          initialValues={{
            remember: false
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={VALIDATE_MESSAGES}
          layout='vertical'
        >
          <Form.Item
            name="email" label="Email Address"
            rules={[{ required: true }, { type: 'email' }, { max: 128 }]}
          >
            <AsnInput placeholder="Email Address" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
            <AsnInput.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Space size="middle" style={{ width: '100%' }} direction="vertical">
              <AsnButton htmlType="submit" loading={isLoading} className='primary'>
                Sign In
              </AsnButton>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignIn;
