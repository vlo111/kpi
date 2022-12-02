import styled from 'styled-components';
import AsnForm from '../Form';

export const CreateTemplateContainer = styled(AsnForm)`
     background:var(--white);
    border-top: 3px solid var(--dark-border-ultramarine);
    box-shadow: var(--base-box-shadow);
    border-radius: 20px;
    margin: 6.3vw 9vw 0px 9vw;
  .ant-btn-icon-only{
    border-radius: 50%;
    position: absolute;
    left: 86px;
    top: 90px;
    height: 23px;
    width: 23px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
