import { useQuery } from '@tanstack/react-query';
import { TUseGetTemplates } from '../../../types/api/activity/subActivity';
import client from '../../client';

const url = '/api/activity/templates/project/:id';

const useGetTemplates: TUseGetTemplates = (id, search, offset, limit, filters, options = { enabled: true }) => {
  const { courseStructure, applicationForm } = filters;
  const result = useQuery(
    [url, id, search, offset, filters],
    async () => await client.post(url.replace(':id', id), { offset, limit, search, applicationForm, courseStructure }),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess } = result;
  return {
    ...result,
    data: isSuccess ? data : []
  };
};

export default useGetTemplates;
