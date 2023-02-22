import { useMutation } from '@tanstack/react-query';
import client from '../client';
import { UseMoveApplicant, UseMoveApplicantOption } from '../../types/api/applicant';

export const url = '/api/applicant/course/:sectionDataId/move';

const useMoveApplicant: UseMoveApplicant = (options: UseMoveApplicantOption) => {
  return useMutation(
    async (params
    ) => {
      await client.post(url.replace(':sectionDataId', params.id), {
        applicantIds: params.applicantId
      });
    },
    options
  );
};
export default useMoveApplicant;
