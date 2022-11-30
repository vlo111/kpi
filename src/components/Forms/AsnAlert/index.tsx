import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../helpers/constants';
import { IAnsAlert } from '../../../types/global';
import { AsnAlert, AsnText } from './AsnAlert';

const AlertAnt: React.FC<IAnsAlert> = ({ message, type, email }) => {
  const navigate = useNavigate();
  const handleClick = (): void => {
    if (email != null) {
      navigate(`/${PATHS.RESENDCONFIRMATION.replace(':email', email)}`);
    }
  };
  return (
      <AsnAlert
        message={
          <>
            {message}
            {' '}{(email != null) && message === 'Please confirm your email' && <AsnText onClick={handleClick}>Resend confirmation email</AsnText>}
          </>
        }
        type={type}
        showIcon
      />
  );
};

export default AlertAnt;
