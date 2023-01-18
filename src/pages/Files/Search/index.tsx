import React, { useState } from 'react';
import styled from 'styled-components';
import { AutoComplete } from 'antd';
import DataResult from '../DataResult';
import { ISearchImport } from '../../../types/files';
import useDeleteFile from '../../../api/Files/useDeleteFile';
import useGetAllSearchFile from '../../../api/Files/useGetSearchAllFile';
import { useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';

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
export const SearchImport: React.FC<ISearchImport> = ({ files, courseFiles, courseId, refetch, search, setSearch, folderFiles, folderId, isFetchingFolderFiles }) => {
  const onChange = (data: string): void => {
    setSearch(data);
  };
  const { id } = useParams();
  const { data: allfileSearch } = useGetAllSearchFile(id, search, {
    enabled: search.length > 2,
    staleTime: 1000 * 60 * 5
  });

  const [open, setOpen] = useState<string>('');

  const { mutate: DeleteFile } = useDeleteFile({});

  const onRemoveFile = (name?: any): void => {
    DeleteFile(name);
  };
  return (
    <SearchImportData>
      {(folderId === '' && courseId === null) && <Search>
        <AutoComplete
          value={search}
          style={{ width: 300 }}
          onChange={onChange}
          placeholder="Search..."
        />
      </Search>
      }
      <UploadModal>
        <DataResult
          fileList={allfileSearch?.result?.length >= 0 ? allfileSearch?.result : (!isEmpty(courseFiles) && folderId === '') ? courseFiles : folderId !== '' ? folderFiles : files }
          open={open}
          setOpen={setOpen}
          onRemoveFile={onRemoveFile}
          courseId={courseId}
          refetch={refetch}
          isFetchingFolderFiles={isFetchingFolderFiles}
          folderId={folderId}
        />
      </UploadModal>
    </SearchImportData>
  );
};
