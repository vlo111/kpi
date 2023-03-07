import React from 'react';
import { Space } from 'antd';

import { AssessMentFormCheckBox } from '../../components/Forms/Checkbox';
import { AsnForm } from '../../components/Forms/Form';
import { IAnswersProps, IAnswer } from '../../types/api/assessment';

const CheckBoxType: React.FC<IAnswersProps> = ({ question, i }) => {
  const { answers, title, score, required } = question;

  return (
    <AsnForm.Item
      name={i}
      label={`${title} (${score} score)`}
      rules={[{ required }]}
      style={{ fontWeight: 'var(--font-semibold)' }}
    >
      <Space direction="vertical" style={{ paddingTop: '17px' }}>
        {answers.map((answer: IAnswer, i: number) => (
          <AssessMentFormCheckBox
            key={i}
            style={{ fontWeight: 'var(--font-normal)' }}
            disabled
            id="preview"
          >
            {answer.title}
          </AssessMentFormCheckBox>
        ))}
      </Space>
    </AsnForm.Item>
  );
};

export default CheckBoxType;
