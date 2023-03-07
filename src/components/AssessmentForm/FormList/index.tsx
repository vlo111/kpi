import React, { useState } from 'react';
import QuestionHeader from '../QuestionHeader';
import QuestionContent from '../QuestionContent';
import { AsnForm } from '../../Forms/Form';
import { Void } from '../../../types/global';
import {
  IAnswerCreate,
  IAssessmentFormItems, RemoveQuestion
} from '../../../types/api/assessment';
import { CardContainer } from '../assessmentStyle';
import _ from 'lodash';

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
  checkbox,
  setCheckbox,
  radio,
  setRadio
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

  const updateNames: any = (items: any) => {
    if (items !== undefined) {
      items.forEach((item: { name: number }) => {
        if (item.name > name[0]) {
          item.name--;
        }
      });
    }

    return items;
  };

  const removeQuestion: RemoveQuestion = (n, updateName) => {
    const checkboxGroup = _.cloneDeep(checkbox);

    const radioGroup = _.cloneDeep(radio);

    if (radioGroup !== undefined) {
      const radioIndex = radioGroup.findIndex((r) => r.name === n);

      if (radioIndex > -1) {
        radioGroup.splice(radioIndex, 1);
      }

      if (updateName) { updateNames(radioGroup); }

      setRadio(() => radioGroup);
    }

    if (checkboxGroup !== undefined) {
      const checkboxIndex = checkboxGroup.findIndex((r) => r.name === n);

      if (checkboxIndex > -1) {
        checkboxGroup.splice(checkboxIndex, 1);
      }

      if (updateName) { updateNames(checkboxGroup); }

      setCheckbox(() => checkboxGroup);
    }
  };

  const addQuestionChecks: (value: string) => void = (value) => {
    if (value === 'OPTION') {
      let radioGroup = _.cloneDeep(radio);

      if (radioGroup === undefined) {
        radioGroup = [{
          name: name[0] as number,
          value: undefined
        }];
      } else {
        radioGroup.push({
          name: name[0] as number,
          value: undefined
        });
      }

      setRadio(radioGroup);
    } else {
      let checkboxGroup = _.cloneDeep(checkbox);

      if (checkboxGroup !== undefined) {
        checkboxGroup.push({
          name: name[0] as number,
          value: []
        });
      } else {
        checkboxGroup = [{
          name: name[0] as number,
          value: []
        }];
      }

      setCheckbox(checkboxGroup);
    }
  };

  return (
    <CardContainer
      borderTop={'3px solid var(--secondary-green)'}
      marginTop={'2rem'}
    >
      <QuestionHeader
        remove={remove}
        removeQuestion={removeQuestion}
        name={name}
        add={add}
        setAnswerType={setAnswerType}
        answerType={answerType}
        questionsLists={questionsLists}
        preview={preview}
        calcScores={calcScores}
        addQuestionChecks={addQuestionChecks}
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
        checkbox={checkbox}
        setCheckbox={setCheckbox}
        radio={radio}
        setRadio={setRadio}
      />
    </CardContainer>
  );
};

export default AssessmentFormItems;
