import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Checkbox, Col, Radio, Row } from 'antd'
import { AsnButton } from '../../../../Forms/Button'
import CreateFields from './CreateField'
import { v4 as uuidv4 } from 'uuid'

import { courseTemplateData } from '../../../../../helpers/fakeData'
import { ITemplateData } from '../../../../../types/project'
import { Form } from '../../../../Forms/Form'
import { VALIDATE_MESSAGES } from '../../../../../helpers/constants'
import QuestionsRow from './QuestionsRow/indexs'

const ActivityTemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 0 auto;

  .ant-btn-primary {
    width: 100%;
    margin-top: 2rem;
  }

  .courseDescriptionInput {
    border: none;
    box-shadow: inset 0px 4px 4px rgba(42, 85, 120, 0.05);
    border-radius: 0px;

    :hover {
      border: none !important;
    }
  }

  .ant-form {
    width: 100%;
  }
`

const CourseTitle = styled.span`
  color: var(--dark-2);
  font-size: var(--headline-font-size);
  margin-bottom: 2rem;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 3.75rem;
  padding: 3.75rem 6.25rem 3.75rem 0px;
`

const FormsStructureContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3rem;

  .ant-row {
    .ant-checkbox-inner {
      width: 2rem;
      height: 2rem;
      border: 3px solid var(--dark-border-ultramarine);

      ::after {
        width: 10px;
        height: 18px;
        border: 3px solid var(--white);
        border-top: 0;
        border-left: 0;
        top: 12px;
      }
    }

    .ant-checkbox-checked {
      .ant-checkbox-inner {
        background-color: var(--dark-border-ultramarine);
      }
    }

    .ant-checkbox-wrapper {
      margin-left: 0px;
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }

    .ant-radio-checked .ant-radio-inner {
      border-color: var(--dark-border-ultramarine);
    }

    .ant-radio-wrapper {
      margin-bottom: 1rem;
    }

    .ant-radio-inner {
      width: 20px;
      height: 20px;

      ::after {
        transform: scale(0.7);
        background-color: var(--dark-border-ultramarine);
      }
    }
    .ant-radio-group {
      display: flex;
      flex-direction: column;
    }
  }
`

const ActivityTemplate: React.FC = () => {
  const [isVisibleAddField, setIsVisibleAddField] = useState<boolean>(false)
  const [templateData, setTemplateData] = useState<ITemplateData[] | []>([])
  const [questionType, setQuestionType] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    setTemplateData(courseTemplateData)
  }, [])

  const onOpenAddVisibleField = (): void => {
    setIsVisibleAddField(true)
  }

  const onFinish = (values: any): void => {
    setTemplateData([
      ...templateData,
      {
        id: uuidv4(),
        title: values.question,
        subTitle: [values.answerType],
        option:
          values.answerType === 'Dropdown options' ? [...values.names] : [],
        switch: false,
        disabled: false,
        status: 1
      }
    ])
    setIsVisibleAddField(false)
    setQuestionType('Choose answer type')
  }

  const initFields = [
    {
      name: ['question'],
      value: form.getFieldValue('question') === '' ? '' : form.getFieldValue('question')
    },
    {
      name: ['answerType'],
      value: questionType === '' ? 'Choose answer type' : questionType
    },
    {
      name: ['names'],
      value: ['']
    },
    {
      name: ['helpText'],
      value: ['']
    },
    {
      name: ['applicant'],
      value: form.getFieldsValue().applicant
        ? form.getFieldsValue().applicant
        : false
    },
    {
      name: ['assessment'],
      value: form.getFieldsValue().assessment
        ? form.getFieldsValue().assessment
        : false
    },
    {
      name: ['courseStructure'],
      value: ''
    }
  ]

  return (
    <>
      <ActivityTemplateContainer>
        <CourseTitle>Course activity template</CourseTitle>
        <Form
          fields={initFields}
          form={form}
          validateMessages={VALIDATE_MESSAGES}
          onFinish={onFinish}
        >
          {templateData?.map((item) => (
            <QuestionsRow
              key={item.id}
              item={item}
              setTemplateData={setTemplateData}
              templateData={templateData}
              setQuestionType={setQuestionType}
              setIsVisibleAddField={setIsVisibleAddField}
            />
          ))}
          {!isVisibleAddField
            ? (
            <AsnButton type="primary" onClick={onOpenAddVisibleField}>
              +Add Field
            </AsnButton>
              )
            : (
            <CreateFields
              setIsVisibleAddField={setIsVisibleAddField}
              questionType={questionType}
              setQuestionType={setQuestionType}
            />
              )}
          <FormsStructureContainer>
            <Row gutter={[0, 0]}>
              <Col
                span={24}
                style={{
                  fontSize: 'clamp(0.5rem, 2.5vw, 1.25rem)',
                  color: 'var(--dark-2)',
                  marginBottom: '2rem'
                }}
              >
                Include Forms
              </Col>
              <Col span={24}>
                <Form.Item name="applicant" valuePropName="checked">
                  <Checkbox
                    style={{
                      fontSize: ' clamp(0.5rem, 2.5vw, 1.25rem)',
                      color: 'var(--dark-2)'
                    }}
                  >
                    Application Form
                  </Checkbox>
                </Form.Item>
                <Form.Item name="assessment" valuePropName="checked">
                  <Checkbox
                    style={{
                      fontSize: ' clamp(0.5rem, 2.5vw, 1.25rem)',
                      color: 'var(--dark-2)'
                    }}
                  >
                    Assessment Form
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[0, 0]}>
              <Col
                span={24}
                style={{
                  fontSize: 'clamp(0.5rem, 2.5vw, 1.25rem)',
                  color: 'var(--dark-2)',
                  marginBottom: '2rem'
                }}
              >
                Course Structure
              </Col>
              <Col span={24}>
                <Form.Item name="courseStructure">
                  <Radio.Group>
                    <Radio
                      value={'One Section'}
                      style={{
                        fontSize: ' clamp(0.5rem, 2.5vw, 1.25rem)',
                        color: 'var(--dark-2)'
                      }}
                    >
                      One Section
                    </Radio>
                    <Radio
                      value={'Multi-Section'}
                      style={{
                        fontSize: ' clamp(0.5rem, 2.5vw, 1.25rem)',
                        color: 'var(--dark-2)'
                      }}
                    >
                      Multi-Section
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </FormsStructureContainer>
        </Form>
      </ActivityTemplateContainer>
      <ButtonsContainer>
        <AsnButton>Cancel</AsnButton>
        <AsnButton type="primary">Next</AsnButton>
      </ButtonsContainer>
    </>
  )
}

export default ActivityTemplate
