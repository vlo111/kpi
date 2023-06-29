import React from 'react';
import { Input, message } from 'antd';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import DataResult from '../DataResult';
import { ISearchImport, ICourseFiles, IFiles } from '../../../types/files';
import useDeleteFile from '../../../api/Files/useDeleteFile';

const SearchImportData = styled.div`
  width: 100%;
  background-color: white;
  position: relative;
  padding-bottom: 50px;
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
export const SearchImport: React.FC<ISearchImport> =
  ({
    files,
    courseFiles,
    courseId,
    refetch,
    setSearch,
    folderFiles,
    folderId,
    isFetchingFolderFiles,
    folderName,
    setFolderId,
    setFolderName,
    refetchFolderFiles,
    refetchAllFiles,
    setOffset,
    filesCount,
    isFetchingAllFiles,
    isFetchingCourseFiles,
    offset
  }) => {
    const { mutate: DeleteFile } = useDeleteFile();
    const onChange = (data: React.ChangeEvent<HTMLInputElement>): void => {
      if (data.target.value === '') {
        setSearch(undefined);
      }
      if (courseId === null) {
        setOffset(0);
      }
    };

    const onPressEnter = (e: React.SyntheticEvent<HTMLInputElement>): void => {
      if (e.currentTarget.value.trim().length > 0) {
        setSearch(e.currentTarget.value.trim());
        setOffset(0);
      }
    };

    const onRemoveFile = (name: string | undefined): void => {
      DeleteFile(name, {
        onSuccess: () => {
          if (courseId !== null && folderId !== '') {
            void refetchFolderFiles();
            void refetchAllFiles();
          }
          if (courseId !== null && folderId === '') {
            void refetch();
            void refetchAllFiles();
          }
          if (courseId === null && folderId === '') {
            void refetchAllFiles();
          }
        },
        onError: (e: {
          response: {
            data: { message: string }
          }
        }) => {
          void message.error(e.response.data.message);
        }
      });
    };
    const filterSendingData = (): ICourseFiles | IFiles[] => {
      if ((!isEmpty(courseFiles) && folderId === '')) {
        return courseFiles;
      } else if (folderId !== '') {
        return folderFiles;
      } else {
        return files;
      }
    };

    return (
      <SearchImportData>
        {(folderId === '') && <Search>
          <Input
            style={{ width: 300, borderRadius: '10px' }}
            onChange={onChange}
            onPressEnter={onPressEnter}
            placeholder="Search..."
          />
        </Search>
        }
        <UploadModal>
          <DataResult
            fileList={filterSendingData()}
            onRemoveFile={onRemoveFile}
            courseId={courseId}
            refetch={refetch}
            isFetchingFolderFiles={isFetchingFolderFiles}
            folderId={folderId}
            folderName={folderName}
            setFolderId={setFolderId}
            setFolderName={setFolderName}
            refetchFolderFiles={refetchFolderFiles}
            setOffset={setOffset}
            filesCount={filesCount}
            refetchAllFiles={refetchAllFiles}
            offset={offset}
            isFetchingAllFiles={isFetchingAllFiles}
            isFetchingCourseFiles={isFetchingCourseFiles}
          />
        </UploadModal>
      </SearchImportData>
    );
  };
