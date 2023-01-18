/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable array-callback-return */
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Tree, Typography } from 'antd';
import type { DataNode } from 'antd/es/tree';

import { IFilesProps } from '../../types/files';
import useGetProjectFiles from '../../api/Files/useGetProjectFiles';
import useGetResultAreaFile from '../../api/Files/useGetResultAreFiles';
import useGetInputActivity from '../../api/Files/useGetInputActivity';
import { LeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

const { DirectoryTree } = Tree;

export const Files: React.FC<IFilesProps> = ({
  allFilesCount,
  setCourseId,
  courseFiles,
  refetchAllFiles
}) => {
  const { id } = useParams();
  const { data } = useGetProjectFiles(id);
  const title = useGetResultAreaFile(id);
  const { data: courseNames } = useGetInputActivity(id);

  const openUpload = (course: any): any => {
    setCourseId(course?.id);
  };
  const defaultVal: DataNode[] = data?.result?.map((item: any, i: string) => {
    return {
      title: item?.title,
      key: i,
      children: title?.data?.result?.map((name: any, j: string) => {
        return {
          title: name?.title,
          key: `${i}-${j}`,
          children: courseNames?.result?.map((course: any, f: string) => {
            if (course?.count > 0) {
              return {
                title: (
                  <span onClick={(e) => openUpload(course)}>
                    {course?.title}
                  </span>
                ),
                key: `${i}-${j}-${f}`,
                children: courseFiles?.folders.map((file, k: number) => {
                  return {
                    title: file?.title,
                    key: `${i}-${j}-${f}-${k}`,
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
      <DirectoryTree
        switcherIcon={<LeftOutlined />}
        multiple={false}
        treeData={defaultVal}
      />

      <Title
        style={{
          color: 'var(--dark-2)',
          fontSize: 'var(--base-font-size)',
          fontWeight: 'var(--font-normal)',
          padding: '0 20px'
        }}
      >
        <Button type='link' style={{ color: 'var(--dark-border-ultramarine)' }} onClick={() => {
          setCourseId(null);
          refetchAllFiles();
        }
       }> All Files ({allFilesCount})</Button>

      </Title>
    </>
  );
};
