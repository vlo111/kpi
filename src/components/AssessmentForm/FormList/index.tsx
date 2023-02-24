import React, { useEffect, useState } from 'react';
import QuestionHeader from '../QuestionHeader';
import QuestionContent from '../QuestionContent';
import { CardContainer } from '../DynamicAssessmentForm';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { AsnForm } from '../../Forms/Form';
import { Void } from '../../../types/global';

const AssessmentFormItems: React.FC<any> = ({
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
          (acc: any, current: any) =>
            +acc + Number(current.score === undefined ? 0 : current.score),
          0
        );
      form.setFieldValue(['questions', name[0], 'score'], scores);
    }
    const allScores = form
      .getFieldValue(['questions'])
      .reduce((a: any, d: { score: any }) => {
        return +a + Number(d.score === undefined ? 0 : d.score);
      }, 0);
    setAllScore(allScores);
  };

  const checkboxScoreCalc = (): void => {
    const scores = form
      .getFieldValue(['questions', name[0], 'answers'])
      .reduce((acc: any, current: any) => +acc + +current.score, 0);
    setCheckboxScoreCount(scores);
  };

  useEffect(() => {
    form.getFieldValue(['questions'])?.forEach((question: any): any => {
      if (question?.answers?.length > 0 && question?.answerType === 'OPTION') {
        question?.answers?.forEach((answer: any, index: number): void => {
          if (answer.score > 0) {
            setRadio(index);
          }
        });
      }
      if (
        question?.answers?.length > 0 &&
        question?.answerType === 'CHECKBOX'
      ) {
        const arr: number[] = [];
        question?.answers?.forEach((answer: any, index: number): void => {
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
