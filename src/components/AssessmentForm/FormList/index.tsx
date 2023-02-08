import React from 'react';
import styled from 'styled-components';
import QuestionHeader from '../QuestionHeader';
import QuestionContent from '../QuestionContent';
import { CardContainer } from '../DynamicAssessmentForm';
import { ReactComponent as AddAssessmentIcon } from '../../../assets/icons/add-assessment.svg';

export const FormItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2rem;
`;

export const FAddAssessmentButton = styled.div`
  display: flex;
  background-color: var(--white);
  padding: 10px;
  height: fit-content;
  border-radius: 16px;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const AssessmentFormItems: React.FC<any> = ({ items, add, remove, questionsLists }) => {
  return (
    <FormItemContainer>
      <CardContainer borderTop={'3px solid var(--secondary-green)'}>
        <QuestionHeader remove={remove} items={items} questionsLists={questionsLists} />
        <QuestionContent items={items} />
      </CardContainer>
      <FAddAssessmentButton onClick={add}>
        <AddAssessmentIcon />
      </FAddAssessmentButton>
    </FormItemContainer>
  );
};

export default AssessmentFormItems;
