import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AutoComplete } from 'antd';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import { defaultLimit } from '../../../helpers/constants';
import DataResult from '../DataResult';
import { ISearchImport, IPaginate } from '../../../types/files';
import useDeleteFile from '../../../api/Files/useDeleteFile';
import useGetAllSearchFile from '../../../api/Files/useGetSearchAllFile';
import useGetSearchCourseFile from '../../../api/Files/useGetSearchCourseFile';

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
    search,
    setSearch,
    folderFiles,
    folderId,
    isFetchingFolderFiles,
    folderName,
    setFolderId,
    setFolderName,
    refetchFolderFiles,
    refetchAllFiles,
    setPaginate,
    filesCount,
    currentPage,
    isFetchingAllFiles
  }) => {
    const [open, setOpen] = useState<string>('');
    const [searchPaginate, setSearchPaginate] = useState<IPaginate>(defaultLimit);
    const { id } = useParams();
    const { limit, offset, currentPage: searchCurrentPage } = searchPaginate;
    const { data: allfileSearch, isFetching: isFetchingAllFilesSearch, refetch: refetchAllFilesSearch } = useGetAllSearchFile(id, search, offset, limit, {
      enabled: ((search !== undefined) && search.length > 2 && (courseId === null || courseId === '')),
      staleTime: 1000 * 60 * 5
    });
    const { data: { result: searchFilesCourse }, isFetching: isFetchingSearchCourseFiles } = useGetSearchCourseFile(courseId, search, { enabled: (Boolean(courseId) && (search !== undefined) && search.length > 2), staleTime: 1000 * 60 * 5 });

    const { mutate: DeleteFile } = useDeleteFile({});
    const onChange = (data: string): void => {
      setSearch(data);
      if (courseId === null) {
        setSearchPaginate({
          offset: 0,
          limit: 24,
          currentPage: 1
        });
      }
    };
    const onRemoveFile = (name: any): void => {
      DeleteFile(name, {
        onSuccess: () => {
          if (courseId !== null && folderId !== '') {
            refetchFolderFiles();
            refetchAllFiles();
          }
          if (courseId !== null && folderId === '') {
            refetch();
            refetchAllFiles();
          }
          if (courseId === null && folderId === '') {
            refetchAllFiles();
          }
        }
      });
    };
    useEffect(() => {
      if (search.length > 2 && courseId === null) {
        refetchAllFilesSearch();
      }
    }, [offset, limit, search]);
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
            fileList={allfileSearch?.result?.length >= 0 && (courseId === '' || courseId === null) ? allfileSearch?.result : (!isEmpty(courseFiles) && folderId === '' && ((search !== undefined) && search.length <= 2)) ? courseFiles : folderId !== '' ? folderFiles : ((search !== undefined) && search.length > 2) ? searchFilesCourse : files}
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
            isFetchingAllFilesSearch={isFetchingAllFilesSearch}
            isFetchingSearchCourseFiles={isFetchingSearchCourseFiles}
            setPaginate={setPaginate}
            filesCount={filesCount}
            refetchAllFiles={refetchAllFiles}
            setSearchPaginate={setSearchPaginate}
            search={search}
            allFilesSearchCount={allfileSearch?.count}
            currentPage={currentPage}
            searchCurrentPage={searchCurrentPage}
            isFetchingAllFiles={isFetchingAllFiles}
          />
        </UploadModal>
      </SearchImportData>
    );
  };
