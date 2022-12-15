import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Card, Space, Row } from 'antd';
import styled from 'styled-components';

import CardTitle from './CardTitle';
import GeneralInfo from './GeneralInfo';
import { AsnButton } from '../../components/Forms/Button';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
import useGetProjectById from '../../api/Project/useGetProject';
import ResultAndActivities from './ResultAndActivities';
import ActivityName from './ActivityName';

// import ResultAndActivities from './ResultAndActivities';
// import ActivityName from './ActivityName';
// import { ReactComponent as ArrowLeftSvg } from '../../../../assets/icons/arrowLeft.svg';

const { Title } = Typography;

const ProjectInfoContainer = styled.div`
  padding: 40px 32px 60px 32px;
`;
const CardWrapper = styled(Card)`
  border: none;
  background: var(--white);
  border-top: 3px solid var(--secondary-light-amber);
  box-shadow:  var( --base-box-shadow);
  border-radius: 20px;
 .ant-card-body{
  padding: 16px;
  margin-bottom: 16px;
 }
`;
const ResultAreaName = styled.div`
    margin-bottom: 16px;
    font-size: var(--base-font-size);
`;
const backButton = {
  borderRaduis: '10px',
  height: '44px',
  background: 'var(--dark-border-ultramarine)',
  color: 'var( --white)',
  marginTop: '44px'
};
// const headerPaginationCss = {
//   cursor: 'pointer',
//   fontSize: 'var(--base-font-size)'
// };

const ProjectInformation: React.FC = () => {
  const { id } = useParams<string>();
  const data = useGetProjectById(id);
  const { isLoading } = data;
  const { result: project } = data?.data;
  const navigate = useNavigate();
  if (isLoading === true) {
    return <div>loading</div>;
  }
  console.log(project);
  return (
    <ProjectInfoContainer>
      <AsnBreadcrumb
        routes={
          [{
            path: '/overview/:id',
            breadcrumbName: 'Project Overview'
          },
          {
            path: '/overviw/:id',
            breadcrumbName: 'Project Information'
          }]
        }
      />
      <Title level={2} style={{
        textAlign: 'center',
        fontSize: 'var(--large-hedline-font-size)',
        fontWeight: 'var(--font-bold)'
      }}>
        Project Information
      </Title>
      <CardWrapper>
        <Space direction={'vertical'} size={[0, 16]} style={{ width: '100%' }}>
          <CardTitle title={'General Info'} />
          <GeneralInfo
            title={project?.title}
            description={project?.description}
            startDate={project?.startDate}
            endDate={project?.endDate}
          />
        </Space>
      </CardWrapper>
      <CardWrapper style={{ borderTop: '3px solid var(--secondary-green)' }}>
        <CardTitle title={'Result areas and Activities'} />
        {project?.resultAreas?.map((result: any, i: number) => (
          <>
            <ResultAreaName key={i}>{result?.title}</ResultAreaName>
            {result.expectedResults.map((expectedResult: any, i: number) => (
              <ResultAndActivities
                key={i}
                code={expectedResult?.code}
                statement={expectedResult?.statement}
                target={expectedResult?.target}
                divider={true} />
            ))}
            {result?.inputActivities?.map((activity: any, i: number) => (
              <>
              <ActivityName key={i} activityName={activity?.title} divider={true} count={result?.inputActivities?.length - 1 === i} />
              {activity?.milestones?.map((milestone: any, j: number) => (
                <ResultAndActivities
                key={j}
                code={milestone?.code}
                statement={milestone?.statement}
                target={milestone?.target}
                divider={activity?.milestones.length !== 1 && result?.inputActivities?.length - 1 !== i} />
              ))}
              </>
            ))}
          </>
        ))
          }

        {/* {resultAndActivities.map((info, i) => (
          <ResultAndActivities
            key={i}
            option={info.option}
            description={info.description}
            count={info.count}
            divider={true}
          />
        ))} */}
        {/* <ActivityName activityName='1.1 Mapping the labor market' divider={true} /> */}
        {/* <ResultAndActivities
          option={'OC1.3'}
          description={'skill mapping study completed and study report, summarizing findings and recommendations developed. '}
          count={'20'}
          divider={true}
        />
        <ActivityName activityName='1.2 Establishment of educational labs' divider={false} />
        <ResultAndActivities
          option={''}
          description={'multimedia lab established in Gyumri '}
          count={'1'}
          divider={false}
        /> */}
      </CardWrapper>
      <CardWrapper style={{ borderTop: '3px solid var(--secondary-light-orage)' }}>
        <CardTitle title={'Project details'} />
        {/* <ProjectDetails info={organisations} />
        <ProjectDetails info={regionas} />
        <ProjectDetails info={sectors} /> */}
      </CardWrapper>
      <Row justify='end'>
        <AsnButton style={{ ...backButton }} onClick={() => navigate('/overview')}>Back</AsnButton>
      </Row>
    </ProjectInfoContainer>
  );
};

export default ProjectInformation;
