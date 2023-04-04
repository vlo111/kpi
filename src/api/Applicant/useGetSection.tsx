import { useQuery } from '@tanstack/react-query';
import client from '../client';
import { IHistory } from '../../types/applicant';
import { AxiosResponse } from 'axios';

interface IGetSection { isLoading?: boolean, history: AxiosResponse<{ result: IHistory[] }> | undefined}

export type UseGetSection = (applicantId: string, sectionDataId: string) => IGetSection | undefined

const URL_GET_SECTION = 'api/applicant/:id/course/:sectionDataId/history';

const useGetSection: UseGetSection = (applicantId, sectionDataId) => {
  try {
    const { data, isLoading } = useQuery(
      [URL_GET_SECTION, applicantId],
      async () =>
        await client.get(
          URL_GET_SECTION.replace(':id', applicantId).replace(
            ':sectionDataId',
            sectionDataId
          )
        )
    );

    return {
      history: data,
      isLoading
    };
  } catch (e) {
    console.log(e);
  }
};

export default useGetSection;
