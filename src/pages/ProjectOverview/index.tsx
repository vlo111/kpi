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
import { useParams } from 'react-router-dom';
import React from 'react';
import { useGetProjectById } from '../../api/Project/useGetProject';

export const ProjectOverview: React.FC = () => {
  const { id } = useParams<string>();
  const data = useGetProjectById(id);

  return (
    <>
      <p><b>Title: </b> {data?.project?.title}</p>
      <p><b>Description: </b> {data?.project?.description}</p>
      <p><b>Description: </b> {data?.project?.startDate}</p>
      <p><b>Description: </b> {data?.project?.endDate}</p>
    </>
  );
};
