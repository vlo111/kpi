import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { AsnForm } from '../../Forms/Form';
import { AsnTextArea } from '../../Forms/Input';
import DynamicQuestionForm from '../DynamicQuestionForm';
import { Void } from '../../../types/global';
import { IQuestion, IQuestionContent } from '../../../types/api/assessment';
import { ScoreInputNumber } from '../assessmentStyle';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const { Title } = Typography;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

const QuestionContentContainer = styled.div`
  margin-top: 1rem;
  svg {
    cursor: pointer;
  }
`;

const AddQuestionTextArea = styled(AsnTextArea)`
  border: 0.5px solid var(--light-border) !important;
  :hover {
    border: 0.5px solid var(--light-border) !important;
  }
`;

const QuestionContent: React.FC<IQuestionContent> = ({
  name,
  answerType,
  setAllScore,
  preview,
  calcScores,
  checkboxScoreCount,
  checkboxScoreCalc,
  assessmentData
}) => {
  const form = AsnForm.useFormInstance();
  const [radio, setRadio] = useState<number | undefined>();
  const [checkbox, setCheckbox] = useState<CheckboxValueType[]>([]);

  const onInputNumberChange: Void = () => {
    const allScores = form
      .getFieldValue(['questions'])
      .reduce(
        (acc: number, current: { score: number }) =>
          +acc + Number(current.score === undefined ? 0 : current.score),
        0
      );
    setAllScore(allScores);
  };

  useEffect(() => {
    form.getFieldValue(['questions'])?.forEach((question: IQuestion) => {
      if (question?.answers?.length > 0 && question?.answerType === 'OPTION') {
        question?.answers?.forEach((answer, index) => {
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
  }, [assessmentData, radio]);

  return (
    <QuestionContentContainer>
      <AsnForm.Item
        name={[name[0], 'title']}
        rules={[
          {
            required: true,
            message: 'Enter required fields',
            min: 2
          }
        ]}
      >
        <AddQuestionTextArea
          placeholder="Question "
          style={{
            marginBottom: '1rem'
          }}
        />
      </AsnForm.Item>
      {form.getFieldsValue().questions?.[name[0]].answerType === 'OPTION' ||
      form.getFieldsValue().questions?.[name[0]].answerType === 'CHECKBOX'
        ? (
        <DynamicQuestionForm
          contentName={name}
          answerType={answerType}
          preview={preview}
          calcScores={calcScores}
          radio={radio}
          setRadio={setRadio}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
          checkboxScoreCount={checkboxScoreCount}
          checkboxScoreCalc={checkboxScoreCalc}
          assessmentData={assessmentData}
        />
          )
        : (
        <ScoreContainer>
          <Title
            level={5}
            style={{
              fontWeight: '400',
              margin: '0 0.5rem 0 ',
              fontSize: 'var(--base-font-size)'
            }}
          >
            Score
          </Title>
          <AsnForm.Item
            name={[name[0], 'score']}
            initialValue={0}
            rules={[{ required: true, message: 'Missing first name' }]}
          >
            <ScoreInputNumber
              className="primary"
              min={0}
              onChange={onInputNumberChange}
            />
          </AsnForm.Item>
        </ScoreContainer>
          )}
    </QuestionContentContainer>
  );
};

export default QuestionContent;
