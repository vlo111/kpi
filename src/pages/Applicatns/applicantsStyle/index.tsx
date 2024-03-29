import { Typography } from 'antd';
import styled from 'styled-components';

const { Paragraph } = Typography;

export const ContentAssingersFilter = styled.div`
  .ant-collapse
    > .ant-collapse-item
    .ant-collapse-icon-collapsible-only
    .ant-collapse-expand-icon {
    cursor: pointer;
    position: absolute;
    right: 10px;
    font-size: var(--font-size-semilarge);
    top: 0;
    height: auto;
  }
  .ant-collapse-borderless {
    background-color: var(--white);
  }

  .ant-collapse > .ant-collapse-item .ant-collapse-icon-collapsible-only {
    font-size: var(--base-font-size);
    color: var(--dark-2);
  }
  .ant-radio-wrapper {
    font-size: var(--base-font-size);
    color: var(--dark-2);
  }
  .ant-radio-inner:after {
    background-color: var(--dark-border-ultramarine);
  }
  .ant-radio-checked .ant-radio-inner {
    border-color: var(--dark-border-ultramarine);
  }
  .ant-radio:hover .ant-radio-inner {
    border-color: var(--dark-border-ultramarine);
  }
  .ant-checkbox-group-item {
    font-size: 16px;
    color: var(--dark-2);
  }
  .ant-slider-track {
    background-color: var(--dark-border-ultramarine);
  }
  .ant-slider-handle {
    background-color: var(--white);
    border-color: var(--dark-border-ultramarine);
    box-shadow: none;
    .ant-tooltip-open {
      border-color: var(--dark-border-ultramarine);
    }
  }
  .ant-slider:hover .ant-slider-track {
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
  
  .ant-pagination-item-link {
    border: none !important;
  }
  .ant-pagination-item {
    border: none;
  }
  .ant-pagination-item-active {
    border-radius: 100%;
    background: var(--background-active-pagination);
  }
  .ant-pagination-item-active a {
    color: var(--active-pagination);
  }
  .ant-table-pagination-right {
    justify-content: center;
    align-items: end;
  }
  .ant-tag {
    height: 24px;
    font-size: var(--font-size-semismall);
    background: rgba(104, 163, 149, 0.1);
    border-radius: 2px;
    color: var(--dark-2);
  }
  .ant-table table {
    width: auto;
  }
  .clearfilter{
    background-color: var(--white);
    border: none;
    color: var(--dark-border-ultramarine);
    cursor: pointer;
  }
  .tableName{
    strong{
      font-weight: 400;
    }
  }

.react-resizable-handle {
  position: absolute;
  right: -5px;
  bottom: 0;
  z-index: 1;
  width: 10px;
  height: 100%;
  cursor: col-resize;
}

`;

export const CustomParagraphApplicants = styled(Paragraph)<{ width: string }>`
  width: ${(props) => props.width} !important;
  margin-bottom: "0rem";
`;

export const CustomTitleApplicants = styled.div<{ width: string }>`
  width: ${(props) => props.width} !important;
`;
