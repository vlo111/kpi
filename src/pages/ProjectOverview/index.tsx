/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Typography, Space, Badge, Row, Tooltip } from 'antd';
import styled from 'styled-components';

import InfoHeader from '../../components/InfoHeader';
import { AsnButton } from '../../components/Forms/Button';
import { useGetProjectById } from '../../api/Project/useGetProject';
import { ReactComponent as AddResultAreaSvg } from '../../assets/icons/projectOverview.svg';
import { ReactComponent as EditPublishSvg } from '../../assets/icons/editpublish.svg';

const AntTabs = styled(Tabs)`
    margin-left: 40px;
    &.ant-tabs-top>.ant-tabs-nav:before{
    border-bottom: none !important;
  }
  &.ant-tabs-top>.ant-tabs-nav{
    margin: 0 !important;
  }
  .ant-tabs-content-holder{
    background: var(--white);
    border: none;
    box-shadow: var( --overview-box-shadow);
    padding-top: 50px;
  }
  .ant-tabs-tab{
    border: none !important;
    background: var(--dark-6) !important;
    padding : 0 !important;
    font-size: var( --base-font-size);
    &:hover{
      color: var(--dark-border-ultramarine) !important;
    }
  }
  .ant-tabs-left>.ant-tabs-nav .ant-tabs-tab+.ant-tabs-tab{
    margin: 16px !important
  }
  .ant-tabs-left>.ant-tabs-nav .ant-tabs-tab{
    margin: 16px 16px 8px 16px !important;
    border-radius: 10px;
    min-height: 80px;
    text-align: start;
  }
  .ant-tabs-ink-bar{
    display: none
  }
 .ant-tabs-tab-active{
  background: var(--white) !important;
 } 
 .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
  color: var(--dark-border-ultramarine) !important;
 }
 .ant-tabs>.ant-tabs-nav .ant-tabs-nav-wrap{
  white-space: normal;
 }
 .ant-tabs-left>.ant-tabs-nav .ant-tabs-tab-active{
  border-left: 6px solid #2A5578 !important;
  box-shadow: var( --overview-box-shadow);
  translate: 16px 0px; 
  border-radius: 10px 0px 0px 10px;
 }
 .ant-tabs-left>.ant-tabs-nav{
  height: 66vh;
 }
 &.ant-tabs-card.ant-tabs-top>.ant-tabs-nav .ant-tabs-tab{
  border-radius: 20px 20px 0px 0px !important;
 }
 .ant-tabs-nav-operations{
  display: none !important;
 }
`;

const { Text } = Typography;
const ProjectOverview: React.FC = () => {
  const [active, setActive] = useState<number>(1);
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const data = useGetProjectById(id);
  console.log(data);
  const { project }: any = data;

  const AntBadge = styled(Badge)`
   margin-right: 4px;
   .ant-badge-count{
   background: ${props => props.count === active ? 'var(--white)' : 'var(--dark-6)'}; 
   color: var( --dark-border-ultramarine);
   box-shadow: 0 0 0 1px var( --dark-border-ultramarine);
   font-size: var(--font-size-semismall);
   border-radius: 100%;
}
`;

  const items = project?.resultAreas?.map((item: { title: string, id: string, inputActivities: [] }, i: number) => {
    return {
      label: <Tooltip title={item?.title} color='var(--dark-6)' overlayInnerStyle={{ color: 'var(--dark-border-ultramarine)', fontSize: 'var(  --base-font-size)' }}>
        <Row wrap={false} align='middle' onClick={() => setActive(i + 1)} style={{ padding: '8px 16px', width: '16vw' }}>
          <AntBadge count={i + 1} />
          <Text ellipsis={true} style={{ width: '85%' }}>{item?.title}</Text>
        </Row>
      </Tooltip>,
      key: `${item?.id}`,
      children: (
        <>
          <Tabs
            tabPosition={'left'}
            items={item?.inputActivities?.map((item: { title: string, id: string }, i: number) => {
              return {
                label: <Row style={{ padding: '8px 16px', width: '18vw' }}>1.{i + 1} {item?.title}</Row>,
                key: `${item?.id}`,
                children: (
                  <Space direction='vertical' align='center' style={{ width: '100%', paddingTop: '5vh' }} >
                    <EditPublishSvg />
                    <AsnButton className='primary'>Edit and Publish the project</AsnButton>
                  </Space>
                )
              };
            })}
          />
        </>
      )
    };
  });
  console.log(active);
  return (
    <>
      <InfoHeader overview={true} project={data?.project} />
      {project?.resultAreas.length !== 0
        ? (
          <>
            {project?.status === 'DRAFT' && <AsnButton className='draft'>Draft</AsnButton>}
            <AntTabs defaultActiveKey="1" type="card" items={items} />
          </>
          )
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        : <Space direction='vertical' align='center' style={{ width: '100%', paddingTop: '15vh', cursor: 'pointer' }} onClick={() => navigate(`/project/${id}/steps/0`)}>
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
// const project = {
//   id: '5320f761-3c3c-417b-aab9-61c07502c214',
//   title: 'USAID',
//   description: 'Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills\n',
//   createdAt: '2022-12-10T10:30:50.255Z',
//   updatedAt: '2022-12-10T10:41:16.371Z',
//   deletedAt: null,
//   startDate: '2022-12-21T10:32:39.070Z',
//   endDate: '2022-12-28T10:32:41.033Z',
//   status: 'DRAFT',
//   stepStatus: 'PROJECT_INPUT',
//   organizations: [],
//   sectors: [],
//   regions: [],
//   resultAreas: [
//     {
//       id: '441386f9-c412-43ca-9ebe-e4c841863b02',
//       title: 'Skilll gap reduced',
//       projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//       createdAt: '2022-12-10T10:41:16.316Z',
//       updatedAt: '2022-12-10T10:41:16.316Z',
//       deletedAt: null,
//       expectedResults: [
//         {
//           id: 'b6f3a2fd-2c9a-4e65-a5d4-29b096563795',
//           code: 'op1.1',
//           statement: 'soft skills following',
//           measurement: 'NUMBER',
//           target: 100,
//           projectId: null,
//           resultAreaId: '441386f9-c412-43ca-9ebe-e4c841863b02',
//           createdAt: '2022-12-10T10:41:16.316Z',
//           updatedAt: '2022-12-10T10:41:16.316Z',
//           deletedAt: null
//         },
//         {
//           id: '99c696f8-4183-4052-bc65-c5f79701d50e',
//           code: 'op1.2',
//           statement: 'improved technical participation',
//           measurement: 'NUMBER',
//           target: 50,
//           projectId: null,
//           resultAreaId: '441386f9-c412-43ca-9ebe-e4c841863b02',
//           createdAt: '2022-12-10T10:41:16.316Z',
//           updatedAt: '2022-12-10T10:41:16.316Z',
//           deletedAt: null
//         },
//         {
//           id: '71442f5f-a209-401f-93a8-91146364dcbe',
//           code: 'op1.3',
//           statement: 'improved technical participations',
//           measurement: 'NUMBER',
//           target: 20,
//           projectId: null,
//           resultAreaId: '441386f9-c412-43ca-9ebe-e4c841863b02',
//           createdAt: '2022-12-10T10:41:16.316Z',
//           updatedAt: '2022-12-10T10:41:16.316Z',
//           deletedAt: null
//         }
//       ],
//       inputActivities: [
//         {
//           id: 'e85fea1b-05c2-46d2-8934-c66c04dbf412',
//           title: 'Individuals with improved soft skills',
//           projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//           resultAreaId: '441386f9-c412-43ca-9ebe-e4c841863b02',
//           createdAt: '2022-12-10T10:41:16.316Z',
//           updatedAt: '2022-12-10T10:41:16.316Z',
//           deletedAt: null,
//           milestones: [
//             {
//               id: '9b6a2cbb-f548-4620-815a-3a3ad3e53f1d',
//               code: 'XY1.1',
//               statement: 'skill mapping study',
//               measurement: 'NUMBER',
//               target: 50,
//               projectId: null,
//               resultAreaId: null,
//               inputActivityId: 'e85fea1b-05c2-46d2-8934-c66c04dbf412',
//               createdAt: '2022-12-10T10:41:16.316Z',
//               updatedAt: '2022-12-10T10:41:16.316Z',
//               deletedAt: null
//             },
//             {
//               id: '3cf04610-ae2e-49b7-acb0-1da177d8023f',
//               code: 'XY1.2',
//               statement: 'study report',
//               measurement: 'NUMBER',
//               target: 20,
//               projectId: null,
//               resultAreaId: null,
//               inputActivityId: 'e85fea1b-05c2-46d2-8934-c66c04dbf412',
//               createdAt: '2022-12-10T10:41:16.316Z',
//               updatedAt: '2022-12-10T10:41:16.316Z',
//               deletedAt: null
//             }
//           ]
//         }
//       ]
//     },
//     {
//       id: '44138shry6f9-c412-43ca-9ebe-e4c841863b02',
//       title: 'Skilll gap reduced',
//       projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//       createdAt: '2022-12-10T10:41:16.316Z',
//       updatedAt: '2022-12-10T10:41:16.316Z',
//       deletedAt: null,
//       expectedResults: [
//         {
//           id: 'b6f3a2fd-2c9a-4e65-a5d4-29b096563795',
//           code: 'op1.1',
//           statement: 'soft skills following',
//           measurement: 'NUMBER',
//           target: 100,
//           projectId: null,
//           resultAreaId: '441386f9-c412-43ca-9ebe-e4c841863b02',
//           createdAt: '2022-12-10T10:41:16.316Z',
//           updatedAt: '2022-12-10T10:41:16.316Z',
//           deletedAt: null
//         },
//         {
//           id: '99c696f8-4183-4052-bc65-c5f79701d50e',
//           code: 'op1.2',
//           statement: 'improved technical participation',
//           measurement: 'NUMBER',
//           target: 50,
//           projectId: null,
//           resultAreaId: '441386f9-c412-43ca-9ebe-e4c841863b02',
//           createdAt: '2022-12-10T10:41:16.316Z',
//           updatedAt: '2022-12-10T10:41:16.316Z',
//           deletedAt: null
//         },
//         {
//           id: '71442f5f-a209-401f-93a8-91146364dcbe',
//           code: 'op1.3',
//           statement: 'improved technical participations',
//           measurement: 'NUMBER',
//           target: 20,
//           projectId: null,
//           resultAreaId: '441386f9-c412-43ca-9ebe-e4c841863b02',
//           createdAt: '2022-12-10T10:41:16.316Z',
//           updatedAt: '2022-12-10T10:41:16.316Z',
//           deletedAt: null
//         }
//       ],
//       inputActivities: [
//         {
//           id: 'e85fea1b-05c2-46d2-8934-c66c04dbf412',
//           title: 'Individuals with improved soft skills',
//           projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//           resultAreaId: '441386f9-c412-43ca-9ebe-e4c841863b02',
//           createdAt: '2022-12-10T10:41:16.316Z',
//           updatedAt: '2022-12-10T10:41:16.316Z',
//           deletedAt: null,
//           milestones: [
//             {
//               id: '9b6a2cbb-f548-4620-815a-3a3ad3e53f1d',
//               code: 'XY1.1',
//               statement: 'skill mapping study',
//               measurement: 'NUMBER',
//               target: 50,
//               projectId: null,
//               resultAreaId: null,
//               inputActivityId: 'e85fea1b-05c2-46d2-8934-c66c04dbf412',
//               createdAt: '2022-12-10T10:41:16.316Z',
//               updatedAt: '2022-12-10T10:41:16.316Z',
//               deletedAt: null
//             },
//             {
//               id: '3cf04610-ae2e-49b7-acb0-1da177d8023f',
//               code: 'XY1.2',
//               statement: 'study report',
//               measurement: 'NUMBER',
//               target: 20,
//               projectId: null,
//               resultAreaId: null,
//               inputActivityId: 'e85fea1b-05c2-46d2-8934-c66c04dbf412',
//               createdAt: '2022-12-10T10:41:16.316Z',
//               updatedAt: '2022-12-10T10:41:16.316Z',
//               deletedAt: null
//             }
//           ]
//         }
//       ]
//     },
//     {
//       id: '44138shfojrei98ry6f9-c412-43ca-9ebe-e4c841863b02',
//       title: 'Skilll gap reduced',
//       projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//       createdAt: '2022-12-10T10:41:16.316Z',
//       updatedAt: '2022-12-10T10:41:16.316Z',
//       deletedAt: null,
//       expectedResults: [],
//       inputActivities: []
//     },
//     {
//       id: '44138shfojrei98ry6f9erwwe-c412-43ca-9ebe-e4c841863b02',
//       title: 'Skilll gap reduced',
//       projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//       createdAt: '2022-12-10T10:41:16.316Z',
//       updatedAt: '2022-12-10T10:41:16.316Z',
//       deletedAt: null,
//       expectedResults: [],
//       inputActivities: []
//     },
//     {
//       id: '8ba01ca3-9405-45d8-b9cb-71b36ce7c0f6',
//       title: 'Learning NodeJs technology',
//       projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//       createdAt: '2022-12-10T10:41:16.366Z',
//       updatedAt: '2022-12-10T10:41:16.366Z',
//       deletedAt: null,
//       expectedResults: [
//         {
//           id: '15e50c35-8bbd-4d5a-9c57-c87a5593398b',
//           code: 'OP3.1',
//           statement: 'participation in nodeJs course',
//           measurement: 'NUMBER',
//           target: 80,
//           projectId: null,
//           resultAreaId: '8ba01ca3-9405-45d8-b9cb-71b36ce7c0f6',
//           createdAt: '2022-12-10T10:41:16.366Z',
//           updatedAt: '2022-12-10T10:41:16.366Z',
//           deletedAt: null
//         }
//       ],
//       inputActivities: [
//         {
//           id: 'f9bdc882-5118-4e78-8cb1-1b1de7b26edc',
//           title: 'Learn NodeJS',
//           projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//           resultAreaId: '8ba01ca3-9405-45d8-b9cb-71b36ce7c0f6',
//           createdAt: '2022-12-10T10:41:16.366Z',
//           updatedAt: '2022-12-10T10:41:16.366Z',
//           deletedAt: null,
//           milestones: [
//             {
//               id: '78722fdc-21ad-42dd-b48a-87b9309ee501',
//               code: 'XY3.1',
//               statement: 'improve nodeJs',
//               measurement: 'NUMBER',
//               target: 50,
//               projectId: null,
//               resultAreaId: null,
//               inputActivityId: 'f9bdc882-5118-4e78-8cb1-1b1de7b26edc',
//               createdAt: '2022-12-10T10:41:16.366Z',
//               updatedAt: '2022-12-10T10:41:16.366Z',
//               deletedAt: null
//             }
//           ]
//         }
//       ]
//     },
//     {
//       id: '7d35301d-08fa-4b27-abe1-3808ac8054a2',
//       title: 'Leraning JS and React',
//       projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//       createdAt: '2022-12-10T10:41:16.367Z',
//       updatedAt: '2022-12-10T10:41:16.367Z',
//       deletedAt: null,
//       expectedResults: [
//         {
//           id: 'a59c386d-7f08-4770-994a-3f32570fd5b7',
//           code: 'Op2.1',
//           statement: 'imporive soft skills',
//           measurement: 'NUMBER',
//           target: 20,
//           projectId: null,
//           resultAreaId: '7d35301d-08fa-4b27-abe1-3808ac8054a2',
//           createdAt: '2022-12-10T10:41:16.367Z',
//           updatedAt: '2022-12-10T10:41:16.367Z',
//           deletedAt: null
//         }
//       ],
//       inputActivities: [
//         {
//           id: '066da358-3509-41b1-8831-c620c107a0f8',
//           title: 'learn javascript, react',
//           projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//           resultAreaId: '7d35301d-08fa-4b27-abe1-3808ac8054a2',
//           createdAt: '2022-12-10T10:41:16.367Z',
//           updatedAt: '2022-12-10T10:41:16.367Z',
//           deletedAt: null,
//           milestones: [
//             {
//               id: 'f847c67d-ac56-46b1-a957-8b2988854b65',
//               code: 'XY2.2',
//               statement: 'soft skills',
//               measurement: 'NUMBER',
//               target: 30,
//               projectId: null,
//               resultAreaId: null,
//               inputActivityId: '066da358-3509-41b1-8831-c620c107a0f8',
//               createdAt: '2022-12-10T10:41:16.367Z',
//               updatedAt: '2022-12-10T10:41:16.367Z',
//               deletedAt: null
//             }
//           ]
//         },
//         {
//           id: '5c910a8d-4b1f-4cdb-85c3-c044179fb3d6',
//           title: 'learn nodejs',
//           projectId: '5320f761-3c3c-417b-aab9-61c07502c214',
//           resultAreaId: '7d35301d-08fa-4b27-abe1-3808ac8054a2',
//           createdAt: '2022-12-10T10:41:16.367Z',
//           updatedAt: '2022-12-10T10:41:16.367Z',
//           deletedAt: null,
//           milestones: [
//             {
//               id: '2c734e6f-32b1-4965-833f-75c07db121cc',
//               code: 'XY2.3',
//               statement: 'improve soft skills',
//               measurement: 'NUMBER',
//               target: 80,
//               projectId: null,
//               resultAreaId: null,
//               inputActivityId: '5c910a8d-4b1f-4cdb-85c3-c044179fb3d6',
//               createdAt: '2022-12-10T10:41:16.367Z',
//               updatedAt: '2022-12-10T10:41:16.367Z',
//               deletedAt: null
//             }
//           ]
//         }
//       ]
//     }
//   ]
// };
