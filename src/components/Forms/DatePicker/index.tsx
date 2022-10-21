import styled from 'styled-components'
import { DatePicker } from 'antd'

const AnsDatePicker = styled(DatePicker)`
  font-size: 16px;
  background: var(--white);
  border: 1px solid var(--dark-border-ultramarine);
  border-radius: 5px;

  :disabled {
    background-color: var(--white);
  }
  :hover {
    border: 1px solid var(--dark-border-ultramarine);
  }
  :focus {
    border: 1px solid var(--dark-border-ultramarine);
    box-shadow: var(--input-box-shadow);
  }
`

export default AnsDatePicker
