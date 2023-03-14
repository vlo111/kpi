import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { AsnForm } from '../../Forms/Form';
import { AsnTextArea } from '../../Forms/Input';
import DynamicQuestionForm from '../DynamicQuestionForm';
import { Void } from '../../../types/global';
import { IQuestionContent } from '../../../types/api/assessment';
import { ScoreInputNumber } from '../assessmentStyle';

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
  assessmentData,
  setCheckbox,
  checkbox,
  radio,
  setRadio
}) => {
  const form = AsnForm.useFormInstance();

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

  const answer = form.getFieldsValue().questions?.[name[0]].answerType;

  const isCheckList = answer === 'OPTION' || answer === 'CHECKBOX';

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
      {isCheckList
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
