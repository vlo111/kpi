import { Col, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { Form } from '../../../../../Forms/Form'
import { rules } from '../../../../../../utils/ProjectUtils'
import AsnInput, { TextArea } from '../../../../../Forms/Input'
import { AsnSelect } from '../../../../../Forms/Select'
import { FormInstance } from 'antd/lib/form/hooks/useForm'

const firstLabel: (text: string, i: number) => string = (text, i) =>
  i === 0 ? text : ''

const { Option } = Select

const Box: React.FC<{ id: string, index: number, placeHolders: string[], form: FormInstance }> = ({ id, index, placeHolders, form }) => {
  const option = form.getFieldsValue()[`m${id}`]

  const [maxValue, setMaxValue] = useState<number>()

  useEffect(() => {
    if (option === 'Number') {
      setMaxValue(999999999999999)
    } else {
      setMaxValue(100)
    }
  }, [option])

  return (
      <>
            <Col>
                <Form.Item
                    name={`c${id}`}
                    label={firstLabel('Code', index)}
                    rules={[{ min: 1, max: 12 }]}
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
                    <AsnSelect style={{ width: '148px', height: '58px' }} onChange={(val) => {
                      if (val === 'number') {
                        setMaxValue(999999999999999)
                      } else {
                        setMaxValue(100)
                      }
                      form.resetFields([`t${id}`])
                    }}>
                        <Option value="number">Number</Option>
                        <Option value="attachment">Attachment</Option>
                        <Option value="percentage">Percentage</Option>
                    </AsnSelect>
                </Form.Item>
            </Col>
            <Col>
                <Form.Item
                    name={`t${id}`}
                    label={firstLabel('Target', index)}
                    rules={[{ required: true, min: 1, max: option === 'Number' ? maxValue : 3 }]}
                >
                    <AsnInput type="number" min={1} max={maxValue} placeholder={placeHolders[2]}/>
                </Form.Item>
            </Col>
        </>
  )
}

export default Box
