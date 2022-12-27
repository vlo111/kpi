import React, { useState } from 'react';
import { Tabs, Space, Typography, Row } from 'antd';
import styled from 'styled-components';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import useGetSubActivities from '../../api/Activity/Template/SubActivity/useGetSubActivities';
import GetTemplates from '../../api/Activity/Template/useGetActivityTemplates';
import { AsnButton } from '../../components/Forms/Button';
import AsnSpin from '../../components/Forms/Spin';
import SubActivityAndTemplates from './SubActivitesAndTemplates';
import { ITabContent } from '../../types/project';
import { ReactComponent as CreateTemplateSvg } from '../../assets/icons/create-template.svg';

const { Text } = Typography;

const AntRow = styled(Row)`
  padding: 8px 16px;
  width: 18vw;
  min-height: 80px;
  word-break: break-word;
;
`;

const TabContent: React.FC<ITabContent> = ({
  inputActivityId,
  resultArea,
  setInputActivityId,
  setActivityId,
  setIsOpenCreateActivityModal,
  defaultInputActivityId
}) => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [dateSearch, setDateSearch] = useState({
    start: true,
    from: '',
    to: ''
  });
  console.log(dateSearch);
  const { from, to } = dateSearch;
  const filters = ((checkedList?.length) !== 0 && (from !== '') && (to !== '')) ? { status: checkedList, date: dateSearch } : (checkedList?.length) !== 0 ? { status: checkedList } : ((from !== '') && (to !== '')) ? { date: dateSearch } : {};
  const { data: templates, isLoading: isLoadingTemplates, refetch } = GetTemplates(inputActivityId ?? defaultInputActivityId, { enabled: Boolean(inputActivityId ?? defaultInputActivityId) });
  const { data: subActivities, isLoading: isLoadingSubActivity } = useGetSubActivities(inputActivityId ?? defaultInputActivityId, filters, {
    enabled: Boolean((inputActivityId ?? defaultInputActivityId)),
    onSuccess: () => {
      if (from !== '' && to !== '') {
        setDateSearch({
          start: true,
          from: '',
          to: ''
        });
      }
    }
  }
  );
  return (
    <Tabs
      activeKey={inputActivityId ?? resultArea?.inputActivities[0]?.id}
      tabPosition={'left'}
      items={resultArea?.inputActivities?.map(
        (inputActivity, i: number) => {
          return {
            label: (
              <AntRow align='middle' onClick={() => setInputActivityId(inputActivity?.id)}>
                1.{+i + 1} {inputActivity?.title}
              </AntRow>
            ),
            key: `${inputActivity?.id ?? i}`,
            children: ((Boolean(isLoadingTemplates)) || (Boolean(isLoadingSubActivity)))
              ? <AsnSpin />
              : (templates?.length > 0 || subActivities?.length > 0)
                  ? (< SubActivityAndTemplates
                  subActivities={subActivities}
                  templates={templates} refetch={refetch}
                  setCheckedList={setCheckedList}
                  setIndeterminate={setIndeterminate}
                  setCheckAll={setCheckAll}
                  checkedList={checkedList}
                  indeterminate={indeterminate}
                  checkAll={checkAll}
                  setDateSearch={setDateSearch}
                  dateSearch={dateSearch}
                />)
                  : (
                  <Space
                    direction="vertical"
                    align="center"
                    style={{ width: '100%', padding: '5vh 0 30px 0' }}
                  >
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
                  </Space>
                    )
          };
        }
      )}
    />
  );
};

export default TabContent;
