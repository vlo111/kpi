import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Upload, Space, Typography, message } from 'antd';
import styled from 'styled-components';

import { RcFile, UploadProps } from 'antd/lib/upload';
import { IUploadFileResponse } from '../../../../../types/files';
import { IUploadService } from '../../../../../types/api/activity/subActivity';
import useFileUpload from '../../../../../api/Activity/SubActivity/useUploadFile';
import useAttacheFilesSubActivitySection from '../../../../../api/Activity/SubActivity/useAttachFileCourseSetting';

import { ReactComponent as FileSvg } from '../../SubActivityIcons/upload-docs.svg';
import { ReactComponent as AttachIcon } from '../../../../../assets/icons/attach.svg';

const { Dragger } = Upload;
const { Text } = Typography;

const AsnDragger = styled(Dragger)`
    &.general {
        &.ant-upload.ant-upload-drag {
        border: 1px dashed var(--dark-border-ultramarine);
        background: var(--white);
        .ant-upload {
            padding: 16px;
        }
    }
    &.ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
        border-color: var(--dark-border-ultramarine);
    }
    svg {
    rect,
    path {
      fill: var(--dark-border-ultramarine) !important;
    }
  }
    }
    &.required {
        &.ant-upload.ant-upload-drag {
    width: 25px;
    height: 25px;
    border: none;
    background: var(--white);
  }
  &.ant-upload.ant-upload-drag .ant-upload{
    padding: 0;
  }
    }
`;

const UploadService: React.FC<IUploadService> = ({ type, courseId, keyname, disableUploadReqDoc }) => {
  const queryClient = useQueryClient();
  const { mutate: UploadDoc } = useFileUpload(true);
  const { mutate: AttachFile } = useAttacheFilesSubActivitySection();

  const props: UploadProps = {
    showUploadList: false,
    accept: '.doc,.docx,.pdf,.gif,.mp4,.avi,.flv,.ogv,.xlsx, .png, .jpeg',
    customRequest: (options: { file: string | Blob | RcFile }) => {
      const { file } = options;
      UploadDoc({ file, type },
        {
          onSuccess: ({ data: { result } }: IUploadFileResponse) => {
            AttachFile({
              id: courseId,
              data: {
                files: [{
                  file: result[0],
                  keyname
                }]
              }
            },
            {
              onSuccess: () => {
                void queryClient.invalidateQueries(['/api/sub-activity']);
                void message.success('Successfully attached', 2);
              },
              onError: ({ response: { data: { message: errorMessage } } }) => {
                void message.error(errorMessage, 2);
              }
            });
          }
        }
      );
    },
    maxCount: 1,
    disabled: disableUploadReqDoc
  };

  return (
    <AsnDragger
      className={type === 'GENERAL_DOCUMENT' ? 'general' : 'required'}
      {...props}
    >
      {type === 'GENERAL_DOCUMENT'
        ? <Space align='center'>
          <FileSvg />
          <Text
            style={{
              fontSize: 'var(--headline-font-size)',
              color: 'var(--dark-border-ultramarine)'
            }}
          >
            Add General documents
          </Text>
        </Space>
        : <AttachIcon />
      }
    </AsnDragger>
  );
};

export default UploadService;
