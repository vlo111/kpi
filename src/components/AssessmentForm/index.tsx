import React, { useEffect } from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';
import { AsnForm } from '../Forms/Form';
// import { AsnInput } from '../Forms/Input';
import AssessmentFormItems from './AssessmentFormList';

const AssessmentFormsContent = styled.div`
  h4 {
    text-align: center;
    font-weight: var(--font-semibold);
    font-size: var(--headline-font-size);
  }
`;

const AssessmentForms: React.FC = () => {
  const { Title } = Typography;

  const [form] = AsnForm.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: 'aaa',
      questions: [
        { answerType: 'OPTION' }
      ]
    });
  });

  console.log(form.getFieldsValue(), 'fils');

  return (
    <AssessmentFormsContent>
      <Title level={4}>Create assessment Form</Title>
      <AsnForm form={form} id="create-assessment-AsnForm">
        {/* <AsnForm.Item name='email' label='Email address (same as in the submitted application form)' rules={[{ required: true }]}>
            <AsnInput />
        </AsnForm.Item> */}
        <AsnForm.List name='questions'>
          {(questionsList, { add, remove }) => (
            <AssessmentFormItems items={questionsList}/>
          )}
        </AsnForm.List>
      </AsnForm>
    </AssessmentFormsContent>
  );
};

export default AssessmentForms;