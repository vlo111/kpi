import styled from 'styled-components'
import { Collapse } from 'antd'

export const AnsCollapse = styled(Collapse)`
  border: none;

  .ant-collapse-header {
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 6px !important;
  }

  .ant-collapse-expand-icon {
    position: absolute;
    right: 0;
  }

  .ant-collapse-content {
    border: none;
  }

  .ant-collapse-item {
    border-bottom: none;
  }
`

export const { Panel } = AnsCollapse
