import React, { useRef, useState } from 'react'
import AsnInput, { TextArea } from '../../../Forms/Input'
import { Form } from '../../../Forms/Form'
import { PlaceHolderDescription } from '../../../../helpers/constants'
import AnsDatePicker from '../../../Forms/DatePicker'
import styled from 'styled-components'
import { Moment } from 'moment'
import { Date, DisabledDate, OnChange } from '../../../../types/project'

const Picker = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    width: 48%;
    font-size: 20px;
  }

  .ant-picker {
    width: 100%;
  }

  .ant-picker-input > input {
    height: 30px;
    font-size: var(--base-font-size);
  }
`

const GeneralInfo: React.FC = () => {
  const refTitle = useRef(null)
  const refDescription = useRef(null)

  const [startData, setStartData] = useState<Date>(null)
  const [endData, setEndDate] = useState<Date>(null)

  const onChange: OnChange = (date: Date, item: string) => {
    if (item === 'start') {
      setStartData(date)
    } else {
      setEndDate(date)
    }
  }

  const disabledDate: DisabledDate = (current: Moment, item) => {
    if (item === 'start') {
      return current && current > (endData ?? current)
    } else {
      return current && current < (startData ?? current)
    }
  }

  return (
        <>
            <Form.Item name="Title" label="Title" rules={[{
              required: true,
              min: 2,
              max: 256
            }]}>
                <AsnInput ref={refTitle} placeholder="Example: AWDA"/>
            </Form.Item>
            <Form.Item name="Description" label="Description" rules={[{
              required: true,
              min: 1,
              max: 2048
            }]}>
                <TextArea ref={refDescription} placeholder={PlaceHolderDescription}/>
            </Form.Item>
            <Picker>
                <Form.Item name="Start Date" label="Start Date" rules={[{
                  required: true
                }]}>
                    <AnsDatePicker
                        disabledDate={(current: Moment) => disabledDate(current, 'start')}
                        onChange={(date: Date) => onChange(date, 'start')}
                    />
                </Form.Item>
                <Form.Item name="End Date" label="End Date" rules={[{
                  required: true
                }]}>
                    <AnsDatePicker
                        disabledDate={(current: Moment) => disabledDate(current, 'end')}
                        onChange={(date: Date) => onChange(date, 'end')}
                    />
                </Form.Item>
            </Picker>
            <Form.Item name="managers" label="Project Manager">
                <span>Data</span>
            </Form.Item>
        </>
  )
}

export default GeneralInfo
