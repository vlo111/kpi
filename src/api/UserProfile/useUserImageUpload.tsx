import { useMutation } from '@tanstack/react-query';
import { UserImageUpload } from '../../types/auth';

import client from '../client';

const url = 'api/media/upload/photo';

const userImageUpload: UserImageUpload = (options = {}) =>
  useMutation(async (file) => {
    const form = new FormData();
    form.append('photo', file);
    return await client.post(url, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }, options);
export default userImageUpload;
