import styled from 'styled-components';

export const ContentAssingersFilter = styled.div`
.ant-collapse>.ant-collapse-item .ant-collapse-icon-collapsible-only .ant-collapse-expand-icon {
    cursor: pointer;
    position: absolute;
    right: 10px;
    font-size: var(--font-size-semilarge);
    top: 0;
    height: auto;
}
.ant-collapse-borderless{
  background-color: var(--white);
}

.ant-collapse>.ant-collapse-item .ant-collapse-icon-collapsible-only{
    font-size: var(--base-font-size);
    color: var(--dark-2);
}
.ant-radio-wrapper{
  font-size: var(--base-font-size);
    color: var(--dark-2);
}
.ant-radio-inner:after{
  background-color: var(--dark-border-ultramarine);
}
.ant-radio-checked .ant-radio-inner{
  border-color: var(--dark-border-ultramarine);
}
.ant-radio:hover .ant-radio-inner{
  border-color: var(--dark-border-ultramarine);
}
.ant-checkbox-group-item {
  font-size: 16px;
    color: var(--dark-2);
}
.ant-slider-track{
  background-color: var(--dark-border-ultramarine);
}
.ant-slider-handle{
  background-color: var(--white);
  border-color: var(--dark-border-ultramarine);
  box-shadow: none;
  .ant-tooltip-open{
    border-color: var(--dark-border-ultramarine);
  }
}
.ant-slider:hover .ant-slider-track{
  background-color: var(--dark-border-ultramarine);
}
.ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
  border-color: var(--dark-border-ultramarine);
}
`;
export const Container = styled.div`
  background: var(--white);
  box-shadow: var(--base-box-shadow);
  border-radius: 20px 20px 0px 0px;
  margin: 16px 0px 0px 16px;
  
  .ant-input-group-wrapper{
    width: 400px;
    padding: 32px 0px 42px 0px;
  }
  .ant-table-wrapper{
    height: 79vh;
    overflow: auto;
  }
`;
