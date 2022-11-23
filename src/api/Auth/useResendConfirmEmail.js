import { useMutation } from '@tanstack/react-query';

import client from '../client';

const url = 'api/auth/email/resend';

const useResendConfirmEmail = (options = {}) => {
    const mutation = useMutation((email) => {
        return client.post(url, email);
    }, options);
    return mutation;
};

export default useResendConfirmEmail;