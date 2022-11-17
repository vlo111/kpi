import React from 'react'
import { AsnCollapse } from '../../../../AsnCollapse'
import { Panel } from '../../../../Forms/AsnCollapse'
import { Col, Row } from 'antd'
import AsnInput from '../../../../Forms/Input'
import { AsnButton } from '../../../../Forms/Button'
import { ReactComponent as DeleteSvg } from '../../../../../assets/icons/delete.svg'
import { Form } from '../../../../Forms/Form'
import { rules } from '../../../../../utils/ProjectUtils'
import styled from 'styled-components'

const FormList = styled(Form.List)`
  button {
    height: 44px !important;
    box-shadow: 0 4px 4px rgba(42, 85, 120, 0.05);
    border-radius: 6px;
  }
`

export const Items: React.FC<{
  name: string
}> = ({ name }) => {
  return (
      <FormList name={name}>
        {(fields: any[], { add, remove }: any, { errors }: any) => (
            <>
                <AsnCollapse key={name} id={name}>
                    <Panel key={name} className="input-rows" header={name}>
                        {fields.map((field, index) => (
                            <Row key={index}>
                                <Form.Item
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        {...rules(2, 256)}
                                        noStyle
                                    >
                                        <AsnInput placeholder="passenger name" />
                                    </Form.Item>
                                    {fields.length > 1
                                      ? (
                                          <div className="delete-result">
                                              <DeleteSvg
                                                  className="dynamic-delete-button"
                                                  onClick={() => remove(field.name)}
                                              />
                                          </div>
                                        )
                                      : null}
                                </Form.Item>
                            </Row>
                        ))}
                        <Row>
                            <Col>
                                <Form.Item>
                                    <AsnButton
                                        onClick={() => add()}
                                    >
                                        +Add {name}
                                    </AsnButton>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Panel>
                </AsnCollapse>
            </>
        )}
      </FormList>
  )
}
