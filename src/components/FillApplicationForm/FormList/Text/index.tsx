import React from 'react';
import { AsnInput } from '../../../Forms/Input';
import { AsnForm } from '../../../Forms/Form';
import { ISection } from '../../../../types/application';

const SectionText: React.FC<ISection> = ({ index, title }) => {
  return (
    <AsnForm.Item
      key={index}
      name={[index, 'answers', 0, 'text']}
      label={title}
      rules={[{ required: true, message: 'The field is required' }]}
    >
      <AsnInput />
    </AsnForm.Item>
  );
};

export default SectionText;
