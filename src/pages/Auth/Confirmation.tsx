import React, { useEffect } from 'react';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import { message } from 'antd';

import AsnSpin from '../../components/Forms/Spin';
import useResendEmail from '../../api/Auth/useConfirmEmail';
import { PATHS } from '../../helpers/constants';
import { ISuccessMessage } from '../../types/auth';

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
            <AsnSpin />
  );
};

export default Confirmation;
