import React, { useState } from 'react';
import { Upload, Button, UploadFile, UploadProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import DataResult from '../DataResult';
import useGetAllFile from '../../../api/Files/useGetProjectFileAll';
import { useParams } from 'react-router-dom';
import useDeleteFile from '../../../api/Files/useDeleteFile';

export interface projectFilesUploadFormProps {
  handleUpdateAndNext: (updateProjectDetails: () => void) => void
  handleBack: () => void
}
const UploadModal = styled.div`
  .ant-upload-select-picture {
    display: flex;
    justify-content: end;
    padding: 20px 16px;
  }
  .ant-upload-list-item-card-actions{
    display: none;
  }
`;

export const UploadDocument: React.FC = () => {
  const [open, setOpen] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[] | []>([]);
  const [fileListCours, setfileListCours] = useState([]);

  const { id } = useParams();
  const { mutate: DeleteFile } = useDeleteFile({});

  const draggerProps = (): UploadProps => {
    return {
      name: 'file',
      multiple: true,
      onChange (info: { fileList: UploadFile[] }) {
        const fileList = [...info.fileList];
        setFileList(fileList);
      },
      beforeUpload: () => false,
      accept: '.jpg,.pdf,.xlsx,.docx,.jpeg,.png',
      fileList
    };
  };

  const onRemoveFile = (name?: any): void => {
    DeleteFile(name);
  };

  const info = useGetAllFile(id);
  if (info.status === 'success' && !fileListCours[0]) {
    setfileListCours(info.data.result);
  }

  return (
    <UploadModal>
      <Upload
        listType="picture"
        style={{ borderRadius: 0, width: '50%' }}
        multiple
        onRemove={() => onRemoveFile()}
        {...draggerProps()}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Upload</Button>
      </Upload>
      <DataResult fileList={fileListCours} open={open} setOpen={setOpen} onRemoveFile={onRemoveFile}/>
    </UploadModal>
  );
};
