import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Tabs, Space, Typography, Row } from 'antd';
import styled from 'styled-components';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import useGetSubActivities from '../../api/Activity/Template/SubActivity/useGetSubActivities';
import GetTemplates from '../../api/Activity/Template/useGetActivityTemplates';
import { AsnButton } from '../../components/Forms/Button';
import AsnSpin from '../../components/Forms/Spin';
import SubActivityAndTemplates from './SubActivitesAndTemplates';
import { ITabContent, IOutletContext } from '../../types/project';
import { ReactComponent as CreateTemplateSvg } from '../../assets/icons/create-template.svg';
import { ReactComponent as NotAccessSvg } from '../../assets/icons/error_404.svg';

const { Text } = Typography;

const AntRow = styled(Row)`
  padding: 8px 16px;
  width: 18vw;
  min-height: 80px;
  word-break: break-word;
`;

const NotAccessContent = styled(Space)`
  width: 100%;
  .ant-space-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h5,
  h3 {
    color: var(--dark-1);
    font-size: 20px;
    font-weight: var(--font-normal);
  }
  h5 {
    font-size: 14px !important;
  }
`;

const TabContent: React.FC<ITabContent> = ({
  inputActivityId,
  resultArea,
  setInputActivityId,
  setIsOpenCreateActivityModal,
  defaultInputActivityId,
  areaOrder,
  setActiveTemplate,
  activeTemplate,
  isActivityNavigated
}) => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [assignedUsersIds, setAssignedUsersIds] = useState<React.Key[]>([]);

  const [indeterminate, setIndeterminate] = useState(true);
  const { Title } = Typography;
  const [checkAll, setCheckAll] = useState(false);
  const [dateSearch, setDateSearch] = useState({
    start: true,
    from: '',
    to: ''
  });

  const { setProjectOverview } = useOutletContext<IOutletContext>();

  const { from, to } = dateSearch;
  const filters =
    checkedList?.length !== 0 &&
    assignedUsersIds?.length !== 0 &&
    from !== '' &&
    to !== ''
      ? { status: checkedList, date: dateSearch, assigned: assignedUsersIds }
      : checkedList?.length !== 0
        ? { status: checkedList }
        : assignedUsersIds?.length !== 0
          ? { assigned: assignedUsersIds }
          : from !== '' && to !== ''
            ? { date: dateSearch }
            : {};
  const {
    data: templates,
    isLoading: isLoadingTemplates,
    refetch,
    isFetching
  } = GetTemplates(inputActivityId ?? defaultInputActivityId, {
    enabled: Boolean(inputActivityId ?? defaultInputActivityId)
  });
  const {
    data: subActivities,
    isLoading: isLoadingSubActivity,
    isFetching: isFetchingActivities,
    error
  } = useGetSubActivities(
    inputActivityId ?? defaultInputActivityId,
    filters,
    {
      enabled: Boolean(inputActivityId ?? defaultInputActivityId)
    }
  );

  const handleActivityChange = (id: string): void => {
    if (areaOrder !== undefined || isActivityNavigated !== undefined) {
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
    setInputActivityId(id);
  };

  const handleCreateTemplate = (activityTitle: string): void => {
    setIsOpenCreateActivityModal(true);
    setProjectOverview({
      areaOrder,
      activityId: inputActivityId ?? defaultInputActivityId,
      resultAreaTitle: resultArea?.title,
      activityTitle,
      templateTab: undefined
    });
  };

  return (
    <Tabs
      activeKey={inputActivityId ?? resultArea?.inputActivities[0]?.id}
      tabPosition={'left'}
      items={resultArea?.inputActivities?.map((inputActivity, i: number) => {
        return {
          label: (
            <AntRow
              align="middle"
              onClick={() => handleActivityChange(inputActivity?.id as string) }
            >
              {resultArea?.order}.{+i + 1} {inputActivity?.title}
            </AntRow>
          ),
          key: `${inputActivity?.id ?? i}`,
          children:
            error === null
              ? (
                  Boolean(isLoadingTemplates) || Boolean(isLoadingSubActivity) || Boolean(isFetching) || Boolean(isFetchingActivities)
                    ? (
                <AsnSpin />
                      )
                    : templates?.length > 0 || subActivities?.length > 0
                      ? (
                <SubActivityAndTemplates
                  subActivities={subActivities}
                  templates={templates}
                  refetch={refetch}
                  inputActivityId={inputActivity?.id !== undefined ? inputActivity?.id : ''}
                  setAssignedUsersIds={setAssignedUsersIds}
                  setCheckedList={setCheckedList}
                  setIndeterminate={setIndeterminate}
                  setCheckAll={setCheckAll}
                  checkedList={checkedList}
                  indeterminate={indeterminate}
                  checkAll={checkAll}
                  setDateSearch={setDateSearch}
                  dateSearch={dateSearch}
                  setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
                  resultAreaOrder={resultArea?.order}
                  resultAreaTitle={resultArea?.title}
                  activityTitle={inputActivity?.title}
                  setActiveTemplate={setActiveTemplate}
                  activeTemplate={activeTemplate}
                />
                        )
                      : (
                <Space
                  direction="vertical"
                  align="center"
                  style={{ width: '100%', padding: '5vh 0 30px 0' }}
                >
                  <CreateTemplateSvg style={{ marginBottom: '20px' }} />
                  <Text>Create activity templates to start</Text>
                  <AsnButton
                    style={{ marginTop: '12px' }}
                    className="primary"
                    onClick={() => handleCreateTemplate(inputActivity?.title)}
                  >
                    Create Activity Template
                  </AsnButton>
                </Space>
                        )
                )
              : (
                  error !== null && (
                <NotAccessContent direction="vertical">
                  <NotAccessSvg />
                  <Title level={3}>We are sorry,</Title>
                  <Title level={5}>
                    but you don’t have access to this page or resource
                  </Title>
                </NotAccessContent>
                  )
                )
        };
      })}
    />
  );
};

export default TabContent;
