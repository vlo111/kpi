import React from 'react';
import styled from 'styled-components';
import { Col, Space } from 'antd';

import { IAsnPicker } from '../../types/global';
import { DisabledDate } from '../../types/project';
import { AsnForm } from '../Forms/Form';
import { AsnDatePicker } from '../Forms/DatePicker';

export const PickerSpace = styled(Space)`
  width: 100%;

  > div {
    font-size: var(--headline-font-size);
  }

  .ant-picker,
  .ant-space-item {
    width: 100%;
  }

  .ant-picker-input > input {
    height: 30px;
    font-size: var(--base-font-size);
  }
`;

const AsnPicker: React.FC<IAsnPicker> = ({ startDate, endDate }) => {
  const form = AsnForm.useFormInstance();

  const disabledDate: DisabledDate = (current, item) => {
    const { startDate, endDate } = form.getFieldsValue();

    if (item === 'start') {
      return current > (endDate ?? current);
    } else {
      const tomorrow = startDate?.clone()?.add(1, 'days') ?? current;

      return current < tomorrow;
    }
  };

  return (
    <PickerSpace size={24}>
      <Col span={24}>
        <AsnForm.Item
          name={startDate ?? 'startDate'}
          label="Start Date"
          rules={[
            {
              required: true
            }
          ]}
        >
          <AsnDatePicker
            format="DD/MM/YYYY"
            placeholder="01/01/23"
            disabledDate={(current) => disabledDate(current, 'start')}
            getPopupContainer={(trigger: HTMLElement) =>
              trigger.parentElement as HTMLElement
            }
          />
        </AsnForm.Item>
      </Col>
      <Col span={24}>
        <AsnForm.Item
          name={endDate ?? 'endDate'}
          label="End Date"
          rules={[
            {
              required: true
            }
          ]}
        >
          <AsnDatePicker
            placeholder="01/01/23"
            disabledDate={(current) => disabledDate(current, 'end')}
            format="DD/MM/YYYY"
            getPopupContainer={(trigger: HTMLElement) =>
              trigger.parentElement as HTMLElement
            }
          />
        </AsnForm.Item>
      </Col>
    </PickerSpace>
  );
};

export default AsnPicker;
