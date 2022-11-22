import styled from 'styled-components';
import { Button } from 'antd';

const AsnButton = styled(Button)`

  color: var(--white);
  background: var(--dark-border-ultramarine);
  font-weight: var(--font-bold);
  height: 44px; 
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 40px 13px 40px;
  gap: 10px; 

  
  &:hover {
    background: var(--primary-light-1);
    color: var(--dark-border-ultramarine)
  }
  &:disabled {
    background-color: #cee6e5;
    color: #ffffff;
  } 

  &.primary {
     width: 100%;
 }
`;

export default AsnButton;
