import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Typography } from 'antd';
import styled from 'styled-components';
import { PATHS } from '../../../helpers/constants';
import { IAnsAlert } from '../../../types/global';

const { Text } = Typography;

const AntAlert = styled(Alert)`
  margin-bottom: 24px;
  .ant-alert-message{
    color:${props => props.type === 'error' ? 'var(--error)' : ''};
  }
  &.ant-alert-error{
    border: 1px solid var(--error);
  }
`;
const textStyle = {
  textDecoration: 'underline',
  color: 'var(--error)',
  cursor: 'pointer'
};
export const AsnAlert: React.FC<IAnsAlert> = ({ message, type, email }) => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    if (email != null) {
      navigate(`/${PATHS.RESENDCONFIRMATION.replace(':email', email)}`);
    }
  };
  return (
      <AntAlert
        message={
          <>
            {message}
            {' '}{(email != null) && message === 'Please confirm your email' && <Text style={{ ...textStyle }} onClick={handleClick}>Resend confirmation email</Text>}
          </>
        }
        type={type}
        showIcon
      />
  );
};
