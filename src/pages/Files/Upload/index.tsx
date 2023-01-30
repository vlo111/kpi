import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { IFileUpload, IUploadFileError, IUploadFileResponse } from '../../../types/files';
import useFileUpload from '../../../api/Activity/Template/SubActivity/useUploadFile';
import useAttacheFilesSubActivitySection from '../../../api/Activity/Template/SubActivity/useAttachFileCourseSetting';
import { RcFile } from 'antd/lib/upload/interface';

const FileUpload: React.FC<IFileUpload> = ({ courseId, folderId, refetch, refetchAllFiles, refetchFolderFiles, type, folder }) => {
  const { mutate: uploadFile } = useFileUpload();
  const { mutate: addFileCourse } = useAttacheFilesSubActivitySection({
    onSuccess: () => {
      void refetch();
      void refetchAllFiles();
      void message.success('Successfully attached');
    },
    onError: () => message.error('Something went wrong')
  });

  return (
    <Upload
      listType="picture"
      style={{ borderRadius: 0, width: '50%' }}
      showUploadList={false}
      accept='.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx'
      customRequest={(options: { file: string | Blob | RcFile }) => {
        const { file } = options;
        uploadFile({ file, type },
          {
            onSuccess: ({ data: { result } }: IUploadFileResponse) => {
              addFileCourse({
                id: courseId,
                data: {
                  files: [{
                    file: result[0]
                  }],
                  sectionSettingId: folderId
                }
              },
              {
                onSuccess: () => {
                  if (folder !== undefined && folder && (refetchFolderFiles !== undefined)) {
                    void refetchFolderFiles();
                  }
                }
              });
            },
            onError: ({ response: { data: { message: error } } }: IUploadFileError) => message.error(error, 2)
          });
      }}
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default FileUpload;
