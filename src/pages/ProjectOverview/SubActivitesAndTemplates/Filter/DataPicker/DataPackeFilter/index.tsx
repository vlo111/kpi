import React from 'react';
import styled from 'styled-components';
import { Col, Space, Radio } from 'antd';

import { TVoid } from '../../../../../../types/global';
import { IDateFilterCards } from '../../../../../../types/project';
import { AsnForm } from '../../../../../../components/Forms/Form';
import { AsnDatePicker } from '../../../../../../components/Forms/DatePicker';
import moment from 'moment';
import { AsnButton } from '../../../../../../components/Forms/Button';

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

export const DateFilter: React.FC<IDateFilterCards> = ({ setDateSearch, dateSearch }) => {
  const [form] = AsnForm.useForm();
  const onFinish: TVoid = (values) => {
    const { from, to, radio } = values;
    setDateSearch({
      start: radio,
      from: moment(from).format(),
      to: moment(to).format()
    });
  };
  return (
    <>
      <AsnForm
        onFinish={onFinish}
        form={form}
      >
        <AsnForm.Item name="radio" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={true}>Start Date Interval</Radio>
            <Radio value={false}>End Date Interval</Radio>
          </Radio.Group>
        </AsnForm.Item>
        <PickerSpace size={18}>
          <Col span={22}>
            <AsnForm.Item
              name="from"
              label="from"
              rules={[{ required: true }]}
            >
              <AsnDatePicker
                format="DD/MM/YYYY"
                placeholder="01/01/23"
              />
            </AsnForm.Item>
          </Col>
          <Col span={22}>
            <AsnForm.Item
              name="to"
              label="to"
              rules={[{ required: true }]}
            >
              <AsnDatePicker
                placeholder="01/01/23"
                format="DD/MM/YYYY"
              />
            </AsnForm.Item>
          </Col>
        </PickerSpace>
        <AsnButton htmlType="submit" className='primary' style={{ width: '30%' }}>Save</AsnButton>
      </AsnForm>
    </>
  );
};
