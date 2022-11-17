import React from 'react'
import { AsnCollapse } from '../../../../AsnCollapse'
import { Panel } from '../../../../Forms/AsnCollapse'
import { Col, Row } from 'antd'
import AsnInput from '../../../../Forms/Input'
import { AsnButton } from '../../../../Forms/Button'
import { ReactComponent as DeleteSvg } from '../../../../../assets/icons/delete.svg'
import { Form } from '../../../../Forms/Form'
import {
  placeHolderInputDetails,
  rules
} from '../../../../../utils/ProjectUtils'
import styled from 'styled-components'
import { IProjectDetailsItems } from '../../../../../types/project'

const FormList = styled(Form.List)`
  button {
    height: 44px !important;
    box-shadow: 0 4px 4px rgba(42, 85, 120, 0.05);
    border-radius: 6px;
  }
`

export const Items: React.FC<IProjectDetailsItems> = ({ name, onDelete }) => {
  return (
    <FormList name={name}>
      {(fields: any[], { add, remove }: any, { errors }: any) => (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <AsnCollapse key={name} id={name}>
              <Panel key={name} className="input-rows" header={name}>
                {fields.map((field, index) => (
                  <Row key={index}>
                    <Col span={24}>
                      <Form.Item required={false} key={field.key}>
                        <Row>
                          <Col span={fields.length > 1 ? 23 : 24}>
                            <Form.Item
                              {...field}
                              validateTrigger={['onChange', 'onBlur']}
                              {...rules(2, 256)}
                            >
                              <AsnInput
                                placeholder={placeHolderInputDetails(name)}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={1}>
                            {fields.length > 1
                              ? (
                              <Row align={'middle'} className="delete-item">
                                <Col span={12}>
                                  <DeleteSvg
                                    className="dynamic-delete-button"
                                    onClick={() => {
                                      onDelete(remove, field.name)
                                    }}
                                  />
                                </Col>
                              </Row>
                                )
                              : null}
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
                <Row className="last-item-footer">
                  <Col span={24}>
                    <Form.Item>
                      <AsnButton onClick={() => add()}>+Add {name}</AsnButton>
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </AsnCollapse>
          </Col>
        </Row>
      )}
    </FormList>
  )
}
