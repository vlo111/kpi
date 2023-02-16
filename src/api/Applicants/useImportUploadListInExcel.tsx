import { useMutation } from '@tanstack/react-query';

import { ImportApplicantList, ImportParams } from '../../types/applicant';
import client from '../client';

export const url = '/api/applicant/upload/list';

const useImportApplicantsIntoExcelFile: ImportApplicantList = (options = {}) =>
  useMutation(
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
    options
  );
export default useImportApplicantsIntoExcelFile;
