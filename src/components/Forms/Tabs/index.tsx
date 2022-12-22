import { Tabs } from 'antd';
import styled from 'styled-components';

export const AsnTabs = styled(Tabs)`
margin-left: 40px;
&.ant-tabs-top>.ant-tabs-nav:before{
border-bottom: none !important;
}
&.ant-tabs-top>.ant-tabs-nav{
margin: 0 !important;
}
.ant-tabs-content-holder{
background: var(--white);
border: none;
box-shadow: var( --overview-box-shadow);
padding-top: 50px;
}
.ant-tabs-tab{
border: none !important;
background: var(--dark-6) !important;
padding : 0 !important;
font-size: var( --base-font-size);
&:hover{
  color: var(--dark-border-ultramarine) !important;
}
}
.ant-tabs-left>.ant-tabs-nav .ant-tabs-tab+.ant-tabs-tab{
margin: 16px !important
}
.ant-tabs-left>.ant-tabs-nav .ant-tabs-tab{
margin: 16px 16px 8px 16px !important;
border-radius: 10px;
text-align: start;
}
.ant-tabs-ink-bar{
display: none
}
.ant-tabs-tab-active{
background: var(--white) !important;
} 
.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
color: var(--dark-border-ultramarine) !important;
}
.ant-tabs>.ant-tabs-nav .ant-tabs-nav-wrap{
white-space: normal;
}
.ant-tabs-left>.ant-tabs-nav .ant-tabs-tab-active{
border-left: 6px solid var(--dark-border-ultramarine) !important;
box-shadow: var( --overview-box-shadow);
translate: 16px 0px; 
border-radius: 10px 0px 0px 10px;
}
.ant-tabs-left>.ant-tabs-nav{
height: calc(100vh - 300px);
}
&.ant-tabs-card.ant-tabs-top>.ant-tabs-nav .ant-tabs-tab{
border-radius: 20px 20px 0px 0px !important;
}
.ant-tabs-nav-operations{
display: none !important;
}
`;
