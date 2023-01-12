import React from 'react';
import { useParams } from 'react-router-dom';
import { Tree, Typography } from 'antd';
import type { DataNode } from 'antd/es/tree';

import useGetProjectFiles from '../../api/Files/useGetProjectFiles';
import useGetResultAreaFile from '../../api/Files/useGetResultAreFiles';
import useGetInputActivity from '../../api/Files/useGetInputActivity';
import useGetAllFile from '../../api/Files/useGetProjectFileAll';
import useGetCourseFile from '../../api/Files/useGetCoursFile';
import useGetCoursSectionFile from '../../api/Files/useGetCoursSectiondataFile';

import { LeftOutlined } from '@ant-design/icons';

const { Title } = Typography;

const { DirectoryTree } = Tree;

export const Files: React.FC = () => {
  const { id } = useParams();
  const { data } = useGetProjectFiles(id);
  const title = useGetResultAreaFile(id);
  const nameCours = useGetInputActivity(id);
  const allFile = useGetAllFile(id);
  const cors = useGetCourseFile(id);
  const aaa = useGetCoursSectionFile(id);
  console.log(aaa, 'aaaaaaaaaaaaaa');

  const defaultVal: DataNode[] = data?.result?.map(
    (item: any, i: string) => {
      return {
        title: item?.title,
        key: i,
        children: title?.data?.result?.map((name: any, j: string) => {
          return {
            title: name?.title,
            key: `${i}-${j}`,
            children: nameCours?.data?.result?.map((course: any, f: string) => {
              return {
                title: course?.title,
                key: `${i}-${j}-${f}`,
                children: cors?.data?.result?.folders.map((file: any, k: string) => {
                  return {
                    title: file?.title,
                    key: `${i}-${j}-${f}-${k}`,
                    isLeaf: true
                  };
                })
              };
            })
          };
        })
      };
    }
  );

  return (
    <>
      <DirectoryTree
        switcherIcon={<LeftOutlined />}
        multiple
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
        All Files ({allFile?.data?.count})
      </Title>
    </>
  );
};
