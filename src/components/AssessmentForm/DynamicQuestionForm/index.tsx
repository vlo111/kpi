import React, { useState } from 'react';
import styled from 'styled-components';
import { Radio, Space, Typography } from 'antd';
import { AsnButton } from '../../Forms/Button';
import { AsnForm } from '../../Forms/Form';
import { AsnInput } from '../../Forms/Input';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import {
  ButtonsContainer,
  // MaxScores,
  ScoreInputNumber
  // Scores
} from '../DynamicAssessmentForm';
import { AsnCheckbox } from '../../Forms/Checkbox';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

const { Title } = Typography;

export const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const AnswersInput = styled(AsnInput)`
  border-radius: 0px;
  width: 100%;
  border: 1px solid var(--light-border);
  :hover {
    border: 1px solid var(--light-border) !important;
  }
`;

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

const AddAnswerButton = styled(AsnButton)`
  border-radius: 0px !important;
  border: 1px solid var(--light-border) !important;
  padding: 0rem 3rem;
  width: 20vw;
  span {
    color: var(--dark-2);
  }
`;

const DynamicQuestionForm: React.FC<any> = ({ contentName, answerType }) => {
  const [radio, setRadio] = useState();
  const [checkbox, setCheckbox] = useState<CheckboxValueType[]>([]);
  const [addOder, setAddOder] = useState(true);
  const form = AsnForm.useFormInstance();

  const onDeleteAnswer: any = (remove: any, name: number) => {
    const field = form.getFieldValue(['questions', contentName[0], 'answers']);
    const index = field.findIndex((f: any) => f.type === 'SHORT_TEXT');
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

  const onAddOderAnswer = (add: any): void => {
    const field = form.getFieldValue(['questions', contentName[0], 'answers']);
    const index = field.findIndex((f: any) => f.type === 'SHORT_TEXT');
    if (index < 0) {
      setAddOder(false);
    }
    add({
      title: 'Other...',
      score: 0,
      type: 'SHORT_TEXT'
    });
  };

  return (
    <AsnForm.List name={contentName}>
      {(answerList, { add, remove }) => (
        <>
          {form.getFieldsValue().questions?.[contentName[0]].type ===
          'OPTION'
            ? (
            <Radio.Group
              onChange={(val) => {
                setRadio(val.target.value);
              }}
            >
              {answerList.map(({ key, name, ...restField }) => (
                <AddQuestionRow key={key} align="baseline">
                  <Radio value={name}>
                    <AsnForm.Item
                      {...restField}
                      name={[name, 'title']}
                      rules={[
                        { required: true, message: 'Missing first name' }
                      ]}
                    >
                      <AnswersInput placeholder={`Option ${key + 1}`} />
                    </AsnForm.Item>
                  </Radio>
                  <Space>
                    {radio === name && (
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
                          rules={[
                            { required: true, message: 'Missing first name' }
                          ]}
                        >
                          <ScoreInputNumber className="primary" min={0} />
                        </AsnForm.Item>
                      </ScoreContainer>
                    )}
                    {answerList.length <= 2
                      ? null
                      : (
                      <DeleteIcon
                        onClick={() => onDeleteAnswer(remove, name)}
                      />
                        )}
                  </Space>
                </AddQuestionRow>
              ))}
            </Radio.Group>
              )
            : form.getFieldsValue().questions?.[contentName[0]].type ===
            'CHECKBOX'
              ? (
            <AsnCheckbox.Group
              onChange={(val: CheckboxValueType[]) => setCheckbox(val)}
            >
              {answerList.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'space-between'
                  }}
                  align="baseline"
                >
                  <AsnCheckbox value={name}>
                    <AsnForm.Item
                      {...restField}
                      name={[name, 'title']}
                      rules={[
                        { required: true, message: 'Missing first name' }
                      ]}
                    >
                      <AnswersInput placeholder={`Option ${key + 1}`} />
                    </AsnForm.Item>
                  </AsnCheckbox>
                  <Space>
                    {checkbox.includes(name) && (
                      <ScoreContainer key={key}>
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
                          rules={[
                            { required: true, message: 'Missing first name' }
                          ]}
                        >
                          <ScoreInputNumber className="primary" min={0} />
                        </AsnForm.Item>
                      </ScoreContainer>
                    )}
                    {answerList.length <= 2
                      ? null
                      : (
                      <DeleteIcon onClick={() => remove(name)} />
                        )}
                  </Space>
                </Space>
              ))}
            </AsnCheckbox.Group>
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
              {form.getFieldsValue().questions?.[contentName[0]].type ===
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
            {/* {form.getFieldsValue().questions?.[contentName[0]].type === 'CHECKBOX' && checkbox.length >= 1
              ? (
              <Scores>
                <Title level={5} style={{ fontWeight: '400' }}>
                  Total
                </Title>
                <MaxScores></MaxScores>
              </Scores>
                )
              : null} */}
          </div>
        </>
      )}
    </AsnForm.List>
  );
};

export default DynamicQuestionForm;
