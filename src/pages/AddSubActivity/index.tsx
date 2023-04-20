import React, { useState } from 'react';
import { Tabs, TabsProps, AutoComplete, Row, Col, Space, Typography, Popover } from 'antd';
import styled from 'styled-components';

import TemplateCard from './TemplateCard';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
import useGetTemplates from '../../api/Activity/SubActivity/useGetTemplates';

import { ReactComponent as FilterSvg } from '../../assets/icons/filter.svg';
import { AsnCheckbox } from '../../components/Forms/Checkbox';
import { AsnButton } from '../../components/Forms/Button';

const { Text } = Typography;

const AsnAutoComplete = styled(AutoComplete)`
    width: 20vw;
    &.ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
        border-radius: 10px;
    }
    &.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
        border-color: var(--dark-border-ultramarine);
    }
    &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border-color: var(--dark-border-ultramarine);
}
`;

const AsnTabs = styled(Tabs)`
 &.ant-tabs {
    padding: 0px 30px 20px 30px;
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
const AsnText = styled(Text)`
  color: var(--dark-border-ultramarine);
  font-size: var(--base-font-size);
  cursor: pointer;
  font-weight: var( --font-semibold);
  margin-right: 16px;
`;

const AsnPopover = styled(Popover)`
  &.ant-popover-arrow {
    display: none
  }
`;

const AddSubActivity: React.FC = () => {
  const id = JSON.parse(localStorage.getItem('project') as string);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>('');

  const { data } = useGetTemplates(id, search, offset, 12, { enabled: Boolean(id) });
  console.log(data);
  const onChange = (key: string): void => {
    console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Courses',
      children: <>
        <Space direction='horizontal' style={{ padding: '16px 0px', justifyContent: 'space-between', width: '100%' }}>
          <AsnAutoComplete
            placeholder="Search..."
          />
          <Space.Compact style={{ alignItems: 'center' }}>
            <AsnText underline>Clean filters</AsnText>
            <AsnPopover
              content={
                <>
                  <AsnCheckbox.Group>
                    <Space direction='vertical'>
                      <AsnCheckbox>Application form</AsnCheckbox>
                      <AsnCheckbox>Assessment form</AsnCheckbox>
                      <AsnCheckbox>One Phase</AsnCheckbox>
                      <AsnCheckbox>Multi Phase</AsnCheckbox>
                      <AsnButton
                        className='primary'
                        style={{
                          height: '32px',
                          float: 'right',
                          padding: '4px 15px'
                        }}
                      >
                        Filter
                      </AsnButton>
                    </Space>
                  </AsnCheckbox.Group>
                </>
              }
              trigger="click"
              open={true}
              placement="bottomRight"
              showArrow={false}
              getPopupContainer={(trigger: HTMLElement) => trigger?.parentElement as HTMLElement}
            >
              <FilterSvg style={{ cursor: 'pointer' }} />
            </AsnPopover>
          </Space.Compact>
        </Space>
        <Row gutter={[20, 20]}>
          {data?.result?.map((template: any, i: number) => (
            <Col key={i} xxl={{ span: 8 }} xl={{ span: 12, pull: 0, push: 0 }} md={{ span: 18, pull: 3, push: 3 }} xs={{ span: 24 }}>
              <TemplateCard template={template} />
            </Col>
          ))}
        </Row>
      </>
    },
    {
      key: '2',
      label: 'Workspace',
      children: 'Content of Tab Pane 2'
    },
    {
      key: '3',
      label: 'Events',
      children: 'Content of Tab Pane 3'
    }
  ];
  return (
    <>
      <Row style={{ padding: '10px 30px' }}>
        <AsnBreadcrumb
          routes={[
            {
              path: '',
              breadcrumbName: 'Sub-Activities'
            },
            {
              path: '',
              breadcrumbName: 'Active Templates'
            }
          ]}
        />
      </Row>
      <AsnTabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};

export default AddSubActivity;
