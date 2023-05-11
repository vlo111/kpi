import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsProps, Row, Space, Pagination } from 'antd';
import styled from 'styled-components';

import ActiveTemplates from './ActiveTemplates';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';

import { IFiltersActiveTemplates } from '../../types/api/activity/subActivity';
import useGetTemplates from '../../api/Activity/SubActivity/useGetTemplates';

const AsnTabs = styled(Tabs)`
 &.ant-tabs {
    padding: 0px 30px 80px 30px;
}
.ant-tabs-tab {
    font-size: var(--headline-font-size);
}
 .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
     color: var(--dark-border-ultramarine);
    }
    .ant-tabs-tab:hover {
      color: var(--dark-border-ultramarine);
    }
  .ant-tabs-ink-bar {
    background-color: var(--dark-border-ultramarine);
}
`;

const AsnPagination = styled(Pagination)`
  .ant-pagination-item-link {
    border: none !important;
    background: var(--background);
  }
  .ant-pagination-item {
    border: none;
  }
  .ant-pagination-item {
    background: var(--background);
  }
  .ant-pagination-item-active {
    border-radius: 100%;
    background: var(--background-active-pagination);
  }
  .ant-pagination-item-active a {
    color: var(--active-pagination);
  }
`;

const AddSubActivity: React.FC = () => {
  const { id } = useParams();

  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [filters, setFilters] = useState<IFiltersActiveTemplates>({
    courseStructure: undefined,
    applicationForm: undefined
  });

  const [activeTab, setActiveTab] = useState<string>('1');

  const { data, isLoading } = useGetTemplates(
    id as string,
    (search.trim().length > 1 || search === '') ? search.trim() : '',
    offset,
    12,
    filters,
    { enabled: Boolean(id) }
  );

  const { count } = data;

  const onChange = (key: string): void => {
    setActiveTab(key);
  };

  const handlePagination = (page: number): void => {
    setOffset((page - 1) * 12);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Courses',
      children: <ActiveTemplates
        search={search}
        setSearch={setSearch}
        setOffset={setOffset}
        setFilters={setFilters}
        isLoading={isLoading}
        templates={data?.result}
      />
    },
    {
      key: '2',
      label: 'Workspace',
      children: 'No Results'
    },
    {
      key: '3',
      label: 'Events',
      children: 'No Results'
    }
  ];
  return (
    <Space style={{ minHeight: '100%', position: 'relative', width: '100%' }} direction='vertical'>
      <Row style={{ padding: '10px 30px' }}>
        <AsnBreadcrumb
          routes={[
            {
              path: `/sub-activities/list/${id as string}`,
              breadcrumbName: 'Sub-Activities'
            },
            {
              path: `/sub-activities/list/${id as string}`,
              breadcrumbName: 'Active Templates'
            }
          ]}
        />
      </Row>
      <AsnTabs defaultActiveKey="1" items={items} onChange={onChange} />
      {(count > 12 && activeTab === '1') && <Row
        align={'middle'}
        justify={'center'}
        style={{
          position: 'absolute',
          bottom: 15,
          width: '100%'
        }}
      >
        <AsnPagination
          showSizeChanger={false}
          current={offset / 12 + 1}
          pageSize={12}
          total={count}
          onChange={handlePagination}
        />
      </Row>}
    </Space>
  );
};

export default AddSubActivity;
