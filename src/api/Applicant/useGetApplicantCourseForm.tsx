import { useQuery } from '@tanstack/react-query';
import { useGetApplicantForm } from '../../types/applicant';
import client from '../client';

const url = '/api/applicant/:id/course/:sectionDataId/form';

const useGetApplicantCourseForm: useGetApplicantForm = (id, sectionDataId, type, options = { enabled: true }) => {
  const result = useQuery(
    [url, id],
    async () => await client.get(url.replace(':id', id).replace(':sectionDataId', sectionDataId), { params: { type } }),
    {
      select: (data) => data?.data,
      ...options
    }
  );
  const { data, isSuccess, isLoading } = result;
  return {
    ...result,
    data: isSuccess ? data : {},
    isLoading
  };
};

export default useGetApplicantCourseForm;
