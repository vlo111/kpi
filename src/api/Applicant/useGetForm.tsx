import { useQuery } from '@tanstack/react-query';
import client from '../client';

const URL_GET_FORM = 'api/applicant/:id/course/:sectionDataId/form?type=:type';

const useGetForm: any = (id: any, sectionDataId: any, type: string) => {
  try {
    if (id !== undefined) {
      const { data, isLoading } = useQuery(
        [URL_GET_FORM, id],
        async () =>
          await client.get(
            URL_GET_FORM.replace(':id', id)
              .replace(':sectionDataId', sectionDataId)
              .replace(':type', `${type}`)
          )
      );

      return {
        data: data?.data?.applicationForm,
        isLoading
      };
    }
  } catch (e) {
    console.log(e);
  }
};

export default useGetForm;
