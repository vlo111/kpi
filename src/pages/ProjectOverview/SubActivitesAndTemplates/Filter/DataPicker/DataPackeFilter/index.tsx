import React from 'react';
import styled from 'styled-components';
import { Col, Space, Radio, RadioChangeEvent } from 'antd';

import { TVoid } from '../../../../../../types/global';
import { IDateFilterCards } from '../../../../../../types/project';
import { AsnForm } from '../../../../../../components/Forms/Form';
import { AsnDatePicker } from '../../../../../../components/Forms/DatePicker';
import moment from 'moment';

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
  // const [form] = AsnForm.useForm();
  // const startDate = AsnForm.useWatch('startDate', form);
  // const endDate = AsnForm.useWatch('endDate', form);
  // // console.log(moment(startDate).format(), moment(endDate).format());
  // useEffect(() => {
  //   console.log('aaaaaa');
  // }, [startDate, endDate]);

  const onChange: TVoid = (e: RadioChangeEvent) => {
    setDateSearch({
      ...dateSearch,
      start: e.target.value
    });
  };
  return (
    <>
      <Radio.Group onChange={onChange} value={dateSearch?.start}>
        <Radio value={true}>Start Date Interval</Radio>
        <Radio value={false}>End Date Interval</Radio>
      </Radio.Group>
      <PickerSpace size={18}>
        <Col span={22}>
          <AsnForm.Item
            name="startDate"
            label="from"
          >
            <AsnDatePicker
              format="DD/MM/YYYY"
              placeholder="01/01/23"
              onChange={(val) => setDateSearch({
                ...dateSearch,
                from: moment(val).format()
              })}
            />
          </AsnForm.Item>
        </Col>
        <Col span={22}>
          <AsnForm.Item
            name="endDate"
            label="to"
          >
            <AsnDatePicker
              placeholder="01/01/23"
              format="DD/MM/YYYY"
              onChange={(val) => setDateSearch({
                ...dateSearch,
                to: moment(val).format()
              })}
            />
          </AsnForm.Item>
        </Col>
      </PickerSpace>
    </>
  );
};
