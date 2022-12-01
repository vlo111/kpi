import styled from 'styled-components';
import { Modal } from 'antd';

export const AsnModal = styled(Modal)`
  width: clamp(18rem, 42vw, 40rem);
  
  .ant-modal-content {
    padding: 5rem 4rem 5rem;
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
    padding: 0;
    padding-bottom: 2rem;
  }
  
  .ant-modal-footer {
    border-top: none;
    
    .footer-action {
      display: flex;
      justify-content: space-evenly;
    }
  }

  .ant-modal-title {
    color: var(--dark-3);
    font-weight: var(--font-semibold);
    font-size: var(--headline-font-size);
  }
`;
