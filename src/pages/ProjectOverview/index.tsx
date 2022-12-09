import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Typography, Space } from 'antd';

import InfoHeader from '../../components/InfoHeader';
import { useGetProjectById } from '../../api/Project/useGetProject';
import { ReactComponent as AddResultAreaSvg } from '../../assets/icons/projectOverview.svg';

const { Text } = Typography;
const ProjectOverview: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const data = useGetProjectById(id);
  console.log(data);
  const { project }: any = data;

  const items = project?.resultAreas?.map((item: { title: string, id: string, inputActivities: [] }, i: number) => {
    return {
      label: `${item?.title}`,
      key: `${item?.id}`,
      children: (
        <>
          <Tabs
           tabPosition={'left'}
            items={item?.inputActivities?.map((item: { title: string, id: string }, i: number) => {
              return {
                label: `${item?.title}`,
                key: `${item?.id}`
              };
            })}
        />
        </>
      )
    };
  });
  return (
    <>
      <InfoHeader overview={true} project={data?.project} />
      {project?.resultAreas.length !== 0
        ? (
        <Tabs defaultActiveKey="1" type="card" items={items} style={{ paddingLeft: '40px' }} />
          )
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        : <Space direction='vertical' align='center' style={{ width: '100%', paddingTop: '15vh', cursor: 'pointer' }} onClick={() => navigate(`/project/${id}/steps/0`)}>
          <AddResultAreaSvg />
          <Text
           style={ { color: 'var(--dark-border-ultramarine', fontSize: 'var(--headline-font-size)' } }
           >
            Input result areas and activities
          </Text>
          </Space>
         }
    </>
  );
};

export default ProjectOverview;
