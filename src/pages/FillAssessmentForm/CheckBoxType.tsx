import React from 'react';
import { Space } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

import { AssessMentFormCheckBox } from '../../components/Forms/Checkbox';
import { AsnForm } from '../../components/Forms/Form';
import { IAnswersProps, IAnswer } from '../../types/api/assessment';

const CheckBoxType: React.FC<IAnswersProps> = ({ question, i }) => {
  const form = AsnForm.useFormInstance();
  const { title, answers, required, score } = question;

  const handleChecked = (values: CheckboxValueType[]): void => {
    const checkedValues = values?.map((id) => {
      return {
        id
      };
    });
    form.setFieldValue(['apply', i, 'answers'], checkedValues);
  };

  return (
    <AsnForm.Item
      name={[i, 'checkboxIds']}
      label={`${title} (${score} score)`}
      rules={[
        {
          validator: async (_, file) => {
            if ((Boolean(required)) && (file === undefined || file.length === 0)) {
              return await Promise.reject(new Error('Please check at least one answer'));
            }
          }
        },
        { required, message: '' }
      ]}
      style={{ fontWeight: 'var(--font-semibold)' }}
    >
      <AssessMentFormCheckBox.Group style={{ paddingTop: '17px' }} onChange={(e) => handleChecked(e)} >
        <Space direction="vertical">
          {answers.map((answer: IAnswer) => (
            <AssessMentFormCheckBox
              key={answer.id}
              value={answer.id}
              style={{ fontWeight: 'var(--font-normal)' }}
            >
              {answer.title}
            </AssessMentFormCheckBox>
          ))}
        </Space>
      </AssessMentFormCheckBox.Group>
    </AsnForm.Item>
  );
};

export default CheckBoxType;
