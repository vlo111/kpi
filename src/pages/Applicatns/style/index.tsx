import styled from 'styled-components';

export const ContentAssingersFilter = styled.div`
.ant-collapse>.ant-collapse-item .ant-collapse-icon-collapsible-only .ant-collapse-expand-icon {
    cursor: pointer;
    position: absolute;
    right: 10px;
    font-size: 24px;
    top: 0;
    height: auto;
}
.ant-collapse-borderless{
  background-color: white;
}
.ant-collapse>.ant-collapse-item>.ant-collapse-header .ant-collapse-header-text{
  /* height: 44px; */
}
.ant-collapse>.ant-collapse-item>.ant-collapse-header{
  /* padding: 0; */
}
.ant-collapse>.ant-collapse-item .ant-collapse-icon-collapsible-only{
    font-size: 16px;
    color: #263238;
}
.ant-radio-wrapper{
  font-size: 16px;
    color: #263238;
}
.ant-radio-inner:after{
  background-color: #2A5578;
}
.ant-radio-checked .ant-radio-inner{
  border-color: #2A5578 ;
}
.ant-radio:hover .ant-radio-inner{
  border-color: #2A5578 ;
}
.ant-checkbox-group-item {
  font-size: 16px;
    color: #263238;
}
.ant-slider-track{
  background-color: #2A5578;
}
.ant-slider-handle{
  background-color: white;
  border-color: #2A5578;
  box-shadow: none;
  .ant-tooltip-open{
    border-color: #2A5578;
  }
}
.ant-slider:hover .ant-slider-track{
  background-color: #2A5578;
}
.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
  border-color: #2A5578;
}
`;
