import React, { useState } from 'react'
import styled from 'styled-components'
import { Select } from 'antd'
import { AsnSelect } from '../../../../../Forms/Select'
import { AsnButton } from '../../../../../Forms/Button'
import AsnInput from '../../../../../Forms/Input'
import { Form } from '../../../../../Forms/Form'
import { ReactComponent as CloseIcon } from '../../../../../../assets/icons/closeIcon.svg'
import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete.svg'
import { ICreateFieldsProps } from '../../../../../../types/project'

import { courseTemplateData } from '../../../../../../helpers/fakeData'
import { v4 as uuidv4 } from 'uuid'

const { Option } = Select

const options: string[] = [
  'Choose answer type',
  'Short Text',
  'Number',
  'Attachment',
  'Dropdown options'
]

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 }
  }
}

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

  .topField {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .closeIcon {
      display: flex;
      justify-content: flex-end;
    }

    .ant-input {
      width: 100%;
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
  }

  .bottomField{
    width: 100%;
    background-color: var(--white);
    border-radius: 20px;
    gap: 1rem;
    margin-top: 0.5rem;
    padding: 1rem 1rem 1rem 2rem;
    
    .formContainer{
      max-height: 13rem;
      overflow: auto;

    }

    .ant-form-item-control-input-content{
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 11px;
      margin-right: 10px;
    }

    .ant-input {
      width: 98% !important;
      border: 1px solid var(--light-border-gray)
    }
    .ant-btn{
      width: 98% !important;
      border: 1px solid var(--light-border-gray);
      margin-top: 1rem;
    }

    .ant-col-sm-20{
      max-width: 100% !important;
      margin-left: 0px !important;
    }
  }
`

const CreateFields: React.FC<ICreateFieldsProps> = ({ setIsVisibleAddField }) => {
  const [questionType, setQuestionType] = useState('')
  const onClosedAddVisibleField = (): void => {
    setIsVisibleAddField(false)
  }

  const onFinish = (values: any): void => {
    console.log('Received values of form:', values)
  }

  const onSelectChange = (value: any): void => {
    setQuestionType(value)
  }

  const onAddQuestion = (): void => {
    courseTemplateData.push({
      id: uuidv4(),
      title: 'Partner organization',
      subTitle: '',
      status: false,
      disabled: false
    })
  }

  return (
    <CreateField>
      <div className="topField">
        <div className="closeIcon">
          <IconButton onClick={onClosedAddVisibleField}>
            <CloseIcon />
          </IconButton>
        </div>
        <AsnInput placeholder="Add question" />
        <AsnSelect defaultValue="Choose answer type" onChange={onSelectChange}>
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
      </div>
      {questionType === 'Dropdown options'
        ? <div className="bottomField">
          <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
            <Form.List
              name="names"
              initialValue={[{
                fieldKey: 0,
                isListField: true,
                key: 0,
                name: 0
              }]}
            >
              {(fields, { add, remove }, { errors }) => {
                console.log(fields)
                return (
                  <div>
                    <div className="formContainer">
                      {fields.map((field, index) => (
                        <Form.Item
                          required={false}
                          key={field.key}
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: "Please input passenger's name or delete this field."
                              }
                            ]}
                            noStyle
                          >
                            <AsnInput placeholder="Example" />
                          </Form.Item>
                          {fields.length > 1
                            ? (
                              <DeleteIcon
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                              />
                              )
                            : null}
                        </Form.Item>
                      ))}
                    </div>

                    <Form.Item>
                      <AsnButton
                        onClick={() => add()}
                      >
                        +Add options
                      </AsnButton>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </div>
                )
              }}
            </Form.List>
          </Form>
        </div>
        : null}

      <AsnButton type="primary" htmlType="submit" onClick={onAddQuestion}>Add</AsnButton>
    </CreateField>
  )
}

export default CreateFields
