import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Col, Space, Radio } from 'antd';

import { TVoid } from '../../../../../../types/global';
import { IDateFilterCards } from '../../../../../../types/project';
import { AsnForm } from '../../../../../../components/Forms/Form';
import { AsnDatePicker } from '../../../../../../components/Forms/DatePicker';
import moment, { Moment } from 'moment';
import { AsnButton } from '../../../../../../components/Forms/Button';
import _ from 'lodash';

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

export const DateFilter: React.FC<IDateFilterCards> = ({
  setDateSearch,
  setOpen,
  dateSearch
}) => {
  const [form] = AsnForm.useForm();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const onFinish: TVoid = (values) => {
    const { from, to, radio } = values;
    setDateSearch({
      start: radio,
      from: moment(from).format(),
      to: moment(to).format()
    });
  };
  const onChange: (item: Moment | null) => void = (item) => {
    if (item !== null) {
      setStartTime(item.format());
    }
  };
  const onChangeEnd: (item: Moment | null) => void = (item) => {
    if (item !== null) {
      setEndTime(item.format());
    }
  };

  const disabledDateEndPicker: (current: Moment) => boolean = (current: Moment) => {
    const date = startTime === '' ? moment(dateSearch.from) : startTime;
    return current < moment(date);
  };

  const disabledDateStartPicker: (current: Moment) => boolean = (current: Moment) => {
    const date = endTime === '' ? moment(dateSearch.to) : endTime;
    return current > moment(date);
  };

  useEffect(() => {
    if (!_.isEmpty(dateSearch.from)) {
      form.setFieldValue('from', moment(dateSearch.from));
      form.setFieldValue('to', moment(dateSearch.to));
      form.setFieldValue('radio', dateSearch.start);
    }
  }, [dateSearch]);

  return (
    <>
      <AsnForm onFinish={onFinish} form={form}>
        <AsnForm.Item name="radio" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={true}>Start Date Interval</Radio>
            <Radio value={false}>End Date Interval</Radio>
          </Radio.Group>
        </AsnForm.Item>
        <PickerSpace size={18}>
          <Col span={22}>
            <AsnForm.Item name="from" label="from" rules={[{ required: true }]}>
              <AsnDatePicker
                format="DD/MM/YYYY"
                placeholder="01/01/23"
                onChange={onChange}
                disabledDate={disabledDateStartPicker}
              />
            </AsnForm.Item>
          </Col>
          <Col span={22}>
            <AsnForm.Item name='to' label="to" rules={[{ required: true }]}>
              <AsnDatePicker
                placeholder="01/01/23"
                format="DD/MM/YYYY"
                onChange={onChangeEnd}
                disabledDate={disabledDateEndPicker}
              />
            </AsnForm.Item>
          </Col>
        </PickerSpace>
        <Space
          direction="horizontal"
          align="center"
          style={{ justifyContent: 'space-around', width: '100%' }}
        >
          <AsnButton htmlType="submit" className="primary">
            Save
          </AsnButton>
          <AsnButton className="default" onClick={() => setOpen?.(false)}>
            Cancel
          </AsnButton>
        </Space>
      </AsnForm>
    </>
  );
};
