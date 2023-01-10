import { Typography } from 'antd';
import styled from 'styled-components';
import { ICardContainer } from '../../types/project';
import { AsnButton } from '../Forms/Button';
import { AsnInput, AsnTextArea } from '../Forms/Input';

export const CardTitle = styled(Typography.Title)`
  font-size: var(--headline-font-size) !important;
  color: var(--dark-border-ultramarine) !important;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;

  .anticon-edit {
    svg path {
      fill: var(--dark-border-ultramarine);
    }
  }
`;

export const CardContainer = styled.div<ICardContainer>`
  width: 100%;
  border-top: ${(props) => props.borderTop};
  margin-top: ${(props) => ((props.marginTop != null) ? props.marginTop : 0)};
  box-shadow: var(--base-box-shadow);
  border-radius: 20px;
  background-color: var(--white);
  padding: 1rem 1rem 2rem;
  margin-bottom: ${(props) => props.marginBottom};
`;

export const CustomButton = styled(AsnButton)`
  border: 0.5px solid var(--light-border) !important;
  width: 100%;
  color: var(--dark-2) !important;
  font-weight: 400 !important;
  border-radius: 0px;
  margin-top: 0.5rem;
  border-radius: 0px !important;
`;

export const CustomTextArea = styled(AsnTextArea)`
  border: 0.5px solid var(--light-border);
`;

export const CustomInput = styled(AsnInput)`
  border: 0.5px solid var(--light-border);
  border-radius: 0px;
`;

export const ModalText = styled.span`
  font-size: var(--base-font-size);
`;

export const DetailsContainer = styled.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  .ant-checkbox-inner {
    border: 1px solid var(--dark-border-ultramarine);
    width: 18px !important;
    height: 18px !important;
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: var(--dark-border-ultramarine);
  }

  .ant-radio-inner {
    ::after {
      background-color: var(--dark-border-ultramarine);
    }
  }
  .ant-radio-group {
    margin-top: 1rem;
  }
`;

export const DividerLine = styled.span`
  display: flex;
  flex-direction: row;
  .ant-divider {
    ::before {
      display: none;
    }
    .ant-divider-inner-text {
      padding: 0rem 1rem 0rem 0rem;
    }
    ::after {
      border-top: 1px solid var(--dark-border-ultramarine);
      top: 6px;
    }
  }
  .ant-divider-horizontal {
    margin: 0px;
  }
`;
