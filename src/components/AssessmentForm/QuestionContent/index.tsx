import React from 'react';
import styled from 'styled-components';
import { AsnForm } from '../../Forms/Form';
import { AsnTextArea } from '../../Forms/Input';
import DynamicQuestionForm from '../DynamicQuestionForm';

const QuestionContentContainer = styled.div`
  margin-top: 1rem;

  svg {
    cursor: pointer;
  }
`;

const AddQuestionTextArea = styled(AsnTextArea)`
  border: 0.5px solid var(--light-border) !important;
  :hover {
    border: 0.5px solid var(--light-border) !important;
  }
`;

const QuestionContent: React.FC<any> = ({ items, name, answerType }) => {
  const form = AsnForm.useFormInstance();

  return (
    <QuestionContentContainer>
      <AsnForm.Item name={[name[0], 'title']}>
        <AddQuestionTextArea
          placeholder="Question "
          style={{
            marginBottom: '1rem'
          }}
        />
      </AsnForm.Item>
      {
      form.getFieldsValue().questions?.[name[0]].type === 'OPTION' || form.getFieldsValue().questions?.[name[0]].type === 'CHECKBOX'
        ? (
        <DynamicQuestionForm contentName={name} answerType={answerType}/>
          )
        : null}
    </QuestionContentContainer>
  );
};

export default React.memo(QuestionContent);
