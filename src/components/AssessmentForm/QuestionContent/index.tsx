import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { AsnForm } from '../../Forms/Form';
import { AsnTextArea } from '../../Forms/Input';
import DynamicQuestionForm from '../DynamicQuestionForm';
import { ScoreInputNumber } from '../DynamicAssessmentForm';

const { Title } = Typography;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: flex-end;
`;

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

const QuestionContent: React.FC<any> = ({ name, answerType }) => {
  const form = AsnForm.useFormInstance();

  return (
    <QuestionContentContainer>
      <AsnForm.Item
        name={[name[0], 'title']}
        rules={[{ required: true, message: 'Missing first name' }]}
      >
        <AddQuestionTextArea
          placeholder="Question "
          style={{
            marginBottom: '1rem'
          }}
        />
      </AsnForm.Item>
      {form.getFieldsValue().questions?.[name[0]].type === 'OPTION' ||
      form.getFieldsValue().questions?.[name[0]].type === 'CHECKBOX'
        ? (
        <DynamicQuestionForm contentName={name} answerType={answerType} />
          )
        : (
        <ScoreContainer>
          <Title
            level={5}
            style={{
              fontWeight: '400',
              margin: '0 0.5rem 0 ',
              fontSize: 'var(--base-font-size)'
            }}
          >
            Score
          </Title>
          <AsnForm.Item
            name={[name[0], 'score']}
            initialValue={0}
            rules={[{ required: true, message: 'Missing first name' }]}
          >
            <ScoreInputNumber className="primary" min={0} />
          </AsnForm.Item>
        </ScoreContainer>
          )}
      {form.getFieldsValue().questions?.[name[0]].type === 'CHECKBOX'
        ? (
        <AsnForm.Item name={[name[0], 'score']} initialValue={form.getFieldValue([name[0], 'answers', 0, 'score'])}>
          <ScoreInputNumber className="primary" min={0} />
        </AsnForm.Item>
          )
        : null}
    </QuestionContentContainer>
  );
};

export default React.memo(QuestionContent);
