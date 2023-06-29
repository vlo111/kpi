import styled from 'styled-components';
import { Collapse } from 'antd';

export const AsnCollapseStyle = styled(Collapse)`
  border: none;
  background: var(--dark-7);
  box-shadow: var(--base-box-shadow);
  border-radius: 20px;
  padding-top: 3px;
  
  .ant-collapse-header {
    border: 1px solid var(--dark-5);
    background: var(--white);
    border-radius: 6px !important;
    font-size: var(--headline-font-size);
    color: var(--dark-2);
    margin-left: -1px;
    margin-top: -4px;
    width: calc(100% - -1px);
  }

  .ant-collapse-content {
    border: none;
    background: transparent;

    >.ant-collapse-content-box {
      padding: 2rem 3rem 2rem 3rem;
    }
  }

  .ant-collapse-item {
    border-bottom: none;
  }
  
  .ant-form-item-control-input {
    width: 100% !important;
  }
`;

export const { Panel } = AsnCollapseStyle;
