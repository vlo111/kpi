import React from 'react';
import QuestionHeader from '../QuestionHeader';
import QuestionContent from '../QuestionContent';
import { CardContainer } from '../DynamicAssessmentForm';

const AssessmentFormItems: React.FC<any> = ({ items, remove, name, questionsLists }) => {
  return (
      <CardContainer borderTop={'3px solid var(--secondary-green)'} marginTop={'2rem'}>
        <QuestionHeader remove={remove} name={name} questionsLists={questionsLists}/>
        <QuestionContent items={items} name={name}/>
      </CardContainer>
  );
};

export default AssessmentFormItems;
