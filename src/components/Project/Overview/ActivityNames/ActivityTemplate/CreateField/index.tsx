import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { Select } from 'antd'
import { AsnSelect } from '../../../../../Forms/Select'
import { AsnButton } from '../../../../../Forms/Button'
import AsnInput from '../../../../../Forms/Input'
import { Form } from '../../../../../Forms/Form'
import { ReactComponent as CloseIcon } from '../../../../../../assets/icons/closeIcon.svg'
import { ICreateFieldsProps } from '../../../../../../types/project'
import { answerTypeOptions } from '../../../../../../helpers/constants'
import DynamicForm from '../DynamicForm/Index'

const { Option } = Select

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`
const CreateField = styled.div`
  width: 100%;
  background-color: var(--dark-7);
  padding: 1rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  margin-top: 0.5rem;
`
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
    }

    .ant-select-selection-item {
      top: 6px;
      font-size: var(--base-font-size);
      color: var(--dark-2);
    }
  }
  .ant-select-item {
    border-top: 0px !important;
  }
`

const CreateFields: React.FC<ICreateFieldsProps> = ({
  setIsVisibleAddField,
  questionType,
  setQuestionType,
  setQuestionValue
}) => {
  const onClosedAddVisibleField = (): void => {
    setIsVisibleAddField(false)
  }

  const onSelectChange = (value: any): void => {
    setQuestionType(value)
  }

  const onQuestionValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuestionValue(event.target.value)
  }

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
          rules={[{ required: true }, { min: 1 }, { max: 256 }]}
        >
          <AsnInput placeholder="Add question" onChange={onQuestionValue} />
        </Form.Item>
        <Form.Item name="answerType">
          <AsnSelect onChange={onSelectChange}>
            {answerTypeOptions.map((option) => (
              <Option
                value={option}
                key={option}
                className="customSelectOption"
              >
                {option}
              </Option>
            ))}
          </AsnSelect>
        </Form.Item>
      </TopField>
      {questionType === 'Dropdown options' ? <DynamicForm /> : null}
      <Form.Item>
        <AsnButton type="primary" htmlType="submit">
          Add
        </AsnButton>
      </Form.Item>
    </CreateField>
  )
}

export default CreateFields
