import React, { useState } from 'react';
import QuestionHeader from '../QuestionHeader';
import QuestionContent from '../QuestionContent';
import { CardContainer } from '../DynamicAssessmentForm';

const AssessmentFormItems: React.FC<any> = ({
  items,
  remove,
  name,
  questionsLists,
  add
}) => {
  const [answerType, setAnswerType] = useState('OPTION');

  return (
    <CardContainer
      borderTop={'3px solid var(--secondary-green)'}
      marginTop={'2rem'}
    >
      <QuestionHeader
        remove={remove}
        name={name}
        questionsLists={questionsLists}
        add={add}
        setAnswerType={setAnswerType}
      />
      <QuestionContent items={items} name={name} answerType={answerType}/>
    </CardContainer>
  );
};

export default AssessmentFormItems;
