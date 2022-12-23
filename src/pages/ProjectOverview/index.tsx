import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, Typography, Space, Badge, Row, Tooltip } from 'antd';
import styled from 'styled-components';

import SubActivityAndTemplates from './SubActivites';
import ProjectInformationHeader from '../../components/Menu/ProjectInformationHeader';
import { AsnButton } from '../../components/Forms/Button';
import { AsnTabs } from '../../components/Forms/Tabs';
import AsnSpin from '../../components/Forms/Spin';
import { TVoid } from '../../types/global';
import { IResultAreas, IInputActivities } from '../../types/project';
import useGetProjectById from '../../api/Project/useGetProject';
import GetTemplates from '../../api/Activity/Template/useGetActivityTemplates';
import { ReactComponent as AddResultAreaSvg } from '../../assets/icons/project-overview.svg';
import { ReactComponent as EditPublishSvg } from '../../assets/icons/edit-publish.svg';
import { ReactComponent as CreateTemplateSvg } from '../../assets/icons/create-template.svg';
import CreateTemplate from '../../components/CreateTemplateModal';

const { Text } = Typography;

const AntRow = styled(Row)`
  padding: 8px 16px;
  width: 16vw;
`;

const ProjectOverview: React.FC = () => {
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] = useState(false);
  const [activityId, setActivityId] = useState<string | undefined>('');
  const [active, setActive] = useState<number>(1);
  const [inputActivityId, setInputActivityId] = useState<string | undefined>(undefined);
  const { id } = useParams<string>();
  const { isLoading, data: { result: project }, inputActivityId: defaultInputActivityId } = useGetProjectById(id);
  const { data: templates, isLoading: isLoadingTemplates, refetch } = GetTemplates(inputActivityId ?? defaultInputActivityId, { enabled: Boolean(inputActivityId ?? defaultInputActivityId) });
  const navigate = useNavigate();
  const handleDraft: TVoid = () => {
    if (id != null) {
      navigate(`/project/${id}/steps/0`);
    }
  };
  const handleEdit: TVoid = () => {
    if (id != null) {
      navigate(`/project/${id}/steps/1`);
    }
  };
  const addResultAreas: TVoid = () => {
    if (id != null) {
      navigate(`/project/${id}/steps/0`);
    }
  };
  const AntBadge = styled(Badge)`
    margin-right: 4px;
    .ant-badge-count {
      background: ${({ count }) =>
        count === active ? 'var(--white)' : 'var(--dark-6)'};
      color: var(--dark-border-ultramarine);
      box-shadow: 0 0 0 1px var(--dark-border-ultramarine);
      font-size: var(--font-size-semismall);
      border-radius: 100%;
    }
  `;
  const operations = (
    <AsnButton className="draft" onClick={handleDraft}>
      Draft
    </AsnButton>
  );
  const projectItems = project?.resultAreas.length;
  const items = project?.resultAreas?.map((resultArea: IResultAreas, i: number) => {
    return {
      label: (
        <Tooltip
          title={resultArea?.title}
          color="var(--dark-6)"
          overlayInnerStyle={{
            color: 'var(--dark-border-ultramarine)',
            fontSize: 'var(  --base-font-size)'
          }}
        >
          <AntRow
            wrap={false}
            align="middle"
            onClick={() => setActive(i + 1)}
            style={projectItems > 3 ? { width: '70px' } : {}}
          >
            <AntBadge count={i + 1} />
            {projectItems <= 3 && (
              <Text
                ellipsis={true}
                style={
                  active === i + 1
                    ? { width: '85%', color: 'var(--dark-border-ultramarine)' }
                    : { width: '85%' }
                }
              >
                {resultArea?.title}
              </Text>
            )}
          </AntRow>
        </Tooltip>
      ),
      key: `${resultArea?.inputActivities[0]?.id ?? resultArea?.id}`,
      children: (
        <>
          <Tabs
            activeKey={inputActivityId ?? resultArea?.inputActivities[0]?.id}
            tabPosition={'left'}
            items={resultArea?.inputActivities?.map(
              (inputActivity: IInputActivities, i: number) => {
                return {
                  label: (
                    <AntRow align='middle' style={{ width: '18vw', minHeight: '80px' }} onClick={() => setInputActivityId(inputActivity?.id)}>
                      1.{i + 1} {inputActivity?.title}
                    </AntRow>
                  ),
                  key: `${inputActivity?.id ?? i}`,
                  children: isLoadingTemplates === true
                    ? <AsnSpin />
                    : templates?.length > 0
                      ? (< SubActivityAndTemplates templates={templates} refetch={refetch} />)
                      : (
                    <Space
                      direction="vertical"
                      align="center"
                      style={{ width: '100%', padding: '5vh 0 30px 0' }}
                    >
                      {project?.status === 'DRAFT'
                        ? (
                        <>
                          <EditPublishSvg />
                          <AsnButton className="primary" onClick={handleEdit}>
                            Edit and Publish the project
                          </AsnButton>
                        </>
                          )
                        : (
                        <>
                          <CreateTemplateSvg style={{ marginBottom: '20px' }} />
                          <Text
                            style={{ fontSize: 'var(--headline-font-size)' }}
                          >
                            Create Activity Template
                          </Text>
                          <Text>Create activity templates to start</Text>
                          <AsnButton
                            style={{ marginTop: '12px' }}
                            className="primary"
                            onClick={() => {
                              setActivityId(inputActivity.id);
                              setIsOpenCreateActivityModal(true);
                            }}
                          >
                            Create Activity Template
                          </AsnButton>
                        </>
                          )}
                    </Space>
                        )
                };
              }
            )}
          />
        </>
      )
    };
  });
  if (isLoading === true) {
    return <AsnSpin />;
  }

  return (
    <>
      <ProjectInformationHeader overview={true} project={project} />
      {project?.resultAreas.length !== 0
        ? (
        <AsnTabs
          tabBarExtraContent={project?.status === 'DRAFT' && operations}
          type="card"
          items={items}
          defaultActiveKey='1'
          onChange={(activeKey) => setInputActivityId(activeKey)}
        />
          )
        : (
        <Space
          direction="vertical"
          align="center"
          style={{ width: '100%', paddingTop: '15vh', cursor: 'pointer' }}
          onClick={addResultAreas}
        >
          <AddResultAreaSvg />
          <Text
            style={{
              color: 'var(--dark-border-ultramarine)',
              fontSize: 'var(--headline-font-size)'
            }}
          >
            Input result areas and activities
          </Text>
        </Space>
          )}
      <CreateTemplate
        isOpenCreateActivityModal={isOpenCreateActivityModal}
        setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
        activityId={activityId}
      />
    </>
  );
};

export default ProjectOverview;
