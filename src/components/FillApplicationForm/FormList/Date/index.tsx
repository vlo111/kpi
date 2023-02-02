import React from 'react';
import { AsnForm } from '../../../Forms/Form';
import { IFormItemProps } from '../../../../types/application';
import { AsnDatePicker } from '../../../Forms/DatePicker';

const SectionDate: React.FC<IFormItemProps> = ({ index, title, rules }) => {
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
        style={{ height: '44px', width: '100%' }}
      />
    </AsnForm.Item>
  );
};

export default SectionDate;
