import { useQuery } from '@tanstack/react-query';

import client from '../../client';

const url = '/api/activity/templates/project/:id';

const useGetTemplates: any = (id: string, search: string, offset: number, limit: number, filters: any, options = { enabled: true }) => {
  const { courseStructure, applicationForm } = filters;
  const result = useQuery(
    [url, id, search, offset, filters],
    async () => await client.post(url.replace(':id', id), { offset, limit, search, applicationForm, courseStructure }),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess, isFetching } = result;
  return {
    ...result,
    data: isSuccess ? data : [],
    isFetching
  };
};

export default useGetTemplates;
// {
//     "search": "string",
//     "applicationForm": [
//       "APPLICATION"
//     ],
//     "courseStructure": "ONE_SECTION",
//     "limit": 50,
//     "offset": 0
//   }
