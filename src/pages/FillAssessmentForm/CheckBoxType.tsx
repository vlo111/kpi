import React from 'react';
import { Space, Checkbox } from 'antd';
import styled from 'styled-components';

import { AsnForm } from '../../components/Forms/Form';

const AsnCheckbox = styled(Checkbox)`
   span{
  font-size: 16px !important;
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

const CheckBoxType: React.FC<any> = ({ question, i }) => {
  const { title, answers, required, score } = question;

  return (
        <AsnForm.Item
            name={[i, 'answers']}
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            label={`${title} (${score} score)`}
            rules={[
              {
                validator: async (_, file) => {
                  if ((Boolean(required)) && file.length === 0) {
                    return await Promise.reject(new Error('Please check at least one answer'));
                  }
                }
              },
              { required }
            ]}
            style={{ fontWeight: 500 }}
        >
            <AsnCheckbox.Group style={{ paddingTop: '17px' }}>
                <Space direction="vertical">
                    {answers.map((answer: any) => (
                        <AsnCheckbox
                            key={answer.id}
                            value={{ id: answer.id }}
                            style={{ fontWeight: 400 }}
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
