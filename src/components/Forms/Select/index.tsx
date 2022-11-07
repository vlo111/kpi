import styled from 'styled-components'
import { Select } from 'antd'

export const AnsSelect = styled(Select)`
  &.ant-select-focused {

    .ant-select-selector {
      border: 1px solid var(--dark-border-ultramarine) !important;
      box-shadow: var(--input-box-shadow) !important;
    }
  }
  
  .ant-select-selector {
    box-shadow: none !important;
  }
`
