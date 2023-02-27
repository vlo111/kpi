import React, { useEffect, useState } from 'react';
import QuestionHeader from '../QuestionHeader';
import QuestionContent from '../QuestionContent';
import { CardContainer } from '../DynamicAssessmentForm';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { AsnForm } from '../../Forms/Form';
import { Void } from '../../../types/global';
import {
  IAnswerCreate,
  IAssessmentFormItems,
  IQuestion
} from '../../../types/api/assessment';

const AssessmentFormItems: React.FC<IAssessmentFormItems> = ({
  questionsLists,
  remove,
  name,
  add,
  answerType,
  setAnswerType,
  setAllScore,
  preview,
  assessmentData
}) => {
  const form = AsnForm.useFormInstance();
  const [radio, setRadio] = useState<number | undefined>();
  const [checkbox, setCheckbox] = useState<CheckboxValueType[]>([]);
  const [checkboxScoreCount, setCheckboxScoreCount] = useState(0);

  const calcScores: Void = () => {
    if (form.getFieldValue(['questions', name[0], 'answers'])?.length > 0) {
      const scores = form
        .getFieldValue(['questions', name[0], 'answers'])
        .reduce(
          (acc: number, current: IAnswerCreate) =>
            +acc + Number(current.score === undefined ? 0 : current.score),
          0
        );
      form.setFieldValue(['questions', name[0], 'score'], scores);
    }
    const allScores = form
      .getFieldValue(['questions'])
      .reduce((acc: number, currentData: { score: number }) => {
        return (
          +acc + Number(currentData.score === undefined ? 0 : currentData.score)
        );
      }, 0);
    setAllScore(allScores);
  };

  const checkboxScoreCalc: Void = () => {
    const scores = form
      .getFieldValue(['questions', name[0], 'answers'])
      .reduce(
        (acc: number, current: { score: number }) => +acc + +current.score,
        0
      );
    setCheckboxScoreCount(scores);
  };

  useEffect(() => {
    form.getFieldValue(['questions'])?.forEach((question: IQuestion) => {
      if (question?.answers?.length > 0 && question?.answerType === 'OPTION') {
        question?.answers?.forEach(
          (answer, index) => {
            if (answer.score > 0) {
              setRadio(index);
            }
          }
        );
      }
      if (
        question?.answers?.length > 0 &&
        question?.answerType === 'CHECKBOX'
      ) {
        const arr: number[] = [];
        question?.answers?.forEach((answer, index) => {
          if (answer.score > 0) {
            arr.push(index);
          }
          setCheckbox(arr);
        });
      }
    });
    if (form.getFieldValue(['questions', name[0], 'answers']) !== undefined) {
      calcScores();
      checkboxScoreCalc();
    }
  }, [assessmentData]);

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
        radio={radio}
        setRadio={setRadio}
        checkbox={checkbox}
        setCheckbox={setCheckbox}
        checkboxScoreCount={checkboxScoreCount}
        checkboxScoreCalc={checkboxScoreCalc}
      />
    </CardContainer>
  );
};

export default React.memo(AssessmentFormItems);
