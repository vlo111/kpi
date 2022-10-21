import React, { useRef, useState } from 'react'
import AsnInput, { TextArea } from '../../../Forms/Input'
import { Form } from '../../../Forms/Form'
import { PlaceHolderDescription } from '../../../../helpers/constants'
import { DatePickerProps } from 'antd'
import AnsDatePicker from '../../../Forms/DatePicker'
import styled from 'styled-components'
import { RangePickerProps } from 'antd/es/date-picker'
import moment from 'moment'

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

  const [startData, setStartData] = useState<any>({})
  const [endData, setEndDate] = useState<any>({})

  const onChange: any = (date: any, dateString: any, item: any) => {
    console.log(date, dateString)
    if (item === 'start') {
      setStartData(date)
    } else {
      setEndDate(date)
    }
  }

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    // if (item === 'start') {
    //   return current && current > endData
    // } else {
    //   return current && current < startData
    // }
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
            disabledDate={(current) => disabledDate(current)}
            onChange={(date, dateString) => onChange(date, dateString)}
          />
        </Form.Item>
        <Form.Item name="End Date" label="End Date" rules={[{
          required: true
        }]}>
          <AnsDatePicker disabledDate={(current) => disabledDate(current)}
                         onChange={(date, dateString) => onChange(date, dateString, 'end')}/>
        </Form.Item>
      </Picker>
    </>
  )
}

export default GeneralInfo
