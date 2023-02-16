import React from 'react';
import { Space } from 'antd';

import { AsnRadio } from '../../components/Forms/Radio';
import { UnderLineInput } from '../../components/Forms/Input/UnderLineInput';
import { AsnForm } from '../../components/Forms/Form';
import { IAnswersProps, IAnswer } from '../../types/api/assessment';

const OptionType: React.FC<IAnswersProps> = ({ question, i }) => {
  //   const { title, answers, required, score } = question;

  //   const form = AsnForm.useFormInstance();
  //   const sortedAnswers = answers?.sort((a, b) => (a.type < b.type) ? -1 : (a.type > b.type) ? 1 : 0);

  return (
    <AsnForm.Item
      name={[i, 'answers', 0, 'id']}
    //   label={`${title} (${score} score)`}
    //   rules={[{ required, message: 'Please check field' }]}
      style={{ fontWeight: 'var(--font-semibold)' }}
    >
        <Space direction="vertical" style={{ paddingTop: '17px' }}>
          {[].map((answer: IAnswer) => (
            <AsnRadio key={answer.id} value={answer.id} style={{ fontWeight: 'var(--font-normal)' }} >
              {answer.title}
              {answer.type === 'SHORT_TEXT' &&
                <AsnForm.Item
                  name={[i, 'answers', 0, 'text']}
                  style={{ margin: '-32px 0px 0px 65px', width: 'calc(80vw - 136px)' }}
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
// 0c83f395-3a58-4334-8abd-530e98e4b25c
// 937ac0c0-37f3-453c-9f48-5e222b745ddd
