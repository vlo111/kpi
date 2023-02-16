import React from 'react';
import { Space } from 'antd';

import { AssessMentFormCheckBox } from '../../components/Forms/Checkbox';
import { AsnForm } from '../../components/Forms/Form';
import { IAnswersProps, IAnswer } from '../../types/api/assessment';

const CheckBoxType: React.FC<IAnswersProps> = ({ question, i }) => {
  //   const form = AsnForm.useFormInstance();
  //   const { title, answers, required, score } = question;

  return (
        <AsnForm.Item
            name={[i, 'checkboxIds']}
            //   label={`${title} (${score} score)`}
            // rules={[{ requred: true }]}
            style={{ fontWeight: 'var(--font-semibold)' }}
        >
                <Space direction="vertical" style={{ paddingTop: '17px' }}>
                    {[].map((answer: IAnswer) => (
                        <AssessMentFormCheckBox
                            key={answer.id}
                            value={answer.id}
                            style={{ fontWeight: 'var(--font-normal)' }}
                        >
                            {answer.title}
                        </AssessMentFormCheckBox>
                    ))}
                </Space>
        </AsnForm.Item>
  );
};

export default CheckBoxType;
