import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Space, message } from 'antd';

import { AsnInput } from '../../components/Forms/Input';
import { AsnForm } from '../../components/Forms/Form';
import { AsnButton } from '../../components/Forms/Button';
import { AsnAlert } from '../../components/Forms/Alert';
import { TVoid } from '../../types/global';
import { passwordRegExp, VALIDATE_MESSAGES, PATHS } from '../../helpers/constants';
import { ISuccessMessage } from '../../types/auth';
import useChangePassword from '../../api/UserProfile/useChangePassword';
import { TitleAuth } from '../../components/Layout/TitleAuth';


const Invitation: React.FC = () => {
    const [error, setError] = useState<string>('');
    const { mutate: changePassword, isLoading }: any = useChangePassword(
      {
        onSuccess: ({ data }: ISuccessMessage) => {
          void message.success(data?.result, 2);
          navigate(`/${PATHS.USERPROFILE}`);
        },
        onError: ({ response }: any) => { setError(response.data.message); }
      }
    );
    const [form] = AsnForm.useForm();
    const navigate = useNavigate();
    const onFinish: TVoid = (values) => {
      try {
        changePassword(values);
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
          if (getFieldValue('newPassword') === value) {
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
        <TitleAuth>Accept Invitation</TitleAuth>
         {(error.length > 0) && <AsnAlert type="error" message={error} />}
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
              style={{ width: '100%' }}
            >
              Submit
            </AsnButton>
          </Space>
        </AsnForm.Item>
      </AsnForm>
    </Col>
  </Row>
  );
};

export default Invitation;
