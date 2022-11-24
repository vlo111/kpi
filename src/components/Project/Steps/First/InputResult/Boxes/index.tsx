import React from 'react'
import { AsnButton } from '../../../../../Forms/Button'
import { Col, FormListFieldData, Row, Select } from 'antd'
import { Form } from '../../../../../Forms/Form'
import AsnInput, { TextArea } from '../../../../../Forms/Input'
import { rules } from '../../../../../../utils/ProjectUtils'
import { AsnSelect } from '../../../../../Forms/Select'
import { PlaceHolderActivityMilestone, PlaceHolderExpectedResult } from '../../../../../../helpers/constants'
import { ReactComponent as DeleteSvg } from '../../../../../../assets/icons/delete.svg'

const { Option } = Select

const firstLabel: (text: string, i: number) => string = (text, i) =>
  i === 0 ? text : ''

const Boxes: React.FC<{
  resultId: number
  activityId?: number
  type: string
  list: FormListFieldData[]
  add: (defaultValue?: any, insertIndex?: (number | undefined)) => void
  remove: (index: (number | number[])) => void
  onDelete: (remove: (index: (number | number[])) => void, field: number) => void
}> = ({ resultId, list, add, remove, onDelete, activityId, type }) => {
  return (
    <>
      {list.map((item, index: number) => (
        <Row key={`expected_${resultId}${activityId ?? ''}${item.key}`} gutter={16} justify="start" align="top" style={{ minWidth: '20vw' }}>
          <Col>
            <Form.Item
              name={[item.name, `c_${resultId}${activityId ?? ''}${item.key}`]}
              label={firstLabel('Code', index)}
              rules={[{ min: 1, max: 12 }]}
            >
              <AsnInput placeholder={type === 'expected' ? `OP${resultId + 1}.${index + 1}` : `XY${resultId + 1}.${activityId ?? ''}.${index + 1}`}/>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name={[item.name, `d_${resultId}${activityId ?? ''}${item.key}`]}
              label={firstLabel('Input expected result statement', index)}
              {...rules(2, 256)}
            >
              <TextArea placeholder={type === 'expected' ? PlaceHolderExpectedResult : PlaceHolderActivityMilestone} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name={[item.name, `m_${resultId}${activityId ?? ''}${item.key}`]}
              label={firstLabel('Measure', index)}
              {...rules(2, 256)}
            >
              <AsnSelect defaultValue="Number" style={{ width: '148px', height: '58px' }}>
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
            >
              <AsnInput type="number" min={1} max={3} placeholder={'100'} />
            </Form.Item>
          </Col>
          {list.length > 1 && (<div
            className="delete-result-box"
            onClick={() => {
              onDelete(remove, item.name)
            }}
          >
            <DeleteSvg/>
          </div>)}
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
