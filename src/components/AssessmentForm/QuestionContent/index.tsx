import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { AsnForm } from '../../Forms/Form';
import { AsnTextArea } from '../../Forms/Input';
import DynamicQuestionForm from '../DynamicQuestionForm';
import { ScoreInputNumber } from '../DynamicAssessmentForm';
import { Void } from '../../../types/global';

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

const QuestionContent: React.FC<any> = ({ name, answerType, setAllScore }) => {
  const form = AsnForm.useFormInstance();

  const calcScores: Void = () => {
    const scores = form
      .getFieldValue(['questions', name[0], 'answers'])
      .reduce(
        (acc: any, current: any) =>
          +acc + Number(current.score === undefined ? 0 : current.score),
        0
      );
    form.setFieldValue(['questions', name[0], 'score'], scores);
    const allScores = form
      .getFieldValue(['questions'])
      .reduce(
        (a: any, d: { score: any }) =>
          +a + Number(d.score === undefined ? 0 : d.score),
        0
      );
    setAllScore(allScores);
  };

  const onInputNumberChange: Void = () => {
    const allScores = form
      .getFieldValue(['questions'])
      .reduce(
        (a: any, d: { score: any }) =>
          +a + Number(d.score === undefined ? 0 : d.score),
        0
      );
    setAllScore(allScores);
  };

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
      {form.getFieldsValue().questions?.[name[0]].answerType === 'OPTION' ||
      form.getFieldsValue().questions?.[name[0]].answerType === 'CHECKBOX'
        ? (
        <DynamicQuestionForm
          contentName={name}
          answerType={answerType}
          calcScores={calcScores}
        />
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
            <ScoreInputNumber
              className="primary"
              min={0}
              onChange={onInputNumberChange}
            />
          </AsnForm.Item>
        </ScoreContainer>
          )}
    </QuestionContentContainer>
  );
};

export default React.memo(QuestionContent);
