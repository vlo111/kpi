import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AutoComplete } from 'antd';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import AsnSpin from '../../../components/Forms/Spin';
import DataResult from '../DataResult';
import { ISearchImport } from '../../../types/files';
import useDeleteFile from '../../../api/Files/useDeleteFile';
import useGetAllSearchFile from '../../../api/Files/useGetSearchAllFile';
import useGetSearchCourseFile from '../../../api/Files/useGetSearchCourseFile';

const SearchImportData = styled.div`
  width: 100%;
  background-color: white;
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
export const SearchImport: React.FC<ISearchImport> = ({ files, courseFiles, courseId, refetch, search, setSearch, folderFiles, folderId, isFetchingFolderFiles, folderName, setFolderId, setFolderName, refetchFolderFiles, refetchAllFiles }) => {
  const onChange = (data: string): void => {
    setSearch(data);
  };
  const { id } = useParams();
  const { data: allfileSearch } = useGetAllSearchFile(id, search, {
    enabled: (search.length > 2 && (courseId === null || courseId === '')),
    staleTime: 1000 * 60 * 5
  });
  const { data: { result: searchFilesCourse }, isFetching: isFetchingSearchCourseFiles } = useGetSearchCourseFile(courseId, search, { enabled: (Boolean(courseId) && search.length > 2), staleTime: 1000 * 60 * 5 });

  const [open, setOpen] = useState<string>('');

  const { mutate: DeleteFile } = useDeleteFile({});

  const onRemoveFile = (name: any): void => {
    DeleteFile(name, {
      onSuccess: () => {
        if (courseId !== null && folderId !== '') {
          refetchFolderFiles();
        }
        if (courseId !== null && folderId === '') {
          refetch();
        }
        if (courseId === null && folderId === '') {
          refetchAllFiles();
        }
      }
    });
  };
  if (isFetchingSearchCourseFiles === true) {
    return <AsnSpin />;
  }
  return (
    <SearchImportData>
      {(folderId === '') && <Search>
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
          fileList={allfileSearch?.result?.length >= 0 ? allfileSearch?.result : (!isEmpty(courseFiles) && folderId === '' && (search.length <= 2)) ? courseFiles : folderId !== '' ? folderFiles : (search.length > 2) ? searchFilesCourse : files }
          open={open}
          setOpen={setOpen}
          onRemoveFile={onRemoveFile}
          courseId={courseId}
          refetch={refetch}
          isFetchingFolderFiles={isFetchingFolderFiles}
          folderId={folderId}
          folderName={folderName}
          setFolderId={setFolderId}
          setFolderName={setFolderName}
          refetchFolderFiles={refetchFolderFiles}
        />
      </UploadModal>
    </SearchImportData>
  );
};
