/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { ConfigProvider, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const Page = () => {
  return (
    <div >
      <RangePicker style={{ width: 200 }}/>
    </div>
  );
};

export const DateFilter: React.FC = () => {
  return (
    <div>
      <ConfigProvider >
        <Page />
      </ConfigProvider>
    </div>
  );
};
