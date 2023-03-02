import React, { useState } from 'react';
import QuestionHeader from '../QuestionHeader';
import QuestionContent from '../QuestionContent';
import { AsnForm } from '../../Forms/Form';
import { Void } from '../../../types/global';
import {
  IAnswerCreate,
  IAssessmentFormItems
} from '../../../types/api/assessment';
import { CardContainer } from '../assessmentStyle';

const AssessmentFormItems: React.FC<IAssessmentFormItems> = ({
  questionsLists,
  remove,
  name,
  add,
  answerType,
  setAnswerType,
  setAllScore,
  preview,
  assessmentData,
  n
}) => {
  const form = AsnForm.useFormInstance();
  const [checkboxScoreCount, setCheckboxScoreCount] = useState(0);

  const calcScores: Void = () => {
    if (form.getFieldValue(['questions', name[0], 'answers'])?.length > 0) {
      const scores = form
        .getFieldValue(['questions', name[0], 'answers'])
        .reduce(
          (acc: number, current: IAnswerCreate) =>
            acc + Number(current.score === undefined ? 0 : current.score),
          0
        );
      form.setFieldValue(['questions', name[0], 'score'], scores);
    }
    const allScores = form
      .getFieldValue(['questions'])
      .reduce((acc: number, currentData: { score: number }) => {
        return (
          acc + Number(currentData.score === undefined ? 0 : currentData.score)
        );
      }, 0);
    setAllScore(allScores);
  };

  const checkboxScoreCalc: Void = () => {
    const scores = form
      .getFieldValue(['questions', name[0], 'answers'])
      .reduce(
        (acc: number, current: { score: number }) => acc + current.score,
        0
      );
    setCheckboxScoreCount(scores);
  };

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
        preview={preview}
        calcScores={calcScores}
      />
      <QuestionContent
        name={name}
        answerType={answerType}
        setAllScore={setAllScore}
        preview={preview}
        assessmentData={assessmentData}
        calcScores={calcScores}
        checkboxScoreCount={checkboxScoreCount}
        checkboxScoreCalc={checkboxScoreCalc}
      />
    </CardContainer>
  );
};

export default AssessmentFormItems;
