import React from 'react';
import styled from 'styled-components';
import { Space, Typography } from 'antd';
import { AsnButton } from '../../Forms/Button';
import { AsnForm } from '../../Forms/Form';
import { AsnInput, AsnTextArea } from '../../Forms/Input';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ButtonsContainer, ScoreInputNumber } from '../DynamicAssessmentForm';

const { Title } = Typography;

const QuestionContentContainer = styled.div`
  margin-top: 1rem;

  svg {
    cursor: pointer;
  }
`;
const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  width: 37%;
  span {
    color: var(--dark-2);
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
  console.log(form.getFieldValue(['questions', 0, 'type']), 'kkkkkkkkkkkkkkk');

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
      {answerType === 'OPTION' || answerType === 'CHECKBOX'
        ? (
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
                      {...restField}
                      name={[name, 'score']}
                      rules={[
                        { required: true, message: 'Missing first name' }
                      ]}
                    >
                      <ScoreInputNumber className="primary" min={0} />
                    </AsnForm.Item>
                  </ScoreContainer>
                  {answerList.length <= 2
                    ? null
                    : (
                    <DeleteIcon onClick={() => remove(name)} />
                      )}
                </Space>
              ))}
              <AsnForm.Item>
                <ButtonsContainer
                  style={{
                    justifyContent: 'flex-start',
                    gap: '2rem'
                  }}
                >
                  <AddAnswerButton className="default" onClick={() => add()}>
                    +Add Option
                  </AddAnswerButton>
                  <AddAnswerButton
                    className="default"
                    onClick={() => add('Other...')}
                  >
                    +Add Other
                  </AddAnswerButton>
                </ButtonsContainer>
              </AsnForm.Item>
            </>
          )}
        </AsnForm.List>
          )
        : null}
    </QuestionContentContainer>
  );
};

export default QuestionContent;
