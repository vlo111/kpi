import React from 'react'
import { ActiveTempalate } from './ActiveTemplate'
import { SubActivity } from './SubActives'
import { Tabs } from 'antd'
import styled from 'styled-components'
const Tab = styled.div`
.ant-tabs{
  padding: 0 67px !important;
  }
  .ant-tabs-tab:hover {
   color: var(--dark-2) !important;
}
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
  color: var(--dark-2) !important;
}
.ant-tabs-ink-bar{
  background: var(--dark-2) !important;
}
.ant-tabs>.ant-tabs-nav, .ant-tabs>div>.ant-tabs-nav{
  position: inherit !important;
}
`

export const SubAndActive: React.FC = () => {
  return (
  <Tab>
    <Tabs defaultActiveKey="1" style={{ color: 'var(--dark-2) !important', fontSize: 'var(--base-font-size) !important' }}>
    <Tabs.TabPane tab="Sub Activities" key="1">
    <SubActivity/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Active Templates " key="2" >
    <ActiveTempalate/>
    </Tabs.TabPane>
  </Tabs>

  </Tab>
  )
}
