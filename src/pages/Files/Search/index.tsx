import React, { useState } from 'react';
import styled from 'styled-components';
import { Upload, Button, UploadFile, UploadProps, AutoComplete } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import DataResult from '../DataResult';
import { ISearchImport } from '../../../types/files';
import useDeleteFile from '../../../api/Files/useDeleteFile';
import useGetAllSearchFile from '../../../api/Files/useGetSearchAllFile';
import { useParams } from 'react-router-dom';

const SearchImportData = styled.div`
  width: 100%;
  .ant-select-show-search.ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border-radius: 10px;
    color: var(--dark-4);
  }
`;
const Search = styled.div`
  background-color: var(--primary-light-3);
  height: 72px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 10px;
`;
const UploadModal = styled.div`
  .ant-upload-select-picture {
    display: flex;
    justify-content: end;
    padding: 20px 16px;
  }
  .ant-upload-list-item-card-actions {
    display: none;
  }
`;
export interface projectFilesUploadFormProps {
  handleUpdateAndNext: (updateProjectDetails: () => void) => void
  handleBack: () => void
}
export const SearchImport: React.FC<ISearchImport> = ({ files }) => {
  const [value, setValue] = useState('');

  const onChange = (data: string): void => {
    setValue(data);
  };
  const { id } = useParams();
  const { data: allfileSearch } = useGetAllSearchFile(id, value, {
    enabled: value.length > 2,
    staleTime: 1000 * 60 * 5
  });

  const [open, setOpen] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[] | []>([]);

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

  return (
    <SearchImportData>
      <Search>
        <AutoComplete
          value={value}
          style={{ width: 200 }}
          onChange={onChange}
          placeholder="Search..."
        />
      </Search>
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
        <DataResult
          fileList={allfileSearch?.result?.length >= 0 ? allfileSearch?.result : files }
          open={open}
          setOpen={setOpen}
          onRemoveFile={onRemoveFile}
        />
      </UploadModal>
    </SearchImportData>
  );
};
