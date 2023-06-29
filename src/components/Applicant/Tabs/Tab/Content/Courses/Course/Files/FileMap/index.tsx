import React from 'react';
import styled from 'styled-components';
import { Row, Space, Tooltip, message } from 'antd';
import { IFileMap } from '../../../../../../../../../types/applicant';

import { ReactComponent as DeleteSvg } from '../../../../../../../../../assets/icons/delete.svg';
import { EyeOutlined } from '@ant-design/icons';
import useDeleteFile from '../../../../../../../../../api/Files/useDeleteFile';
import { useQueryClient } from '@tanstack/react-query';
import { IErrorMessage } from '../../../../../../../../../types/project';

const SingleFile = styled(Row)`
  &:hover {
    background: var(--primary-light-2);
  }
  padding: 2px;
  svg {
    height: 21px;
    width: 16px;
  }
`;

const FileMap: React.FC<IFileMap> = ({ history, setOpenPreview, setUrl }) => {
  const queryClient = useQueryClient();

  const { mutate: DeleteFile } = useDeleteFile({
    onSuccess: () => {
      void queryClient.invalidateQueries([
        'api/applicant/:id/course/:sectionDataId/history'
      ]);
    }
  });

  const deleteDoc = (name: string): void => {
    DeleteFile(name, {
      onSuccess: () => {
        void queryClient.invalidateQueries(['/api/sub-activity']);
        void message.success('Successfully deleted', 2);
      },
      onError: ({
        response: {
          data: { message: errorMessage }
        }
      }: IErrorMessage) => {
        void message.error(errorMessage, 2);
      }
    });
  };

  const handlePreview = (path: string): void => {
    setOpenPreview(true);
    setUrl(path);
  };

  return (
    <>
      {history.files.map((f) => {
        let fileTitle: string = f?.originalName?.slice(0, 18);
        if (f?.originalName?.length > 18) {
          fileTitle += '...';
        }
        return (
          <SingleFile
            key={f.originalName}
            justify={'space-between'}
            wrap={false}
          >
            <Space.Compact
              style={{ gap: '8px', fontSize: 'var(--base-font-size)' }}
            >
              <Tooltip placement="top" title={f?.originalName}>
                <a
                  key={f.originalName}
                  className="file"
                  href={f.path}
                  target="_blank"
                  download={f.path}
                  rel="noreferrer"
                >
                  {fileTitle}
                </a>
              </Tooltip>
            </Space.Compact>
            <Space.Compact style={{ gap: '8px' }}>
              <DeleteSvg
                style={{ width: '9px', cursor: 'pointer' }}
                onClick={() => deleteDoc(f.name)}
              />
              <EyeOutlined
                style={{ cursor: 'pointer' }}
                onClick={() => handlePreview(f?.path)}
              />
            </Space.Compact>
          </SingleFile>
        );
      })}
    </>
  );
};

export default FileMap;
