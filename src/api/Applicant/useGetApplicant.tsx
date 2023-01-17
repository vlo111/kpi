import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { UseGetApplicant } from '../../types/applicant';

const URL_GET_APPLICANT = 'api/applicant/:id';

// @ts-expect-error
const useGetApplicant: UseGetApplicant = (id: string | undefined) => {
  try {
    if (id !== undefined) {
      const { data, isLoading } =
        useQuery(
          [URL_GET_APPLICANT, id],
          async () => await client.get(URL_GET_APPLICANT.replace(':id', id))
        );
      return { applicant: data?.data?.result, isLoading };
    }
  } catch (e) {
    console.log(e);
  }
};

export default useGetApplicant;
