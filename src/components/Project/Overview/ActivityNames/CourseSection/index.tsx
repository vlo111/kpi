import React from 'react'
import styled from 'styled-components'
import { AsnButton } from '../../../../Forms/Button'
import { Form } from '../../../../Forms/Form'
import LearningStatus from './LearningStatus'
import { Space } from 'antd'

const CourseSectionContainer = styled.div`
  .ant-col-sm-20 {
    max-width: 100% !important;
  }
`
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
}
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 0 }
  }
}

const CourseSection: React.FC = () => {
  const [form] = Form.useForm()
  const onFinish = (values: any): void => {
    console.log(values)
  }

  const initFields = [
    {
      name: ['documentName'],
      value: ''
    },
    {
      name: ['documentCount'],
      value: 0
    },
    {
      name: ['statuses'],
      value: 0
    }
  ]
  return (
    <CourseSectionContainer>
      <Space
        size={32}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          margin: '2rem 0px 2rem 6% ',
          width: '88%',
          fontSize: 'var(--headline-font-size)'
        }}
      >
        <span>Sections:</span>
        <span>
          Input course sections name and choose their learning statuses
        </span>
      </Space>
      <Form
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        form={form}
        fields={initFields}
      >
        <Form.List initialValue={['']} name="names">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  required={false}
                  key={field.key}
                >
                  <Form.Item {...field}>
                    <LearningStatus fields={fields} field={field} remove={remove}/>
                  </Form.Item>
                </Form.Item>
              ))}
              <Form.Item>
                <AsnButton
                  type="primary"
                  onClick={() => add()}
                  style={{ width: '88%', marginLeft: '6%' }}
                >
                  Add field
                </AsnButton>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Space
            size={32}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              margin: '2rem 0px 2rem 6% ',
              width: '88%'
            }}
          >
            <AsnButton>Cancel</AsnButton>
            <AsnButton>Save as Draft</AsnButton>
            <AsnButton type="primary" htmlType="submit">
              Publish
            </AsnButton>
          </Space>
        </Form.Item>
      </Form>
    </CourseSectionContainer>
  )
}

export default CourseSection
