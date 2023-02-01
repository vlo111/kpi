import React from 'react';
import { AsnInput } from '../../../Forms/Input';
import { AsnForm } from '../../../Forms/Form';
import { ISection } from '../../../../types/application';

const SectionText: React.FC<ISection> = ({ index, title, rules, placeholder }) => {
  return (
    <AsnForm.Item
      key={index}
      name={[index, 'answers', 0, 'text']}
      label={title}
      labelCol={ { span: 24 }}
      rules={rules}
    >
      <AsnInput placeholder={placeholder} />
    </AsnForm.Item>
  );
};

export default SectionText;
