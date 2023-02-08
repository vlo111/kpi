import { useQuery, UseQueryResult } from '@tanstack/react-query';
import client from '../client';
import { IApplicant } from '../../types/api/application/applicationForm1';

export const url = 'api/application-form/:id';

export type ApplicantUseQuery = UseQueryResult<IApplicant>;

const useSingleApplicationForm: any = (id: string, options: any) => {
  try {
    const result: ApplicantUseQuery = useQuery(
      [url, id],
      async () => await client.get(url.replace(':id', id)),
      {
        retry: false,
        select: (data) => data?.data,
        ...options
      }
    );

    const { data, isLoading } = result;

    return { data, isLoading };
  } catch (e) {
    console.log(e);
  }
};

export default useSingleApplicationForm;
