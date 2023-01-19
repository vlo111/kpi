import { useQuery } from '@tanstack/react-query';
import client from '../../client';

export const url = 'api/sub-activity/course';

const getSingleSubActivitySettingInfo: any = (courseId: string, settingId: string, options = { enabled: false }) => {
  const result = useQuery(
    [url, courseId, settingId],
    async () => await client.get(`${url}/${courseId}/setting/${settingId}/info`),
    {
      ...options,
      select: (data) => data.data
    }
  );
  const { data, isSuccess, refetch, isLoading } = result;
  return {
    data,
    isSuccess,
    refetch,
    isLoading
  };
};

export default getSingleSubActivitySettingInfo;
