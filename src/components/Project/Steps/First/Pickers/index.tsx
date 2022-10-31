import React, { useState } from 'react'
import styled from 'styled-components'
import { Form } from '../../../../Forms/Form'
import AnsDatePicker from '../../../../Forms/DatePicker'
import { Moment } from 'moment'
import { DisabledDate, Date, OnChange } from '../../../../../types/project'
import { Name } from '../../../../../helpers/constants'

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

const rules = {
  rules: [
    {
      required: true
    }
  ]
}

export const Pickers: React.FC = () => {
  const [startData, setStartData] = useState<Date>(null)

  const [endData, setEndDate] = useState<Date>(null)

  const disabledDate: DisabledDate = (current: Moment, item) => {
    if (item === 'start') {
      return current && current > (endData ?? current)
    } else {
      return current && current < (startData ?? current)
    }
  }

  const onChange: OnChange = (date: Date, item: string) => {
    if (item === 'start') {
      setStartData(date)
    } else {
      setEndDate(date)
    }
  }

  return (
    <Picker>
      <Form.Item
        {...Name('Start Date')}
        {...rules}
      >
        <AnsDatePicker
          disabledDate={(current: Moment) => disabledDate(current, 'start')}
          onChange={(date: Date) => onChange(date, 'start')}
        />
      </Form.Item>
      <Form.Item
        {...Name('End Date')}
        {...rules}
      >
        <AnsDatePicker
          disabledDate={(current: Moment) => disabledDate(current, 'end')}
          onChange={(date: Date) => onChange(date, 'end')}
        />
      </Form.Item>
    </Picker>
  )
}
