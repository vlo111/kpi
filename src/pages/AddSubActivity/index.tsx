import React from 'react';
import { Tabs, TabsProps, AutoComplete, Card, Row, Col } from 'antd';
import styled from 'styled-components';

// import { AsnInput } from '../../components/Forms/Input';

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

const AsnCard = styled(Card)`
   width: 368px;
   border-top: 2px solid #2A5578;
   border-radius: 10px;
`;

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Courses',
    children: <>
             <AsnAutoComplete
            placeholder="Search..."
          />
          <AsnCard>
            <Row>
                <Col>
                sfd
                </Col>
            </Row>
          </AsnCard>
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

const AsnTabs = styled(Tabs)`
 &.ant-tabs {
    padding: 0px 30px;
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

const AddSubActivity: React.FC = () => {
  const onChange = (key: string): void => {
    console.log(key);
  };
  return (
        <AsnTabs defaultActiveKey="1" items={items} onChange={onChange} />
  );
};

export default AddSubActivity;
