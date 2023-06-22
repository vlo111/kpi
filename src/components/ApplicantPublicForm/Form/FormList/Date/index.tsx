import React from 'react';

import { AsnForm } from '../../../../Forms/Form';
import { AsnDatePicker } from '../../../../Forms/DatePicker';

import { IFormItemProps } from '../../../../../types/application';
import moment from 'moment';

const SectionDate: React.FC<IFormItemProps> = ({ index, title, placeholder, rules }) => {
  return (
    <AsnForm.Item
      key={index}
      name={[index, 'answers', 0, 'text']}
      label={title}
      labelCol={ { span: 24 }}
      rules={rules}
    >
      <AsnDatePicker
        format="DD/MM/YYYY"
        defaultPickerValue={moment('01/01/2008')}
        placeholder={placeholder}
        style={{ height: '44px', width: '100%' }}
      />
    </AsnForm.Item>
  );
};

export default SectionDate;
