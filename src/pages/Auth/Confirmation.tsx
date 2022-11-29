import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useResendEmail from '../../api/Auth/useConfirmEmail';
import { Spin, message, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'var(--dark-border-ultramarine)' }} spin />;

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { mutate: confirmEmail }: any = useResendEmail(
    {
      onSuccess: () => {
        void message.success('sucess', 1);
        navigate('/sign-in');
      },
      onError: (error: any) => {
        console.log(error);
      }
    }
  );
  useEffect(() => {
    if (token != null) {
      confirmEmail({ token });
    }
  }, [token]);
  return (
        <>
            <Row align="middle" justify='center' style={ { height: '100vh' } }>
                <Col><Spin indicator={antIcon} /></Col>
            </Row>
        </>
  );
};

export default Confirmation;
