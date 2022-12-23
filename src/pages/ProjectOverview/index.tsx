import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Space } from 'antd';

import TabContent from './TabContent';
import ResultAreasTitles from './ResultAreasTitles';
import ProjectInformationHeader from '../../components/Menu/ProjectInformationHeader';
import { AsnButton } from '../../components/Forms/Button';
import { AsnTabs } from '../../components/Forms/Tabs';
import AsnSpin from '../../components/Forms/Spin';
import { TVoid } from '../../types/global';
import { IResultAreas } from '../../types/project';
import useGetProjectById from '../../api/Project/useGetProject';
import GetTemplates from '../../api/Activity/Template/useGetActivityTemplates';
import { ReactComponent as AddResultAreaSvg } from '../../assets/icons/project-overview.svg';
import CreateTemplate from '../../components/CreateTemplateModal';

const { Text } = Typography;

const ProjectOverview: React.FC = () => {
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] = useState(false);
  const [activityId, setActivityId] = useState<string | undefined>('');
  const [inputActivityId, setInputActivityId] = useState<string | undefined>(undefined);
  const [active, setActive] = useState<number>(1);
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

  const operations = (
    <AsnButton className="draft" onClick={handleDraft}>
      Draft
    </AsnButton>
  );
  const items = project?.resultAreas?.map((resultArea: IResultAreas, i: number) => {
    return {
      label: (
        <ResultAreasTitles
          title={resultArea?.title}
          projectItems={project?.resultAreas.length}
          index={i}
          active={active}
          setActive={setActive}
        />
      ),
      key: `${resultArea?.inputActivities[0]?.id ?? resultArea?.id}`,
      children: (
        <>
          <TabContent
            inputActivityId={inputActivityId}
            resultArea={resultArea}
            isLoadingTemplates={isLoadingTemplates}
            templates={templates}
            refetch={refetch}
            setInputActivityId={setInputActivityId}
            status={project?.status}
            handleEdit={handleEdit}
            setActivityId={setActivityId}
            setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
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
