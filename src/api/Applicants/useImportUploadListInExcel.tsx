import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import { ImportApplicantList, ImportParams } from '../../types/applicant';
import client from '../client';
import { IApplicantsList, IImportApplicantsWarnings } from '../../types/api/activity/subActivity';

export const url = '/api/applicant/upload/list';

const useImportApplicantsIntoExcelFile: ImportApplicantList = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (params: ImportParams) => {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      const form = new FormData();
      form.append('file', params.file);
      form.append('sectionDataId', params.sectionDataId);
      return await client.post(url, form, config);
    },
    {
      onSuccess: (data: {
        data: { successfulApplicants: IApplicantsList[], warnings: IImportApplicantsWarnings[] }
      }) => {
        void queryClient.invalidateQueries([
          '/api/applicant/course/:sectionDataId'
        ]);
        if (
          data?.data.warnings?.length === 0 &&
          data?.data.successfulApplicants?.length === 0
        ) {
          void message.error('Insufficient file format !!');
        } else {
          if (data?.data.warnings?.length === 0) {
            void message.success('Applicants have been successfully added');
          }
        }
      },
      onError: ({
        response: {
          data: { message: error }
        }
      }) => {
        void message.error(error);
      }
    }
  );
};
export default useImportApplicantsIntoExcelFile;
