import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { Typography, Space } from 'antd';

import TabContent from './TabContent';
import ResultAreasTitles from './ResultAreasTitles';
import ProjectInformationHeader from '../../components/Menu/ProjectInformationHeader';
import { AsnTabs } from '../../components/Forms/Tabs';
import AsnSpin from '../../components/Forms/Spin';
import { TVoid } from '../../types/global';
import { IResultAreas, IOutletContext } from '../../types/project';
import useGetProjectById from '../../api/Project/useGetProject';
import { ReactComponent as AddResultAreaSvg } from '../../assets/icons/project-overview.svg';
import CreateTemplate from '../../components/CreateTemplateModal';

const { Text } = Typography;

const ProjectOverview: React.FC = () => {
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] = useState(false);
  const [inputActivityId, setInputActivityId] = useState<string | undefined>(undefined);

  const { id } = useParams<string>();
  const { isLoading, data: { result: project }, inputActivityId: defaultInputActivityId } = useGetProjectById(id);

  const { projectOverview: { areaOrder, activityId, templateTab }, setProjectOverview } = useOutletContext<IOutletContext>();
  const resultAreaId = project?.resultAreas[Number(areaOrder) - 1]?.inputActivities[0]?.id;
  const [active, setActive] = useState<number>(areaOrder ?? 1);
  const [activeTemplate, setActiveTemplate] = useState<string>(templateTab ?? '1');

  const navigate = useNavigate();
  const addResultAreas: TVoid = () => {
    if (id != null) {
      navigate(`/project/${id}/steps/0`);
    }
  };

  const handleResultAreaChange = (activeKey: string): void => {
    if (areaOrder !== undefined || activityId !== undefined) {
      setProjectOverview({
        areaOrder: undefined,
        activityId: undefined,
        activityTitle: undefined,
        resultAreaTitle: undefined,
        templateTab: undefined
      });
    }
    if (activeTemplate === '2') {
      setActiveTemplate('1');
    }
    setInputActivityId(activeKey);
  };
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
            inputActivityId={activityId ?? resultAreaId ?? inputActivityId}
            resultArea={resultArea}
            setInputActivityId={setInputActivityId}
            setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
            defaultInputActivityId={activityId ?? resultAreaId ?? defaultInputActivityId}
            areaOrder={areaOrder ?? active}
            setActiveTemplate={setActiveTemplate}
            activeTemplate={activeTemplate}
            isActivityNavigated={activityId}
          />
        </>
      )
    };
  });

  useEffect(() => {
    if (id !== undefined) {
      if (project?.resultAreas.length === 0) {
        navigate(`/project/${id}/steps/0`);
      } else if (
        project?.resultAreas.length > 0 &&
        project?.sectors.length === 0
      ) {
        navigate(`/project/${id}/steps/1`);
      }
    }
  }, [project, id]);

  if (isLoading === true) {
    return <AsnSpin />;
  }

  return (
    <>
      <ProjectInformationHeader
        overview={true}
        project={project}
        padding={'40px'}
        resultAreaOrder={areaOrder ?? active}
        activityId={activityId ?? resultAreaId ?? inputActivityId ?? defaultInputActivityId}
        activeTemplate={activeTemplate}
      />
      {project?.resultAreas.length !== 0
        ? (
          <AsnTabs
            type="card"
            items={items}
            defaultActiveKey={resultAreaId ?? '1'}
            onChange={(activeKey) => handleResultAreaChange(activeKey)}
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
        activityId={inputActivityId ?? defaultInputActivityId}
      />
    </>
  );
};

export default ProjectOverview;
