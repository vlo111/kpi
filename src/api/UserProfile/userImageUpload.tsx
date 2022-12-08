import { useMutation } from '@tanstack/react-query';

import client from '../client';

const url = 'api/media/upload/photo';

const userImageUpload: any = (options = {}) =>
  useMutation(async (file: any) => await client.post(url, file), options);

export default userImageUpload;
