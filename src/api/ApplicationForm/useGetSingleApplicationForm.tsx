import { useQuery, UseQueryResult } from '@tanstack/react-query';
import client from '../client';
import { IApplicant } from '../../types/api/application/applicationForm';

export const url = 'api/application-form/:id';

type IApplicantForm = (
  id: string,
  options: {
    onSuccess: (data: IApplicant) => void
    onError: (data: IApplicant) => void
  }
) => IApplicant | undefined;

export type ApplicantUseQuery = UseQueryResult<IApplicant>;

const useSingleApplicationForm: IApplicantForm = (id, options) => {
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
    const { data } = result;

    return data;
  } catch (e) {
    console.log(e);
  }
};

export default useSingleApplicationForm;
