import React from 'react';
import styled from 'styled-components';
import { Col, Space } from 'antd';

import { AsnForm } from '../../../../../../components/Forms/Form';
import { AsnDatePicker } from '../../../../../../components/Forms/DatePicker';

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

export const DateFilter: React.FC = () => {
  return (
            <PickerSpace size={18}>
              <Col span={22}>
                <AsnForm.Item
                  name="startDate"
                  label="Start Date"
                >
                  <AsnDatePicker
                    format="DD/MM/YYYY"
                    placeholder="01/01/23"
                  />
                </AsnForm.Item>
              </Col>
              <Col span={22}>
                <AsnForm.Item
                  name="endDate"
                  label="End Date"
                >
                  <AsnDatePicker
                    placeholder="01/01/23"
                    format="DD/MM/YYYY"
                  />
                </AsnForm.Item>
              </Col>
            </PickerSpace>
  );
};
