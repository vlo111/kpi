import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Space, message } from 'antd';
import styled from 'styled-components';

import { TitleAuth } from '../../components/Layout/TitleAuth';
import AsnButton from '../../components/Forms/Button';
import useResendConfirmEmail from '../../api/Auth/useResendConfirmEmail';
import { ReactComponent as CheckedSvg } from '../../assets/icons/checked.svg';

const Checked = styled.div`
font-size: var(--headline-font-size);
span{
  color: var(--dark-border-ultramarine);
}
`;

const ConfirmEmailSignUp: React.FC = () => {
  const { email } = useParams();
  const { mutate: reSend, isLoading }: any = useResendConfirmEmail(
    {
      onSuccess: (payload: any) => {
        void message.success('sucess', 1);
      },
      onError: (error: any) => {
        console.log(error);
      }
    }
  );
  const reSendEmail = (): void => {
    reSend({ email });
  };
  return (
      <Row align='middle' justify='center' style={{ minHeight: '100vh' }}>
        <Col span={8} style={{ maxWidth: '460px' }}>
          <Space direction='vertical' size={16}>
            <Row justify='start'>
              <TitleAuth style={{ minWidth: '50vw', marginBottom: '0', textAlign: 'left' }}>We&apos;ve Sent An Email To</TitleAuth>
            </Row>
            <Row justify='start' style={{ fontSize: 'var(--font-size-semilarge)', color: 'var(--secondary-green)' }}>{email}</Row>
            <Row justify='start' style={{ fontSize: 'var(--headline-font-size)' }}>Please make sure</Row>
            <Row>
              <Space direction='horizontal' size={7}>
                <CheckedSvg />
                <Checked>You&apos;ve entered it<span> correctly</span></Checked>
              </Space>
            </Row>
            <Row>
              <Space direction='horizontal' size={7}>
                <CheckedSvg />
                <Checked>This email is <span>linked to your profile</span></Checked>
              </Space>
            </Row>
            <Row>
              <Space direction='horizontal' size={7} align='baseline'>
                <CheckedSvg />
                <Checked>Check your <span>spam and notifications folders<br></br>in your inbox</span></Checked>
              </Space>
            </Row>
            <Row>
              <AsnButton style={{ marginTop: '41px', maxWidth: '460px' }} loading={isLoading} className='primary' type="primary" htmlType="submit" onClick={reSendEmail}>
                Re-Send Confirmation Email
              </AsnButton>
            </Row>
          </Space>
        </Col>
      </Row>
  );
};

export default ConfirmEmailSignUp;
