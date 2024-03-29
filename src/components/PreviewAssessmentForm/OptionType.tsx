import React from 'react';
import { Space } from 'antd';

import { AsnRadio } from '../../components/Forms/Radio';
import { UnderLineInput } from '../../components/Forms/Input/UnderLineInput';
import { AsnForm } from '../../components/Forms/Form';
import { IAnswersProps, IAnswer } from '../../types/api/assessment';

const OptionType: React.FC<IAnswersProps> = ({ question, i }) => {
  const { answers, title, score, required } = question;

  const sortedAnswers = answers?.sort((a, b) => (a.type < b.type) ? -1 : (a.type > b.type) ? 1 : 0);

  return (
    <AsnForm.Item
      name={i}
      label={`${title} (${score} score)`}
      rules={[{ required }]}
      style={{ fontWeight: 'var(--font-semibold)' }}
    >
        <Space direction="vertical" style={{ paddingTop: '17px' }}>
          {sortedAnswers.map((answer: IAnswer, i: number) => (
            <AsnRadio key={i} disabled style={{ fontWeight: 'var(--font-normal)' }} id="preview" >
              {answer.title}
              {answer.type === 'SHORT_TEXT' &&
                <AsnForm.Item
                  style={{ margin: '-32px 0px 0px 65px' }}
                >
                  <UnderLineInput disabled />
                </AsnForm.Item>}
            </AsnRadio>
          ))}
        </Space>
    </AsnForm.Item>
  );
};

export default OptionType;
