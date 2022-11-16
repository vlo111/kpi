import React, { ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { Select } from 'antd'
import { AsnSelect } from '../../../../../Forms/Select'
import { AsnButton } from '../../../../../Forms/Button'
import AsnInput from '../../../../../Forms/Input'
import { Form } from '../../../../../Forms/Form'
import { ReactComponent as CloseIcon } from '../../../../../../assets/icons/closeIcon.svg'
import { ICreateFieldsProps } from '../../../../../../types/project'
import { v4 as uuidv4 } from 'uuid'
import { VALIDATE_MESSAGES } from '../../../../../../helpers/constants'
import DynamicForm from '../DynamicForm/Index'

const { Option } = Select

const options: string[] = [
  'Choose answer type',
  'Short Text',
  'Number',
  'Attachment',
  'Dropdown options'
]

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
  templateData,
  setTemplateData,
  questionType,
  setQuestionType
}) => {
  const [form] = Form.useForm()
  const [questionValue, setQuestionValue] = useState('')

  const onClosedAddVisibleField = (): void => {
    setIsVisibleAddField(false)
  }

  const onSelectChange = (value: any): void => {
    setQuestionType(value)
  }

  const onQuestionValue = (event: ChangeEvent<HTMLInputElement>): void => {
    setQuestionValue(event.target.value)
  }
  const onFinish = (values: any): void => {
    setTemplateData([
      ...templateData,
      {
        id: uuidv4(),
        title: values.question,
        subTitle: [values.answerType],
        option:
        values.answerType === 'Dropdown options'
          ? [...values.names]
          : [],
        switch: false,
        disabled: false,
        status: 1
      }
    ])
    setIsVisibleAddField(false)
    setQuestionType('Choose answer type')
    console.log(values, 'values')
  }

  const initFields = [
    {
      name: ['question'],
      value: questionValue === '' ? '' : questionValue
    },
    {
      name: ['answerType'],
      value: questionType === '' ? 'Choose answer type' : questionType
    },
    {
      name: ['names'],
      value: ['']
    }
  ]

  return (
    <CreateField>
      <Form
        fields={initFields}
        form={form}
        validateMessages={VALIDATE_MESSAGES}
        onFinish={onFinish}
      >
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
              {options.map((option) => (
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
          <AsnButton type="primary" htmlType="submit" >
            Add
          </AsnButton>
        </Form.Item>
      </Form>
    </CreateField>
  )
}

export default CreateFields
