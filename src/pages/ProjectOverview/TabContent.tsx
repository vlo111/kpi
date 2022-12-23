import React from 'react';
import { Tabs, Space, Typography, Row } from 'antd';
import styled from 'styled-components';

import { AsnButton } from '../../components/Forms/Button';
import AsnSpin from '../../components/Forms/Spin';
import SubActivityAndTemplates from './SubActivitesAndTemplates';
import { ITabContent } from '../../types/project';
import { ReactComponent as EditPublishSvg } from '../../assets/icons/edit-publish.svg';
import { ReactComponent as CreateTemplateSvg } from '../../assets/icons/create-template.svg';

const { Text } = Typography;

const AntRow = styled(Row)`
  padding: 8px 16px;
  width: 16vw;
`;

const TabContent: React.FC<ITabContent> = ({
  inputActivityId,
  resultArea,
  isLoadingTemplates,
  templates,
  refetch,
  setInputActivityId,
  status,
  handleEdit,
  setActivityId,
  setIsOpenCreateActivityModal
}) => {
  return (
        <Tabs
        activeKey={inputActivityId ?? resultArea?.inputActivities[0]?.id}
        tabPosition={'left'}
        items={resultArea?.inputActivities?.map(
          (inputActivity, i: number) => {
            return {
              label: (
                <AntRow align='middle' style={{ width: '18vw', minHeight: '80px' }} onClick={() => setInputActivityId(inputActivity?.id)}>
                  1.{+i + 1} {inputActivity?.title}
                </AntRow>
              ),
              key: `${inputActivity?.id ?? i}`,
              children: isLoadingTemplates
                ? <AsnSpin />
                : templates?.length > 0
                  ? (< SubActivityAndTemplates templates={templates} refetch={refetch} />)
                  : (
                <Space
                  direction="vertical"
                  align="center"
                  style={{ width: '100%', padding: '5vh 0 30px 0' }}
                >
                  {status === 'DRAFT'
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
  );
};

export default TabContent;
