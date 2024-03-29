import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Tabs } from 'antd';
import TabPane from 'antd/lib/tabs/TabPane';

import { AsnTreeFiles } from './AsnTree';
import { SearchImport } from './Search';
import { useProject } from '../../hooks/useProject';
import useGetCoursFile from '../../api/Files/useGetCoursFile';
import useGetAllFile from '../../api/Files/useGetProjectFileAll';
import useGetFolderFiles from '../../api/Files/useGetFolderFiles';
import { ReactComponent as OpenFolder } from '../Files/UploadImg/fileOpen.svg';

const Tab = styled.div`
  display: flex;
  padding: 56px 0 0 0;
  .ant-tabs {
    .ant-tabs-nav,
    .ant-tabs > div > .ant-tabs-nav {
      position: inherit !important;
      margin: 0;
    }

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: var(--dark-border-ultramarine) !important;
      font-size: var(--headline-font-size);
    }
    .ant-tabs-ink-bar {
      background: none;
    }
    .ant-tabs-nav-list {
      clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 100%, 89% 0);
      background: var(--white);
      height: 72px;
      border-radius: 40px 30px 0px 0px;
      display: flex;
      width: 305px;
      padding: 0 20px;
    }
  }
  .ant-tree-list {
    width: 366px;
    border-right: 1px solid var(--primary-light-2);
  }
  .ant-tabs-content-holder {
    height: calc(100vh - 188px);
    background: var(--white);
    border-right: 1px solid var(--primary-light-2);
    width: 366px;
    z-index: 1;
  }
  .ant-tabs-nav-wrap {
    background-color: var(--primary-light-3);
  }
  .ant-tree .ant-tree-treenode {
    margin: 0 60px 4px;
    font-size: var(--base-font-size);
  }
  .ant-tree-treenode-selected:before {
    background: var(--primary-light-2) !important;
  }
  .ant-tree-node-selected {
    top: 4px;
    color: var(--dark-2) !important;
  }
  .ant-tree.ant-tree-directory .ant-tree-treenode .ant-tree-switcher {
    position: relative;
    color: var(--dark-2) !important;
  }
`;

const Files: React.FC = () => {
  const [courseId, setCourseId] = useState<string | null>(null);
  const [folderId, setFolderId] = useState<string>('');
  const [folderName, setFolderName] = useState<string>('');
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [offset, setOffset] = useState<number>(0);

  const { id } = useParams();
  const { projectName } = useProject();

  const {
    data: { result: files, count: filesCount, allCount },
    refetch: refetchAllFiles, isFetching: isFetchingAllFiles
  } = useGetAllFile(id, offset, 24, search, { enabled: Boolean(id) && (courseId === null) });

  const {
    data: { result: courseFiles }, refetch, isFetching: isFetchingCourseFiles
  } = useGetCoursFile(courseId, search, { enabled: Boolean(courseId) });

  const { data: { result: folderFiles }, isFetching: isFetchingFolderFiles, refetch: refetchFolderFiles } =
    useGetFolderFiles(courseId,
      folderId,
      { enabled: (Boolean(folderId) && Boolean(courseId)) }
    );

  return (
    <Tab>
      <Tabs>
        <TabPane
          tab={
            <>
              <OpenFolder />
              {projectName} folders
            </>
          }
        >
          <AsnTreeFiles
            setCourseId={setCourseId}
            courseFiles={courseFiles}
            refetchAllFiles={refetchAllFiles}
            isFetching={isFetchingCourseFiles}
            setSearch={setSearch}
            search={search}
            setFolderId={setFolderId}
            isFetchingFolderFiles={isFetchingFolderFiles}
            setFolderName={setFolderName}
            filesCount={allCount}
            folderId={folderId}
            courseId={courseId}
          />
        </TabPane>
      </Tabs>
      <SearchImport
        setSearch={setSearch}
        refetch={refetch}
        courseId={courseId}
        files={files}
        courseFiles={courseFiles}
        folderFiles={folderFiles}
        folderId={folderId}
        isFetchingFolderFiles={isFetchingFolderFiles}
        folderName={folderName}
        setFolderId={setFolderId}
        setFolderName={setFolderName}
        refetchFolderFiles={refetchFolderFiles}
        refetchAllFiles={refetchAllFiles}
        setOffset={setOffset}
        filesCount={filesCount}
        isFetchingAllFiles={isFetchingAllFiles}
        isFetchingCourseFiles={isFetchingCourseFiles}
        offset={offset}
      />
    </Tab>
  );
};

export default Files;
