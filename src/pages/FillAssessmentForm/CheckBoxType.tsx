import React from 'react';
import { Space } from 'antd';

import { AsnCheckbox } from '../../components/Forms/Checkbox';
import { AsnForm } from '../../components/Forms/Form';

const CheckBoxType: React.FC = () => {
  return (
        <AsnForm.Item name='checkbox' rules={[{ required: true }]} initialValue=''>
            <AsnCheckbox.Group>
                <Space direction="vertical">
                    <AsnCheckbox value={1}>A</AsnCheckbox>
                </Space>
            </AsnCheckbox.Group>
        </AsnForm.Item>
  );
};

export default CheckBoxType;
