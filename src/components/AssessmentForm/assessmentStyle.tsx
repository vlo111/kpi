import styled from 'styled-components';
import { Typography } from 'antd';
import { ICardContainer } from '../../types/api/application/applicationForm';
import { AsnInput, AsnInputNumber } from '../Forms/Input';
import { IButtonContainer } from '../../types/api/assessment';
import { AsnButton } from '../Forms/Button';

export const CardContainer = styled.div<ICardContainer>`
  width: 100%;
  border-top: ${(props) => props.borderTop};
  margin-top: ${(props) => (props.marginTop != null ? props.marginTop : 0)};
  box-shadow: var(--base-box-shadow);
  border-radius: 20px;
  background-color: var(--white);
  padding: 1rem 1rem 2rem;
  margin-bottom: ${(props) => props.marginBottom};

  .ant-form-item {
    margin: 0;
  }
`;

export const CardTitle = styled(Typography.Title)`
  font-size: var(--headline-font-size) !important;
  color: var(--dark-border-ultramarine) !important;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const ScoreInputNumber = styled(AsnInputNumber)`
  display: flex;
  align-items: center;
  border-radius: 2px !important;
`;

export const ButtonsContainer = styled.div<IButtonContainer>`
  display: flex;
  justify-content: flex-end;
  margin-top: ${(props) => props.marginTop};
  gap: 60px;
`;

export const Scores = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 0.5rem;
  margin-right: 1rem;
`;

export const MaxScores = styled.div`
  width: 90px;
  height: 44px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--base-font-size);
`;

export const AddAssessmentButton = styled.div`
  display: flex;
  background-color: var(--white);
  padding: 10px;
  height: fit-content;
  border-radius: 16px;
  margin-left: 0.5rem;
  margin-top: 2rem;
  cursor: pointer;
  position: absolute;
  left: 100%;
`;

export const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormInput = styled(AsnInput)`
  border: none;
  width: 100%;
  margin-bottom: 1rem;
  box-shadow: var(--base-box-shadow);
`;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const AnswersInput = styled(AsnInput)`
  border-radius: 0px;
  width: 100% !important ;
  border: 1px solid var(--light-border);
  :hover {
    border: 1px solid var(--light-border) !important;
  }

  :disabled {
    color: rgba(0, 0, 0, 0.85);
  }
`;

export const IconButton = styled(AsnButton)`
  border: none;
  background-color: var(--white) !important;
  box-shadow: none !important;
  padding: 0;
`;
