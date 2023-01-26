
import { useMutation } from '@tanstack/react-query';
import client from '../client';
const url = '/api/applicant';

const useGetApplicantsFilter = (options = {}): any => {
  const mutation = useMutation((data): any => {
    return client.post(url, data);
  }, options);
  return mutation;
};

export default useGetApplicantsFilter;
