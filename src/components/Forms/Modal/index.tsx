import styled from 'styled-components'
import { Modal } from 'antd'

export const AsnModal = styled(Modal)`
  width: clamp(18rem, 42vw, 40rem);
  
  .ant-modal-content {
    padding: 32px 72px 52px;
    border-radius: 20px;
  }
  
  .ant-modal-body {
    padding: 0;
  }
  
  .ant-modal-header {
    text-align: center;
    font-size: var(--headline-font-size);
    color: var(--dark-3);
    border-bottom: none;
  }
  
  .ant-modal-footer {
    border-top: none;
    
    .footer-action {
      display: flex;
      justify-content: space-evenly;
    }
  }
`
