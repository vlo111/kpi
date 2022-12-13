import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Typography, Space, Badge, Row, Tooltip } from 'antd';
import styled from 'styled-components';

import InfoHeader from '../../components/InfoHeader';
import { AsnButton } from '../../components/Forms/Button';
import { AsnTabs } from '../../components/Forms/Tabs';
import { IResultAreas, IInputActivities } from '../../types/project';
import useGetProjectById from '../../api/Project/useGetProject';
import { ReactComponent as AddResultAreaSvg } from '../../assets/icons/projectOverview.svg';
import { ReactComponent as EditPublishSvg } from '../../assets/icons/editpublish.svg';

const { Text } = Typography;

const AntRow = styled(Row)`
  padding: 8px 16px;
  width: 16vw;
`;

const ProjectOverview: React.FC = () => {
  const [active, setActive] = useState<number>(1);
  const { id } = useParams<string>();
  const data = useGetProjectById(id);
  const navigate = useNavigate();

  const { result: project } = data?.data;

  const AntBadge = styled(Badge)`
   margin-right: 4px;
   .ant-badge-count{
   background: ${({ count }) => count === active ? 'var(--white)' : 'var(--dark-6)'}; 
   color: var( --dark-border-ultramarine);
   box-shadow: 0 0 0 1px var( --dark-border-ultramarine);
   font-size: var(--font-size-semismall);
   border-radius: 100%;
}
`;
  const operations = <AsnButton className='draft' onClick={() => navigate(`/project/${(id != null) ? id : ''}/steps/0`)}>Draft</AsnButton>;
  const projectItems = project?.resultAreas.length;
  const items = project?.resultAreas?.map((item: IResultAreas, i: number) => {
    return {
      label:
        <Tooltip
          title={item?.title}
          color='var(--dark-6)'
          overlayInnerStyle={{ color: 'var(--dark-border-ultramarine)', fontSize: 'var(  --base-font-size)' }}
        >
          <AntRow
            wrap={false}
            align='middle'
            onClick={() => setActive(i + 1)}
            style={projectItems > 3 ? { width: '70px' } : {}}
          >
            <AntBadge count={i + 1} />
            {projectItems <= 3 && <Text ellipsis={true} style={{ width: '85%' }}>{item?.title}</Text>}
          </AntRow>
        </Tooltip>,
      key: `${item?.id}`,
      children: (
        <>
          <Tabs
            tabPosition={'left'}
            items={item?.inputActivities?.map((item: IInputActivities, i: number) => {
              return {
                label: <AntRow style={{ width: '18vw' }}>1.{i + 1} {item?.title}</AntRow>,
                key: `${item?.id}`,
                children: (
                  <Space direction='vertical' align='center' style={{ width: '100%', padding: '5vh 0 30px 0' }} >
                    <EditPublishSvg />
                    <AsnButton className='primary' >Edit and Publish the project</AsnButton>
                  </Space>
                )
              };
            })}
          />
        </>
      )
    };
  });

  return (
    <>
      <InfoHeader overview={true} project={project} />
      {project?.resultAreas.length !== 0
        ? (
          <AsnTabs
            tabBarExtraContent={project?.status === 'DRAFT' && operations}
            defaultActiveKey="1"
            type="card"
            items={items}
          />
          )
        : <Space
          direction='vertical'
          align='center'
          style={{ width: '100%', paddingTop: '15vh', cursor: 'pointer' }}
          onClick={() => navigate(`/project/${(id != null) ? id : ''}/steps/0`)}
        >
          <AddResultAreaSvg />
          <Text
            style={{ color: 'var(--dark-border-ultramarine', fontSize: 'var(--headline-font-size)' }}
          >
            Input result areas and activities
          </Text>
        </Space>
      }
    </>
  );
};

export default ProjectOverview;
// 5320f761-3c3c-417b-aab9-61c07502c214
