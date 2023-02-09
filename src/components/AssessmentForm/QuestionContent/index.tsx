import React from 'react';
import styled from 'styled-components';
import { Space } from 'antd';
import { AsnButton } from '../../Forms/Button';
import { AsnForm } from '../../Forms/Form';
import { AsnInput } from '../../Forms/Input';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ScoreInputNumber } from '../DynamicAssessmentForm';

const QuestionContentContainer = styled.div`
  margin-top: 1rem;
`;
const AnswersInput = styled(AsnInput)`
  border-radius: 0px;
  border: 1px solid var(--light-border);
  :hover {
    border: 1px solid var(--light-border) !important;
  }
`;
const AddAnswerButton = styled(AsnButton)`
  border-radius: 0px !important;
  border: 1px solid var(--light-border) !important;
  padding: 0rem 3rem;
  span {
    color: var(--dark-2);
  }
`;

const QuestionContent: React.FC<any> = ({ items, name }) => {
  return (
    <QuestionContentContainer>
      <AsnForm.List name={name} initialValue={['', '']}>
        {(answerList, { add, remove }) => (
          <>
            {answerList.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <AsnForm.Item
                  {...restField}
                  name={[name, 'title']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <AnswersInput placeholder={`Option ${key + 1}`} />
                </AsnForm.Item>
                <AsnForm.Item
                  {...restField}
                  name={[name, 'score']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <ScoreInputNumber className="primary" />
                </AsnForm.Item>
                {answerList.length <= 2
                  ? null
                  : (
                  <DeleteIcon onClick={() => remove(name)} />
                    )}
              </Space>
            ))}
            <AsnForm.Item>
              <AddAnswerButton className="default" onClick={() => add()}>
                +Add Option
              </AddAnswerButton>
            </AsnForm.Item>
          </>
        )}
      </AsnForm.List>
    </QuestionContentContainer>
  );
};

export default QuestionContent;
