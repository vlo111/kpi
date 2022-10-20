import styled from 'styled-components'
import { Steps } from 'antd'

const AnsSteps = styled(Steps)`
  border-radius: 30px;
  border: 2px solid #0B847F;  
  display:flex; 
  justify-content: center;
  align-items: center;
  padding: 13px  40px  13px  40px;
  gap: 10px;
 

  &.ant-btn-default {
    color: #0b847f;
    height: 48px
  } 
  :disabled {
    background-color: #cee6e5;
    color: #ffffff;
  }
  &:hover {
    background-color:red;
    color: #ffffff;
  }
`

export default AnsSteps
