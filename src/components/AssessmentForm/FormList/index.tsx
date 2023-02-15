import React from 'react';
import QuestionHeader from '../QuestionHeader';
import QuestionContent from '../QuestionContent';
import { CardContainer } from '../DynamicAssessmentForm';

const AssessmentFormItems: React.FC<any> = ({
  questionsLists,
  remove,
  name,
  add,
  answerType,
  setAnswerType
}) => {
  return (
    <CardContainer
      borderTop={'3px solid var(--secondary-green)'}
      marginTop={'2rem'}
    >
      <QuestionHeader
        remove={remove}
        name={name}
        add={add}
        setAnswerType={setAnswerType}
        answerType={answerType}
        questionsLists={questionsLists}
      />
      <QuestionContent
        name={name}
        answerType={answerType}
      />
    </CardContainer>
  );
};

export default React.memo(AssessmentFormItems);
