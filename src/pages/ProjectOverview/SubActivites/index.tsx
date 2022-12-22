import React from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';

import { ISubActivityAndTemplates } from '../../../types/project';
import { ActiveTempalate } from './ActiveTemplate';
import { SubActivity } from './SubActivityAndTemplates';

const Tab = styled.div`
.ant-tabs-ink-bar{
  display: block !important;
  color: var(--dark-2);
}
.ant-tabs-tab-btn{
  background: var(--white);
}
.ant-tabs-top>.ant-tabs-nav:before{
  border-bottom: none !important;
}
  .ant-tabs {
    /* padding: 0 67px !important; */
    .ant-tabs-nav,
    .ant-tabs > div > .ant-tabs-nav {
      position: inherit !important;
    }

    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
      color: var(--dark-2) !important;
    }
    .ant-tabs-ink-bar {
      background: var(--dark-2) !important;
    }
  }
  .ant-tabs-tab:hover {
    color: var(--dark-2) !important;
  }
  .ant-tabs-content-holder{
  box-shadow: none !important;
}
`;

const SubActivityAndTemplates: React.FC<ISubActivityAndTemplates> = ({ templates }) => {
  return (
    <Tab>
      <Tabs
        defaultActiveKey="1"
        style={{
          color: 'var(--dark-2) !important',
          fontSize: 'var(--base-font-size) !important'
        }}
      >
        <Tabs.TabPane tab="Sub Activities" key="1">
          <SubActivity />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Active Templates " key="2">
          <ActiveTempalate templates={templates} />
        </Tabs.TabPane>
      </Tabs>
    </Tab>
  );
};

export default SubActivityAndTemplates;
