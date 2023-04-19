import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

import { ImportApplicantList, ImportParams } from '../../types/applicant';
import client from '../client';

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
      onSuccess: () => {
        void queryClient.invalidateQueries(['/api/sub-activity']);
        void message.success('Applicants have been successfully added');
      },
      onError: () => {
        void message.error('Insufficient file format !!');
      }
    }
  );
};
export default useImportApplicantsIntoExcelFile;
