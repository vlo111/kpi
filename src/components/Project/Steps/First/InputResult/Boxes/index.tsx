import React, { useState } from 'react'
import { Col, Row, Select } from 'antd'

import { AsnButton } from '../../../../../Forms/Button'
import { Form } from '../../../../../Forms/Form'
import { AsnSelect } from '../../../../../Forms/Select'
import { rules } from '../../../../../../utils/ProjectUtils'
import AsnInput, { TextArea } from '../../../../../Forms/Input'
import {
  PlaceHolderActivityMilestone,
  PlaceHolderExpectedResult,
  TargetRule
} from '../../../../../../helpers/constants'
import { ProjectInputBoxProps } from '../../../../../../types/project'
import { ReactComponent as DeleteSvg } from '../../../../../../assets/icons/delete.svg'

const { Option } = Select

const firstLabel: (text: string, i: number) => string = (text, i) =>
  i === 0 ? text : ''

const Boxes: React.FC<ProjectInputBoxProps> = ({
  resultId,
  list,
  add,
  remove,
  onDelete,
  activityId,
  type
}) => {
  const [max, setMax] = useState<number>(100)

  return (
    <>
      {list.map((item, index: number) => (
        <Row
          key={`expected_${resultId}${activityId ?? ''}${item.key}`}
          gutter={16}
          justify="start"
          align="top"
          style={{ minWidth: '20vw' }}
        >
          <Col>
            <Form.Item
              name={[item.name, `c_${resultId}${activityId ?? ''}${item.key}`]}
              label={firstLabel('Code', index)}
              rules={[{ min: 1, max: 12 }]}
            >
              <AsnInput
                placeholder={
                  type === 'expected'
                    ? `OP${resultId + 1}.${index + 1}`
                    : `XY${resultId + 1}.${activityId ?? ''}.${index + 1}`
                }
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name={[item.name, `d_${resultId}${activityId ?? ''}${item.key}`]}
              label={firstLabel('Input expected result statement', index)}
              {...rules(2, 256)}
            >
              <TextArea
                placeholder={
                  type === 'expected'
                    ? PlaceHolderExpectedResult
                    : PlaceHolderActivityMilestone
                }
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name={[item.name, `m_${resultId}${activityId ?? ''}${item.key}`]}
              label={firstLabel('Measure', index)}
              {...rules(2, 256)}
            >
              <AsnSelect
                defaultValue="Select"
                style={{ width: '148px', height: '58px' }}
                onChange={(value) => {
                  if (value === 'number') {
                    setMax(99999999999)
                  } else {
                    setMax(100)
                  }
                }}
              >
                <Option value="number">Number</Option>
                <Option value="attachment">Attachment</Option>
                <Option value="percentage">Percentage</Option>
              </AsnSelect>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name={[item.name, `t_${resultId}${activityId ?? ''}${item.key}`]}
              label={firstLabel('Target', index)}
              rules={TargetRule(max)}
            >
              <AsnInput placeholder={'100'} />
            </Form.Item>
          </Col>
          {list.length > 1 && (
            <div
              className="delete-result-box"
              onClick={() => {
                onDelete(remove, item.name)
              }}
            >
              <DeleteSvg />
            </div>
          )}
        </Row>
      ))}
      <Row style={{ width: 'calc(100% - 10px)' }}>
        <AsnButton
          style={{ background: 'white', width: '100%', height: '44px' }}
          value="Create"
          onClick={() => add()}
        >
          +Add {type === 'expected' ? 'expected result' : 'Milestone'}
        </AsnButton>
      </Row>
    </>
  )
}

export default Boxes
