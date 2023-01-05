import { Switch } from 'antd';
import styled from 'styled-components';

export const AsnSwitch = styled(Switch)`
  &.ant-switch {
    min-width: 0px;
    width: 34px !important;
    height: 14px;
    .ant-switch-handle {
      width: 20px;
      height: 20px;
      top: -3px !important;
      left: -1px !important;
    }
  }

  &.ant-switch-checked {
    background-color: var(--secondary-green);
    width: 34px !important;
    height: 14px;

    .ant-switch-handle {
      width: 20px;
      height: 20px;
      top: -3px !important;
      left: 14px !important;
    }
  }
`;
