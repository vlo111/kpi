import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import styled from 'styled-components';

import { Files } from '..';
import { SearchImport } from '../Search';
import useGetCoursFile from '../../../api/Files/useGetCoursFile';
import TabPane from 'antd/lib/tabs/TabPane';
import { FolderOpenOutlined } from '@ant-design/icons';
import useGetAllFile from '../../../api/Files/useGetProjectFileAll';

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
  }
  .ant-tabs-nav-wrap {
    background-color: var(--primary-light-3);
  }
  .ant-tree .ant-tree-treenode {
    margin: 0 60px 4px;
    /* height: 40px; */
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
    /* left: 70%; */
    color: var(--dark-2) !important;
  }
`;

export const FileHeader: React.FC = () => {
  const [courseId, setCourseId] = useState<string | null>(null);
  const { id } = useParams();
  const {
    data: { result: files }
  } = useGetAllFile(id, { enabled: Boolean(id) });
  const {
    data: { result: courseFiles }, refetch
  } = useGetCoursFile(courseId, { enabled: Boolean(courseId) });
  return (
    <Tab>
      <Tabs>
        <TabPane
          tab={
            <>
              <FolderOpenOutlined />
              AWDA folders
            </>
          }
        >
          <Files
            allFilesCount={files?.length}
            setCourseId={setCourseId}
            courseFiles={courseFiles}
          />
        </TabPane>
      </Tabs>
      <SearchImport refetch={refetch} courseId={courseId} files={files} courseFiles={courseFiles} />
    </Tab>
  );
};
