import React from 'react'
import styled from 'styled-components'
import { Form } from '../../../../Forms/Form'
import { AsnDatePicker } from '../../../../Forms/DatePicker'
import { Moment } from 'moment'
import { DisabledDate } from '../../../../../types/project'
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

export const Pickers: React.FC<{ form: any }> = ({ form }) => {
  const disabledDate: DisabledDate = (current: Moment, item) => {
    const startDate = form.getFieldsValue()['Start Date']
    const endDate = form.getFieldsValue()['End Date']

    if (item === 'start') {
      return current && current > (endDate ?? current)
    } else {
      return current && current < (startDate ?? current)
    }
  }

  return (
        <Picker>
            <Form.Item
                {...Name('Start Date')}
                {...rules}
            >
                <AsnDatePicker
                    disabledDate={(current: Moment) => disabledDate(current, 'start')}
                />
            </Form.Item>
            <Form.Item
                {...Name('End Date')}
                {...rules}
            >
                <AsnDatePicker
                    disabledDate={(current: Moment) => disabledDate(current, 'end')}
                />
            </Form.Item>
        </Picker>
  )
}
