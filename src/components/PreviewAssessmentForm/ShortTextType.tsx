import React from 'react';

import { UnderLineInput } from '../../components/Forms/Input/UnderLineInput';
import { AsnForm } from '../../components/Forms/Form';
import { IAnswersProps } from '../../types/api/assessment';

const ShortTextType: React.FC<IAnswersProps> = ({ question, i }) => {
  const { title, score, required } = question;

  return (
        <AsnForm.Item
            label={`${title} (${score} score)`}
            rules={[{ required }]}
            style={{ fontWeight: 'var(--font-semibold)' }}
        >
            <UnderLineInput disabled />
        </AsnForm.Item>
  );
};

export default ShortTextType;
