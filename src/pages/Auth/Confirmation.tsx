import React, { useEffect } from 'react';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { Spin, message, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import useResendEmail from '../../api/Auth/useConfirmEmail';
import { PATHS } from '../../helpers/constants';
import { ISuccessMessage } from '../../types/auth';

const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'var(--dark-border-ultramarine)' }} spin />;

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { mutate: confirmEmail }: any = useResendEmail(
    {
      onSuccess: ({ data }: ISuccessMessage) => {
        void message.success(data.result, 2);
        navigate(`/${PATHS.SIGNIN}`);
      },
      onError: () => {
      <Navigate to={`/${PATHS.ERROR_500}`} />;
      }
    }
  );
  useEffect(() => {
    if (token != null) {
      confirmEmail({ token });
    }
  }, [token]);
  return (
            <Row align="middle" justify='center' style={ { height: '100vh' } }>
                <Col><Spin indicator={antIcon} /></Col>
            </Row>
  );
};

export default Confirmation;
