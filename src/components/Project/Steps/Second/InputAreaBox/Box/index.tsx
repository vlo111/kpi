import { Col, Select } from 'antd'
import React from 'react'
import { Form } from '../../../../../Forms/Form'
import { rules } from '../../../../../../utils/ProjectUtils'
import AsnInput, { TextArea } from '../../../../../Forms/Input'
import { AnsSelect } from '../../../../../Forms/Select'

const firstLabel: (text: string, i: number) => string = (text, i) =>
  i === 0 ? text : ''

const { Option } = Select

const Box: React.FC<{ id: string, index: number, placeHolders: string[] }> = ({ id, index, placeHolders }) => {
  return (
      <>
            <Col>
                <Form.Item
                    name={`c${id}`}
                    label={firstLabel('Code', index)}
                    {...rules(2, 256)}
                >
                    <AsnInput placeholder={placeHolders[0]}/>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name={`r${id}`}
                    label={firstLabel('Input expected result statement', index)}
                    {...rules(2, 256)}
                >
                    <TextArea
                        placeholder={placeHolders[1]}/>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name={`m${id}`}
                    label={firstLabel('Measure', index)}
                    {...rules(2, 256)}
                >
                    <AnsSelect style={{ width: '148px', height: '58px' }}>
                        <Option value="number">Number</Option>
                        <Option value="attachment">Attachment</Option>
                        <Option value="percentage">Percentage</Option>
                    </AnsSelect>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name={`t${id}`}
                    label={firstLabel('Target', index)}
                    {...rules(2, 5)}
                >
                    <AsnInput placeholder={placeHolders[2]}/>
                </Form.Item>
            </Col>
        </>
  )
}

export default Box
