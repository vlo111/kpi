import React from 'react';

import { UnderLineInput } from '../../components/Forms/Input/UnderLineInput';
import { AsnForm } from '../../components/Forms/Form';
import { IAnswersProps } from '../../types/api/assessment';

const ShortTextType: React.FC<IAnswersProps> = ({ question, i }) => {
  const { title, required, score } = question;
  return (
        <AsnForm.Item
            name={[i, 'answers', 0, 'text']}
            label={`${title} (${score} score)`}
            rules={[{ required, message: 'Please fill input field' }]}
            style={{ fontWeight: 'var(--font-semibold)' }}
        >
            <UnderLineInput />
        </AsnForm.Item>
  );
};

export default ShortTextType;
