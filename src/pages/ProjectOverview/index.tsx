import React from 'react';
import { Tabs } from 'antd';

import InfoHeader from '../../components/InfoHeader';

const items = new Array(3).fill(null).map((_, i) => {
  const id = String(i + 1);
  return {
    label: `Tab Title ${id}`,
    key: id,
    children: (
      <>
        <Tabs
         tabPosition={'left'}
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Tab ${id}`,
              key: id,
              children: `Content of Tab ${id}`
            };
          })}
      />
      </>
    )
  };
});

const ProjectOverview: React.FC = () => {
  return (
    <>
      <InfoHeader overview={true} />
      <Tabs defaultActiveKey="1" type="card" items={items} style={{ paddingLeft: '40px' }} />
    </>
  );
};

export default ProjectOverview;
