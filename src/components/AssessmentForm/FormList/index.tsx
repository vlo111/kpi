import React from 'react';
import QuestionHeader from '../QuestionHeader';
import QuestionContent from '../QuestionContent';
import { CardContainer } from '../DynamicAssessmentForm';

const AssessmentFormItems: React.FC<any> = ({ items, add, remove, questionsLists, name }) => {
  return (
      <CardContainer borderTop={'3px solid var(--secondary-green)'} marginTop={'2rem'}>
        <QuestionHeader remove={remove} items={items} questionsLists={questionsLists} add={add} name={name}/>
        <QuestionContent items={items} name={name}/>
      </CardContainer>
  );
};

export default AssessmentFormItems;
