import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Typography, Space, Row, message } from 'antd';
import styled from 'styled-components';

import { AsnModal } from '../../../../Forms/Modal';
import FilesPreviewModal from './FilesPreviewModal';
import UploadService from './UploadService';
import { IErrorMessage } from '../../../../../types/project';
import { IGeneralDocuments } from '../../../../../types/api/activity/subActivity';
import { findFileType } from '../../../../../helpers/utils';
import useDeleteFile from '../../../../../api/Files/useDeleteFile';

import { ReactComponent as DeleteSvg } from '../../../../../assets/icons/delete.svg';
import { ReactComponent as NotUploaded } from '../../SubActivityIcons/not-uploaded-docs.svg';
import { EyeOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const AntModal = styled(AsnModal)`
    max-width: 720px;
   .ant-modal-content {
    padding: 32px;
   }
`;

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

const GeneralDocuments: React.FC<IGeneralDocuments> = ({ generalFiles, courseId, openGeneralDocs, setOpenGeneralDocs }) => {
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [url, setUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { mutate: DeleteFile } = useDeleteFile();

  const deleteDoc = (name: string): void => {
    DeleteFile(name, {
      onSuccess: () => {
        void queryClient.invalidateQueries(['/api/sub-activity']);
        void message.success('Successfully deleted', 2);
      },
      onError: ({ response: { data: { message: errorMessage } } }: IErrorMessage) => {
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
      <AntModal
        footer={false}
        open={openGeneralDocs}
        width="50vw"
        onCancel={() => setOpenGeneralDocs(false)}
        centered
      >
        <Row justify='center' style={{ marginBottom: '32px' }}>
          <UploadService
            type="GENERAL_DOCUMENT"
            courseId={courseId}
          />
        </Row>
        <Space direction='vertical' style={{ width: '100%', overflowY: 'auto', maxHeight: '350px', padding: '12px' }}>
          {generalFiles.length > 0
            ? generalFiles?.map((file) => (
              <SingleFile key={file.id} justify={'space-between'} wrap={false}>
                <Space.Compact style={{ gap: '8px', fontSize: 'var(--base-font-size)' }}>
                  {findFileType(file.name)}
                  <Paragraph
                    ellipsis={{ rows: 1, expandable: true, symbol: <>View More</> }}
                    style={{ width: '30vw', margin: 0, maxWidth: '500px' }}
                  >
                    {file?.originalName}
                  </Paragraph>
                </Space.Compact>
                <Space.Compact style={{ gap: '8px' }}>
                  <DeleteSvg style={{ width: '9px', cursor: 'pointer' }} onClick={() => deleteDoc(file.name)} />
                  <EyeOutlined style={{ cursor: 'pointer' }} onClick={() => handlePreview(file?.path)} />
                </Space.Compact>
              </SingleFile>
            ))
            : <Space direction='vertical' style={{ width: '100%' }} align='center'>
              <NotUploaded />
              <Paragraph>No files attached</Paragraph>
            </Space>
          }
        </Space>
      </AntModal>
      <FilesPreviewModal
        setUrl={setUrl}
        url={url}
        openPreview={openPreview}
        setOpenPreview={setOpenPreview}
      />
    </>
  );
};

export default GeneralDocuments;
