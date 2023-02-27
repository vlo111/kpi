import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { AsnButton } from '../../Forms/Button';
import { AsnForm } from '../../Forms/Form';
import { AsnInput } from '../../Forms/Input';
import {
  ButtonsContainer,
  MaxScores,
  Scores
} from '../DynamicAssessmentForm';
import {
  IAnswerCreate,
  IDynamicQuestionForm,
  OnAddQuestionType
} from '../../../types/api/assessment';
import CheckboxGroup from './CheckboxGroup';
import RadioGroup from './RadioGroup';

const { Title } = Typography;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const AnswersInput = styled(AsnInput)`
  border-radius: 0px;
  width: 100% !important ;
  border: 1px solid var(--light-border);
  :hover {
    border: 1px solid var(--light-border) !important;
  }

  :disabled {
    color: rgba(0, 0, 0, 0.85);
  }
`;

export const IconButton = styled(AsnButton)`
  border: none;
  background-color: var(--white) !important;
  box-shadow: none !important;
  padding: 0;
`;

const AddAnswerButton = styled(AsnButton)`
  border-radius: 0px !important;
  border: 1px solid var(--light-border) !important;
  padding: 0rem 3rem;
  width: 20vw;
  span {
    color: var(--dark-2);
  }
`;

const DynamicQuestionForm: React.FC<IDynamicQuestionForm> = ({
  contentName,
  answerType,
  calcScores,
  preview,
  radio,
  setRadio,
  checkbox,
  setCheckbox,
  checkboxScoreCount,
  checkboxScoreCalc,
  assessmentData
}) => {
  const [addOder, setAddOder] = useState(true);

  const form = AsnForm.useFormInstance();

  useEffect(() => {
    if (
      form.getFieldValue(['questions', contentName[0], 'answerType']) ===
      'OPTION'
    ) {
      form
        .getFieldValue(['questions', contentName[0], 'answers'])
        ?.forEach((item: IAnswerCreate) => {
          if (item.title === 'Other') {
            setAddOder(false);
          }
        });
    }
  }, [assessmentData]);

  const onAddOderAnswer: OnAddQuestionType = (add) => {
    const field = form.getFieldValue(['questions', contentName[0], 'answers']);
    const index = field.findIndex(
      (answer: IAnswerCreate) => answer.type === 'SHORT_TEXT'
    );
    if (index < 0) {
      setAddOder(false);
    }
    add({
      title: 'Other',
      score: 0,
      type: 'SHORT_TEXT'
    });
  };

  return (
    <AsnForm.List name={contentName}>
      {(answerList, { add, remove }) => (
        <>
          {form.getFieldsValue().questions?.[contentName[0]].answerType ===
          'OPTION'
            ? (
            <RadioGroup
              answerList={answerList}
              contentName={contentName}
              remove={remove}
              preview={preview}
              calcScores={calcScores}
              setAddOder={setAddOder}
              setRadio={setRadio}
              radio={radio}
            />
              )
            : form.getFieldsValue().questions?.[contentName[0]].answerType ===
            'CHECKBOX'
              ? (
            <CheckboxGroup
              setCheckbox={setCheckbox}
              checkboxScoreCalc={checkboxScoreCalc}
              calcScores={calcScores}
              checkbox={checkbox}
              answerList={answerList}
              contentName={contentName}
              remove={remove}
              preview={preview}
            />
                )
              : null}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: '1rem'
            }}
          >
            <ButtonsContainer
              style={{
                justifyContent: 'flex-start',
                gap: '2rem'
              }}
            >
              <AddAnswerButton
                className="default"
                onClick={() =>
                  add({
                    title: '',
                    score: 0,
                    type: answerType
                  })
                }
              >
                +Add Option
              </AddAnswerButton>
              {form.getFieldsValue().questions?.[contentName[0]].answerType ===
                'OPTION' && addOder
                ? (
                <AddAnswerButton
                  className="default"
                  onClick={() => onAddOderAnswer(add)}
                >
                  +Add Other
                </AddAnswerButton>
                  )
                : null}
            </ButtonsContainer>
            {form.getFieldsValue().questions?.[contentName[0]].answerType ===
              'CHECKBOX' && checkbox.length >= 1
              ? (
              <Scores>
                <Title level={5} style={{ fontWeight: '400' }}>
                  Total
                </Title>
                <MaxScores>{checkboxScoreCount}</MaxScores>
              </Scores>
                )
              : null}
          </div>
        </>
      )}
    </AsnForm.List>
  );
};

export default DynamicQuestionForm;
