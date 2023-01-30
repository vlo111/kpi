/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Col, Row, Tree, Typography } from 'antd';
import type { DataNode } from 'antd/es/tree';

import AsnSpin from '../../components/Forms/Spin';
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
const AsnCol = styled(Col)`
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const Files: React.FC<IFilesProps> = ({
  allFilesCount,
  setCourseId,
  courseFiles,
  refetchAllFiles,
  isFetching,
  setSearch,
  search,
  setFolderId,
  isFetchingFolderFiles,
  setFolderName
}) => {
  const { id } = useParams();
  const [expandedKeys, setExpandedKeys] = useState<any>([]);
  const [resultAreaId, setResultAreaId] = useState<string>('');
  const [inputActivityId, setInputActivityID] = useState<string>('');
  const { data } = useGetProjectFiles(id, { enabled: Boolean(id) });
  const { data: { result: resultAreas }, isFetching: isFetchingResultArea } = useGetResultAreaFile(resultAreaId, { enabled: Boolean(resultAreaId) });
  const { data: courseNames, isFetching: isFetchingInputActivity } = useGetInputActivity(inputActivityId, { enabled: Boolean(inputActivityId) });
  if (isFetching || isFetchingFolderFiles || isFetchingResultArea || isFetchingInputActivity) {
    return <AsnSpin />;
  }
  const defaultVal: DataNode[] = data?.result?.map((item: any, i: string) => {
    return {
      title: <AsnRow onClick={() => {
        if (expandedKeys.length > 0 && expandedKeys[0] === i) {
          setExpandedKeys([]);
        } else {
          setExpandedKeys([i]);
        }
        setResultAreaId(item.id);
      } }>
        {expandedKeys[0] === i ? <OpenFolder style={{ marginRight: '10px' }} /> : <CloseFolder style={{ marginRight: '10px', width: '24px', height: '15px' }} /> }
        <AsnCol>{item?.title}</AsnCol>
        {expandedKeys[0] === i ? <Up style={{ marginLeft: '20px' }}/> : <Down style={{ marginLeft: '20px' }} /> }
      </AsnRow>,
      key: i,
      icon: <></>,
      children: resultAreas?.map((name: any, j: string) => {
        return {
          title: <AsnRow onClick={() => {
            if (expandedKeys.length > 1 && expandedKeys[1] === `${i}-${j}`) {
              setExpandedKeys([i]);
            } else {
              setExpandedKeys([i, `${i}-${j}`]);
            }
            setInputActivityID(name.id);
          } }>
              {expandedKeys[1] === `${i}-${j}` ? <OpenFolder style={{ marginRight: '10px' }} /> : <CloseFolder style={{ marginRight: '10px', width: '24px', height: '15px' }} /> }
            <AsnCol>{name?.title}</AsnCol>
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
                    if (expandedKeys.length > 2 && expandedKeys[2] === `${i}-${j}-${f}`) {
                      setExpandedKeys([i, `${i}-${j}`]);
                    } else {
                      setExpandedKeys([i, `${i}-${j}`, `${i}-${j}-${f}`]);
                    }
                    setFolderId('');
                    if (search !== '') {
                      setSearch('');
                    }
                  }}>
                      {expandedKeys[2] === `${i}-${j}-${f}` ? <OpenFolder style={{ marginRight: '10px' }} /> : <CloseFolder style={{ marginRight: '10px', width: '24px', height: '15px' }} /> }
                   <AsnCol>{course?.title}</AsnCol>
                   {expandedKeys[2] === `${i}-${j}-${f}` ? <Up style={{ marginLeft: '20px' }}/> : <Down style={{ marginLeft: '20px' }} /> }
                  </AsnRow>
                ),
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                key: `${i}-${j}-${f}`,
                icon: <></>,
                children: courseFiles?.folders?.map((file, k: number) => {
                  return {
                    title: <AsnRow align={'middle'} onClick={() => {
                      setFolderName(file?.title);
                      setFolderId(file.id);
                    } }>
                      <Folder style={{ marginRight: '10px' }} />
                      <AsnCol>{file?.title}</AsnCol>
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
          style={{ color: 'var(--dark-border-ultramarine)', fontSize: 'var(--base-font-size)' }}
          onClick={() => {
            setCourseId(null);
            setFolderId('');
            if (search !== '') {
              setSearch('');
            }
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
