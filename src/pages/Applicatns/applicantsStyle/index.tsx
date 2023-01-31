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
  overflow: hidden;
  height: 98%;

  
  .ant-input-group-wrapper{
    width: 400px;
    padding: 32px 0px 42px 0px;
  }
  .ant-table-wrapper{
    height: 79vh;
    overflow: auto;
  }
  .ant-pagination-item-link{
    border: none !important;
  }
  .ant-pagination-item{
    border: none;
  }
  .ant-pagination-item-active{
    border-radius: 100%;
    background:  var( --background-active-pagination);
  }
  .ant-pagination-item-active a{
    color: var(--active-pagination);
  }
  .ant-table-pagination-right {
    justify-content: center;
    align-items: end;
    height: 70px;
}
.ant-tag{
  height: 24px;
  font-size: 14px;
background: rgba(104, 163, 149, 0.1);
border-radius: 2px;
color: #263238;
}
.ant-table table{
  width: auto;
}
`;
