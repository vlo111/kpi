import React from 'react';
import { Row, Col } from 'antd';
import AsnInput from '../../components/Forms/Input';
import { Form } from '../../components/Forms/Form';
import { VALIDATE_MESSAGES, passwordRegExp } from '../../helpers/constants';
import AsnButton from '../../components/Forms/Button';
import { TitleAuth } from '../../components/Layout/TitleAuth';
import styled from 'styled-components';

const Description = styled.div`
  font-size: var(--headline-font-size); 
  width: 100%; 
  margin-bottom: 32px;
`;

const ResetPassword: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish: any = (values: any) => {
    console.log(values, 'sucess');
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
        <Col span={8} style={{ maxWidth: '460px' }} >
          <Form
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
            <Description>The password should have at least 8 characters</Description>
            <Form.Item
            name="password"
            label="New Password"
            rules={[{ required: true }, { min: 8, max: 64 }, { pattern: passwordRegExp }]}
            style={ { marginBottom: '16px' } }
            >
              <AsnInput.Password placeholder="New Password"/>
            </Form.Item>
            <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={rulesConfirmPassword}
             >
              <AsnInput.Password placeholder="Confirm Password" />
            </Form.Item>
            <Form.Item>
              <AsnButton className='primary' type="primary" htmlType="submit">
                Reset Password
              </AsnButton>
            </Form.Item>
          </Form>
        </Col>
      </Row>
  );
};

export default ResetPassword;
