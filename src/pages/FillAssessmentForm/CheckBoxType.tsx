import React from 'react';
import { Space, Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import styled from 'styled-components';

import { AsnForm } from '../../components/Forms/Form';
import { IAnswersProps, IAnswer } from '../../types/api/assessment';

const AsnCheckbox = styled(Checkbox)`
    span{
     font-size: var(--base-font-size) !important;
    }
    .ant-checkbox .ant-checkbox-inner {
      border-color:  var(--dark-border-ultramarine);
    }

    .ant-checkbox-disabled .ant-checkbox-inner {
      border-color:  var(--dark-border-ultramarine);
     }

     .ant-checkbox-checked .ant-checkbox-inner {
       border-color:  var(--dark-border-ultramarine);
       background-color: var(--dark-border-ultramarine);
     }
`;

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
      <AsnCheckbox.Group style={{ paddingTop: '17px' }} onChange={(e) => handleChecked(e)} >
        <Space direction="vertical">
          {answers.map((answer: IAnswer) => (
            <AsnCheckbox
              key={answer.id}
              value={answer.id}
              style={{ fontWeight: 'var(--font-normal)' }}
            >
              {answer.title}
            </AsnCheckbox>
          ))}
        </Space>
      </AsnCheckbox.Group>
    </AsnForm.Item>
  );
};

export default CheckBoxType;
