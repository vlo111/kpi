import React, { useState } from 'react';
import { Space, Radio, RadioChangeEvent } from 'antd';
import styled from 'styled-components';

import { UnderLineInput } from '../../components/Forms/Input/UnderLineInput';
import { AsnForm } from '../../components/Forms/Form';
import { IAnswersProps, IAnswer } from '../../types/api/assessment';

const AsnRadio = styled(Radio)`
 span{
  font-size: var(--base-font-size) !important;
 }
  .ant-radio-inner{
   border: 1px solid var(--dark-border-ultramarine)
  }
  .ant-radio:hover .ant-radio-inner{
    border: 1px solid var(--dark-border-ultramarine) !important
  }
  .ant-radio-inner:after{
    background-color:var(--dark-border-ultramarine)
  }
  .ant-radio-input:focus+.ant-radio-inner{
    box-shadow: none
  }
`;

const OptionType: React.FC<IAnswersProps> = ({ question, i }) => {
  const [checkOther, setCheckOther] = useState<boolean>(false);

  const { title, answers, required, score } = question;

  const form = AsnForm.useFormInstance();
  const sortedAnswers = answers?.sort((a, b) => (a.type < b.type) ? -1 : (a.type > b.type) ? 1 : 0);

  const handleRadioCheck = (e: RadioChangeEvent): void => {
    const value = e.target.value;
    const hasOtherOption = sortedAnswers[sortedAnswers.length - 1];

    form.setFields([
      {
        name: ['apply', i, 'answers', 0, 'text'],
        errors: []
      }
    ]);

    if ((hasOtherOption.type === 'SHORT_TEXT' && hasOtherOption.id === value) || checkOther) {
      setCheckOther(!checkOther);
    }
    form.setFieldValue(['apply', i, 'answers'], [{ id: value }]);
  };

  return (
    <AsnForm.Item
      name={[i, 'answers', 0, 'id']}
      label={`${title} (${score} score)`}
      rules={[{ required, message: 'Please check field' }]}
      style={{ fontWeight: 'var(--font-semibold)' }}
    >
      <AsnRadio.Group onChange={(e) => handleRadioCheck(e)} style={{ paddingTop: '17px' }}>
        <Space direction="vertical">
          {sortedAnswers.map((answer: IAnswer) => (
            <AsnRadio key={answer.id} value={answer.id} style={{ fontWeight: 'var(--font-normal)' }} >
              {answer.title}
              {answer.type === 'SHORT_TEXT' &&
                <AsnForm.Item
                  name={[i, 'answers', 0, 'text']}
                  style={{ margin: '-32px 0px 0px 65px', width: 'calc(80vw - 136px)' }}
                  rules={[{ required: checkOther, message: 'Please fill input field' }]}
                >
                  <UnderLineInput disabled={!checkOther} />
                </AsnForm.Item>}
            </AsnRadio>
          ))}
        </Space>
      </AsnRadio.Group>
    </AsnForm.Item>
  );
};

export default OptionType;
// 0c83f395-3a58-4334-8abd-530e98e4b25c
// 937ac0c0-37f3-453c-9f48-5e222b745ddd
