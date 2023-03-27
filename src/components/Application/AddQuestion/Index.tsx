import React, { useEffect } from 'react';
import { Space, Typography } from 'antd';
import { CardContainer } from '../applicationStyle';
import styled from 'styled-components';
import DynamicQuestionForm from '../DynamicQuestionForm';
import { AsnButton } from '../../Forms/Button';
import { AsnInput } from '../../Forms/Input';
import { AsnSelect } from '../../Forms/Select';
import { AsnForm } from '../../Forms/Form';
import { AsnSwitch } from '../../Forms/Switch';
import { FormFinish, Void } from '../../../types/global';
import { answerType } from '../../../helpers/constants';
import {
  IAddQuestionCard,
  IAnswer
} from '../../../types/api/application/applicationForm';

const { Option } = AsnSelect;

const AnswerTypeSelect = styled(AsnSelect)`
  width: 100% !important;
  .ant-select {
    .ant-select-in-form-item {
      :hover {
        border: 1px solid red !important;
      }
    }
  }

  .ant-select-selector {
    height: 44px !important;
    display: flex;
    align-items: center;
    border-radius: 6px !important;
  }
`;

const AnswerTypeSpace = styled(Space)`
  width: 100%;
  .ant-space-item:nth-child(1) {
    width: 42% !important;
    .ant-form-item {
      margin: 0px;
    }
  }
`;

const SwitchContainer = styled.span`
  font-size: var(--base-font-size);
  display: flex;
  flex-direction: row;
  align-items: center;
  .ant-form-item {
    margin: 0px;
    margin-left: 0.5rem;
  }
`;

const AddQuestionCard: React.FC<IAddQuestionCard> = ({
  setIsQuestionCardVisible,
  isQuestionCardVisible,
  cardId,
  answerTypeValue,
  setAnswerTypeValue,
  singleQuestionData,
  setSingleQuestionData
}) => {
  const form = AsnForm.useFormInstance();

  const onAnswerTypeChange: FormFinish = (value) => {
    setAnswerTypeValue(value);
    form.resetFields(['question', 'names', 'requiredFiled', 'otherOption']);
  };

  useEffect(() => {
    if (singleQuestionData !== undefined) {
      form.setFieldsValue({
        requiredFiled:
          Object.keys(singleQuestionData).length > 0
            ? singleQuestionData?.required
            : true,
        otherOption:
          Object.keys(singleQuestionData).length > 0
            ? singleQuestionData?.otherOption
            : false,
        question:
          Object.keys(singleQuestionData).length > 0
            ? singleQuestionData?.title
            : '',
        answerTypeName:
          Object.keys(singleQuestionData).length > 0
            ? singleQuestionData?.answerType
            : answerTypeValue,
        names:
          Object.keys(singleQuestionData).length > 0
            ? singleQuestionData?.answers?.map(
              (answer: IAnswer) => answer.title
            )
            : ['', '']
      });
    }
  }, [singleQuestionData]);

  const onCancelAddQuestion: Void = () => {
    setIsQuestionCardVisible(
      isQuestionCardVisible.filter((itemId) => itemId !== cardId)
    );
    form.resetFields();
    setAnswerTypeValue('OPTION');
    setSingleQuestionData(undefined);
  };

  return (
      <CardContainer
        borderTop={'3px solid var(--secondary-green)'}
        marginTop={'1rem'}
      >
        <AsnForm.Item
          name="question"
          rules={[
            {
              required: true,
              min: 1,
              max: 1024,
              message:
                'Field must have at least 1 character and maximum 1024 characters.'
            }
          ]}
        >
          <AsnInput
            style={{
              border: 'none',
              borderBottom: '1px dashed var(--dark-border-ultramarine)',
              borderRadius: '0px'
            }}
            placeholder="Type your question here"
          />
        </AsnForm.Item>
        <Typography.Title
          level={5}
          style={{ fontWeight: 'var(--font-normal)', margin: '1rem 0px' }}
        >
          Select your answer type
        </Typography.Title>
        <AnswerTypeSpace direction="horizontal" size={32} align="center">
          <AsnForm.Item name="answerTypeName">
            <AnswerTypeSelect
              defaultValue={answerTypeValue}
              value={
                singleQuestionData?.answerType !== undefined
                  ? singleQuestionData?.answerType
                  : answerTypeValue
              }
              onChange={onAnswerTypeChange}
              getPopupContainer={(trigger) => trigger.parentNode}
            >
              {answerType.map((option: string) => (
                <Option
                  key={option}
                  value={
                    option === 'Select one'
                      ? 'OPTION'
                      : option === 'Short text'
                        ? 'SHORT_TEXT'
                        : option === 'Yes/No'
                          ? 'YES_NO'
                          : 'CHECKBOX'
                  }
                >
                  {option}
                </Option>
              ))}
            </AnswerTypeSelect>
          </AsnForm.Item>
          <SwitchContainer>
            <span>Required</span>
            <AsnForm.Item name="requiredFiled" valuePropName="checked">
              <AsnSwitch
                defaultChecked={true}
                disabled={
                  answerTypeValue === 'OPTION' || answerTypeValue === 'YES_NO'
                }
              />
            </AsnForm.Item>
          </SwitchContainer>
          {answerTypeValue === 'CHECKBOX' || answerTypeValue === 'OPTION'
            ? (
            <SwitchContainer>
              <span>{'"Other" option'}</span>
              <AsnForm.Item name="otherOption" valuePropName="checked">
                <AsnSwitch />
              </AsnForm.Item>
            </SwitchContainer>
              )
            : null}
        </AnswerTypeSpace>
        {answerTypeValue === 'CHECKBOX' || answerTypeValue === 'OPTION'
          ? (
          <DynamicQuestionForm
            singleQuestionData={singleQuestionData?.answers}
          />
            )
          : null}
        <Space
          direction="horizontal"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '3.75rem 2rem 0rem 0rem'
          }}
          size={60}
        >
          <AsnButton className="default" onClick={onCancelAddQuestion}>
            Cancel
          </AsnButton>
          {singleQuestionData !== undefined &&
          Object.keys(singleQuestionData).length > 0
            ? (
            <AsnButton className="primary" htmlType="submit">
              Update
            </AsnButton>
              )
            : (
            <AsnButton className="primary" htmlType="submit">
              Add
            </AsnButton>
              )}
        </Space>
      </CardContainer>
  );
};

export default AddQuestionCard;
