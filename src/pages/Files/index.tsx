/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Row, Tree, Typography } from 'antd';
import type { DataNode } from 'antd/es/tree';

import { IFilesProps } from '../../types/files';
import useGetProjectFiles from '../../api/Files/useGetProjectFiles';
import useGetResultAreaFile from '../../api/Files/useGetResultAreFiles';
import useGetInputActivity from '../../api/Files/useGetInputActivity';
import { ReactComponent as OpenFolder } from './UploadImg/fileOpen.svg';
import { ReactComponent as CloseFolder } from './UploadImg/fileClose.svg';
import { ReactComponent as Folder } from './UploadImg/folder.svg';
import { ReactComponent as Up } from './UploadImg/up.svg';
import { ReactComponent as Down } from './UploadImg/down.svg';

const { Title } = Typography;

const { DirectoryTree } = Tree;
const AsnTree = styled(DirectoryTree)`
  .ant-tree-switcher{
    display: none;
  } .ant-tree-switcher_close{
    display: none;
  }
`;
const AsnRow = styled(Row)`
  align-items: center;
  padding-bottom: 10px;
`;

export const Files: React.FC<IFilesProps> = ({
  allFilesCount,
  setCourseId,
  courseFiles,
  refetchAllFiles
}) => {
  const { id } = useParams();
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const { data } = useGetProjectFiles(id);
  const title = useGetResultAreaFile(id);
  const { data: courseNames } = useGetInputActivity(id);
  console.log(expandedKeys, 'keys');
  const defaultVal: DataNode[] = data?.result?.map((item: any, i: string) => {
    return {
      title: <AsnRow onClick={() => setExpandedKeys([i]) }>
        {expandedKeys[0] === i ? <OpenFolder style={{ marginRight: '10px' }} /> : <CloseFolder style={{ marginRight: '10px', width: '24px', height: '15px' }} /> }
        {item?.title}
        {expandedKeys[0] === i ? <Up style={{ marginLeft: '20px' }}/> : <Down style={{ marginLeft: '20px' }} /> }
      </AsnRow>,
      key: i,
      icon: <></>,
      children: title?.data?.result?.map((name: any, j: string) => {
        return {
          title: <AsnRow onClick={() => setExpandedKeys([i, `${i}-${j}`]) }>
              {expandedKeys[1] === `${i}-${j}` ? <OpenFolder style={{ marginRight: '10px' }} /> : <CloseFolder style={{ marginRight: '10px', width: '24px', height: '15px' }} /> }
            {name?.title}
            {expandedKeys[1] === `${i}-${j}` ? <Up style={{ marginLeft: '20px' }}/> : <Down style={{ marginLeft: '20px' }} /> }
            </AsnRow>,
          key: `${i}-${j}`,
          icon: <></>,
          children: courseNames?.result?.map((course: any, f: string) => {
            if (course?.count > 0) {
              return {
                title: (
                  <AsnRow onClick={(e) => {
                    setCourseId(course.id);
                    setExpandedKeys([i, `${i}-${j}`, `${i}-${j}-${f}`]);
                  }}>
                      {expandedKeys[2] === `${i}-${j}-${f}` ? <OpenFolder style={{ marginRight: '10px' }} /> : <CloseFolder style={{ marginRight: '10px', width: '24px', height: '15px' }} /> }
                   {course?.title}
                   {expandedKeys[2] === `${i}-${j}-${f}` ? <Up style={{ marginLeft: '20px' }}/> : <Down style={{ marginLeft: '20px' }} /> }
                  </AsnRow>
                ),
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                key: `${i}-${j}-${f}`,
                icon: <></>,
                children: courseFiles?.folders.map((file, k: number) => {
                  return {
                    title: <AsnRow align={'middle'}>
                      <Folder style={{ marginRight: '10px' }} />
                      {file?.title}
                      </AsnRow>,
                    icon: <></>,
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    key: `${i}-${j}-${course.id}-${k}`,
                    isLeaf: true
                  };
                })
              };
            }
          })
        };
      })
    };
  });

  return (
    <>
      <AsnTree
        switcherIcon={false}
        multiple={false}
        treeData={defaultVal}
        expandedKeys={expandedKeys}
      />
      <Title
        style={{
          color: 'var(--dark-2)',
          fontSize: 'var(--base-font-size)',
          fontWeight: 'var(--font-normal)',
          padding: '0 20px'
        }}
      >
        <Button
          type="link"
          style={{ color: 'var(--dark-border-ultramarine)' }}
          onClick={() => {
            setCourseId(null);
            refetchAllFiles();
          }}
        >
          {' '}
          All Files ({allFilesCount})
        </Button>
      </Title>
    </>
  );
};
