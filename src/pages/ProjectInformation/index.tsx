import React, { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Space, Row } from 'antd';
import styled from 'styled-components';

import CardTitle from './CardTitle';
import GeneralInfo from './GeneralInfo';
import ProjectDetails from './ProjectDetails';
import ResultAndActivities from './ResultAndActivities';
import ActivityName from './ActivityName';
import { AsnCard } from '../../components/Forms/Card';
import { AsnButton } from '../../components/Forms/Button';
import AsnSpin from '../../components/Forms/Spin';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
import { IProjectResultAreas } from '../../types/project';
import { Void } from '../../types/global';
import { PATHS } from '../../helpers/constants';
import useGetProjectById from '../../api/Project/useGetProject';

const { Title } = Typography;

const ProjectInfoContainer = styled.div`
  padding: 40px 32px 60px 32px;
`;

const ProjectInformation: React.FC = () => {
  const { id } = useParams<string>();
  const data = useGetProjectById(id);
  const navigate = useNavigate();
  const { isLoading } = data;
  const { result: project } = data?.data;
  console.log(project);
  if (isLoading === true) {
    return <AsnSpin />;
  }

  const handleBack: Void = () => {
    if (id != null) {
      navigate(`/project/${PATHS.OVERVIEW}`.replace(':id', id));
    }
  };
  return (
    <ProjectInfoContainer>
      <AsnBreadcrumb
        routes={[
          {
            path: `/project/overview/${(id != null) ? id : ''}`,
            breadcrumbName: 'Project Overview'
          },
          {
            path: '',
            breadcrumbName: 'Project Information'
          }
        ]}
      />
      <Title
        level={2}
        style={{
          textAlign: 'center',
          fontSize: 'var(--large-hedline-font-size)',
          fontWeight: 'var(--font-bold)'
        }}
      >
        Project Information
      </Title>
      <AsnCard>
        <Space direction={'vertical'} size={[0, 16]} style={{ width: '100%' }}>
         <CardTitle title={'General Info'} id={id} />
          <GeneralInfo
            title={project?.title}
            description={project?.description}
            startDate={project?.startDate}
            endDate={project?.endDate}
          />
        </Space>
      </AsnCard>
      <AsnCard style={{ borderTop: '3px solid var(--secondary-green)' }}>
        <CardTitle title={'Result areas and Activities'} id={id} />
        {project?.resultAreas?.map((result: IProjectResultAreas) => (
          <Fragment key={result?.id}>
            <Title
              level={3}
              style={{
                marginBottom: '16px',
                fontSize: 'var(--base-font-size)',
                fontWeight: 'var(--font-normal)'
              }}
            >
              {result?.title}
            </Title>
            {result.expectedResults.map((expectedResult) => (
              <ResultAndActivities
                key={expectedResult?.id}
                code={expectedResult?.code}
                statement={expectedResult?.statement}
                target={expectedResult?.target}
                divider={true}
              />
            ))}
            {result?.inputActivities?.map((activity, i: number) => (
              <div key={i}>
                <ActivityName
                  key={activity?.id}
                  activityName={activity?.title}
                  divider={true}
                  count={result?.inputActivities?.length - 1 === i}
                  order={activity?.order}
                />
                {activity?.milestones?.map((milestone, j: number) => (
                  <ResultAndActivities
                    key={j}
                    code={milestone?.code}
                    statement={milestone?.statement}
                    target={milestone?.target}
                    divider={
                      activity?.milestones.length !== 1 &&
                      result?.inputActivities?.length - 1 !== i
                    }
                  />
                ))}
              </div>
            ))}
          </Fragment>
        ))}
      </AsnCard>
      <AsnCard style={{ borderTop: '3px solid var(--secondary-light-orage)' }}>
        <CardTitle title={'Project details'} id={id} />
        <ProjectDetails
          title={'Organizations'}
          details={project?.organizations}
        />
        <ProjectDetails
          title={'Regionas/Marzes'}
          details={project?.regions}
        />
        <ProjectDetails title={'Sectors'} details={project?.sectors} />
      </AsnCard>
      <Row justify="end">
        <AsnButton
          className="primary"
          style={{ marginTop: '44px' }}
          onClick={handleBack}
        >
          Back
        </AsnButton>
      </Row>
    </ProjectInfoContainer>
  );
};

export default ProjectInformation;
