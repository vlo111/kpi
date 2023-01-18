import { useMutation } from '@tanstack/react-query';
import client from '../../client';

const url = 'api/media/upload/file';

const useFileUpload: any = (options = {}) =>
  useMutation(async (params: { file: any, type: string }) => {
    const form = new FormData();
    form.append('file', params.file);
    form.append('type', params.type);
    return await client.post(url, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }, options);
export default useFileUpload;
