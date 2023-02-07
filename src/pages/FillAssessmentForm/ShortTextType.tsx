import React from 'react';

import { UnderLineInput } from '../../components/Forms/Input/UnderLineInput';
import { AsnForm } from '../../components/Forms/Form';

const ShortTextType: React.FC<any> = ({ question, i }) => {
  const { title, required, score } = question;
  return (
        <AsnForm.Item
            name={[i, 'answers', 0, 'text']}
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            label={`${title} (${score} score)`}
            rules={[{ required, message: 'Please fill input field' }]}
            style={{ fontWeight: 500 }}
        >
            <UnderLineInput />
        </AsnForm.Item>
  );
};

export default ShortTextType;
