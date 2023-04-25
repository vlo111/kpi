import { useQuery } from '@tanstack/react-query';
import { TUseGetApllicants } from '../../types/applicant';
import client from '../client';

const url = '/api/applicant/course/:sectionDataId';

const useGetApplicants: TUseGetApllicants = (id, search, offset, limit, options = { enabled: true }) => {
  const result = useQuery(
    [url, id, offset, search],
    async () => await client.post(url.replace(':sectionDataId', id), { search, offset, limit }),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess, isLoading } = result;
  return {
    ...result,
    isLoading,
    data: isSuccess ? data : []
  };
};

export default useGetApplicants;
