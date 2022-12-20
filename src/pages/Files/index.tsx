import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tree, Typography } from 'antd';
import type { DirectoryTreeProps } from 'antd/es/tree';

import useGetProjectFiles from '../../api/Files/useGetProjectFiles';
import {
  LeftOutlined
} from '@ant-design/icons';

const { Title } = Typography;

const { DirectoryTree } = Tree;

export const Files: React.FC = () => {
  // const [defaultVal] = useState(fileOpload);
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const data = useGetProjectFiles(id);
  console.log(data, 'ariii xndrum em');
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    setOpen(info.expanded);
    console.log(open);
  };

  return (
    <>
    <DirectoryTree
      switcherIcon={<LeftOutlined />}
      multiple
      onSelect={onSelect}
      onExpand={onExpand}
      // treeData={defaultVal}
    />
    <Title style={{ color: 'var(--dark-2)', fontSize: 'var(--base-font-size)', fontWeight: 'var(--font-normal)', padding: '0 20px' }}>All Files (20)</Title>
    </>
  );
};
