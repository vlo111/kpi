import React, { useState } from 'react';
import { Upload, Button, UploadFile, UploadProps } from 'antd';
// import { DocumentModal } from '../Popover'
import { UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import DataResult from '../DataResult';

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

  const onRemoveFile = (id?: string): void => {
    setFileList([...fileList.filter((item) => item?.uid !== id)]);
    setOpen('');
  };

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
      <DataResult fileList={fileList} open={open} setOpen={setOpen} onRemoveFile={onRemoveFile}/>
      {/* <DocumentModal open={open} setOpen={setOpen} draggerProps={draggerProps} onRemoveFile={onRemoveFile}/> */}
    </UploadModal>
  );
};
