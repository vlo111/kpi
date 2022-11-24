import React from 'react'
import styled from 'styled-components'
import { AsnButton } from '../../../../Forms/Button'
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/delete.svg'
// import { Row, Col } from 'antd'
import { Form } from '../../../../Forms/Form'
import LearningStatus from './LearningStatus'

const CourseSectionContainer = styled.div`

    .ant-col-sm-20{
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
  const onFinish = (values: any): void => {
    console.log(values)
  }
  return (
    <CourseSectionContainer>
      <Form
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
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
                  <Form.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message:
                          "Please input passenger's name or delete this field."
                      }
                    ]}
                    noStyle
                  >
                    <LearningStatus/>
                  </Form.Item>
                  {fields.length > 1
                    ? (
                    <DeleteIcon className="dynamic-delete-button" onClick={() => remove(field.name)}/>
                      )
                    : null}
                </Form.Item>
              ))}
              <Form.Item>
                <AsnButton
                  type="primary"
                  onClick={() => add()}
                  style={{ width: '88%' }}
                >
                  Add field
                </AsnButton>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <AsnButton type="primary" htmlType="submit">
            Submit
          </AsnButton>
        </Form.Item>
      </Form>
    </CourseSectionContainer>
  )
}

export default CourseSection
