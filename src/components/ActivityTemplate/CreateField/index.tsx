import React from 'react';
import styled from 'styled-components';
import { Form, Select } from 'antd';
import { ReactComponent as CloseIcon } from '../../../assets/icons/closeIcon.svg';
import DynamicForm from '../DynamicForm/Index';
import { AsnInput } from '../../Forms/Input';
import { AsnSelect } from '../../Forms/Select';
import { AsnButton } from '../../Forms/Button';
import { FormFinish, Void } from '../../../types/global';
import { ICreateFieldsProps } from '../../../types/project';
import { answerTypeOptions } from '../../../helpers/constants';

const { Option } = Select;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;
const CreateField = styled.div`
  width: 100%;
  background-color: var(--dark-7);
  padding: 1rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  margin-top: 0.5rem;
`;
const TopField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .closeIcon {
    display: flex;
    justify-content: flex-end;
  }

  .ant-input {
    border: none;
  }

  .ant-select {
    width: 100%;
    .ant-select-selector {
      height: 44px;
      border: none;
      border-radius: 6px;
      font-size: var(--base-font-size);
      display: flex;
      align-items: center;
    }

    .ant-select-selection-item {
      font-size: var(--base-font-size);
      color: var(--dark-2);
    }
  }
  .ant-select-item {
    border-top: 0px !important;
  }
`;

const CreateFields: React.FC<ICreateFieldsProps> = ({
  setIsVisibleAddField,
  questionType,
  form,
  setQuestionType,
  templateId
}) => {
  const onClosedAddVisibleField: Void = () => {
    setIsVisibleAddField(false);
    form.resetFields();
  };

  const onSelectChange: FormFinish = (value) => {
    switch (value) {
      case 'Short Text':
        setQuestionType('SHORT_TEXT');
        break;
      case 'Number':
        setQuestionType('NUMBER');
        break;
      case 'Attachment':
        setQuestionType('ATTACHMENT');
        break;
      default:
        setQuestionType('DROPDOWN');
        break;
    }
  };

  return (
    <CreateField>
      <TopField>
        <div className="closeIcon">
          <IconButton onClick={onClosedAddVisibleField}>
            <CloseIcon />
          </IconButton>
        </div>
        <Form.Item
          name="question"
          rules={[{ required: true, message: 'Please enter a valid Question' }, { min: 1 }, { max: 256 }]}
        >
          <AsnInput placeholder="Add question" />
        </Form.Item>
        <Form.Item name="answerType" rules={[{ required: true, message: 'Please enter a valid Answer Type' }]}>
          <AsnSelect onChange={onSelectChange} placeholder="Choose answer type">
            {answerTypeOptions.map((option) => (
              <Option
                key={option}
                value={option}
                className="customSelectOption"
              >
                {option}
              </Option>
            ))}
          </AsnSelect>
        </Form.Item>
      </TopField>
      {questionType === 'DROPDOWN' ? <DynamicForm /> : null}
      <Form.Item>
        <AsnButton
          className="primary"
          htmlType="submit"
          style={{ width: '100%' }}
        >
          Add
        </AsnButton>
        {/* <AsnButton
          className="primary"
          htmlType="submit"
          style={{ width: '100%' }}
        >
          Update
        </AsnButton> */}
      </Form.Item>
    </CreateField>
  );
};

export default CreateFields;
