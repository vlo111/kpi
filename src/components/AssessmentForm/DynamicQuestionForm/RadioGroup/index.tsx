import React from 'react';
import styled from 'styled-components';
import { Radio, Space, Typography } from 'antd';
import { AsnForm } from '../../../Forms/Form';
import { ReactComponent as DeleteIcon } from '../../../../assets/icons/delete.svg';
import {
  IAnswer,
  IAnswerCreate,
  IAssessmentRadio,
  IRadioGroup,
  OnDeleteAnswerType,
  RadioGroupChangeType
} from '../../../../types/api/assessment';
import {
  AnswersInput,
  IconButton,
  ScoreContainer,
  ScoreInputNumber
} from '../../assessmentStyle';
import _ from 'lodash';

const { Title } = Typography;

const AddQuestionRow = styled(Space)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;

  .ant-checkbox-inner {
    border: 1px solid var(--dark-border-ultramarine);
    width: 18px !important;
    height: 18px !important;
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: var(--dark-border-ultramarine);
  }

  .ant-radio-inner {
    ::after {
      background-color: var(--dark-border-ultramarine);
    }
  }
`;

const RadioGroup: React.FC<IRadioGroup> = ({
  answerList,
  contentName,
  remove,
  preview,
  calcScores,
  setAddOder,
  setRadio,
  radio
}) => {
  const form = AsnForm.useFormInstance();

  const onDeleteAnswer: OnDeleteAnswerType = (remove, name) => {
    if (radio !== undefined) {
      const radioGroup = _.cloneDeep(radio);

      radioGroup.map((c: IAssessmentRadio) => {
        if (c.name === contentName[0]) {
          if (c.value === name) {
            c.value = undefined;
          }

          if (c.value !== undefined && !(c.value < name)) {
            c.value--;
          }
        }

        return c;
      });

      setRadio(radioGroup);
    }

    const field = form.getFieldValue(['questions', contentName[0], 'answers']);

    const index = field.findIndex(
      (answer: IAnswerCreate) => answer.type === 'SHORT_TEXT'
    );

    if (index === name) {
      setAddOder(true);
    } else {
      if (index < 0) {
        setAddOder(true);
      } else {
        setAddOder(false);
      }
    }
    remove(name);
  };

  const onNumberInputChange = (): void => {
    calcScores();
  };

  const radioGroupChange: RadioGroupChangeType = (val) => {
    const index = form
      .getFieldValue(['questions', contentName[0], 'answers'])
      .findIndex((f: IAnswer) => f.score);

    form.setFieldValue(
      ['questions', contentName[0], 'answers', index, 'score'],
      0
    );

    if (radio !== undefined) {
      const radioGroup = _.cloneDeep(radio);

      radioGroup.map((c: IAssessmentRadio) => {
        if (c.name === contentName[0]) {
          c.value = val.target.value;
        }

        return c;
      });

      setRadio(radioGroup);
    } else {
      const newRadio = [
        {
          name: contentName[0] as number,
          value: val.target.value
        }
      ];

      setRadio(newRadio);
    }

    calcScores();
  };

  return (
    <>
      <Radio.Group
        onChange={radioGroupChange}
        value={radio?.find((r) => r.name === contentName[0])?.value}
        style={{
          width: '100%'
        }}
      >
        {answerList.map(({ key, name, ...restField }) => {
          return (
            <AddQuestionRow key={key} align="baseline">
              <Radio value={name}>
                <AsnForm.Item
                  {...restField}
                  name={[name, 'title']}
                  rules={[
                    {
                      required: true,
                      message: 'Enter required fields',
                      min: 1
                    }
                  ]}
                >
                  <AnswersInput
                    placeholder={`Option ${name + 1}`}
                    disabled={
                      form.getFieldValue([
                        'questions',
                        contentName[0],
                        'answers',
                        name,
                        'title'
                      ]) === 'Other' || preview === true
                    }
                  />
                </AsnForm.Item>
              </Radio>
              <Space>
                {radio?.find((c) => c.name === contentName[0])?.value ===
                  name && (
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
                      {...restField}
                      name={[name, 'score']}
                      initialValue={0}
                    >
                      <ScoreInputNumber
                        className="primary"
                        min={0}
                        onChange={() => onNumberInputChange()}
                      />
                    </AsnForm.Item>
                  </ScoreContainer>
                )}
                {answerList.length <= 2
                  ? null
                  : (
                  <IconButton disabled={preview}>
                    <DeleteIcon onClick={() => onDeleteAnswer(remove, name)} />
                  </IconButton>
                    )}
              </Space>
            </AddQuestionRow>
          );
        })}
      </Radio.Group>
    </>
  );
};

export default React.memo(RadioGroup);
