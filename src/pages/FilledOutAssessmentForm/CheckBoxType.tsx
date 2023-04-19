import React, { useState } from 'react';
import { Space } from 'antd';

import { AssessMentFormCheckBox } from '../../components/Forms/Checkbox';
import { AsnForm } from '../../components/Forms/Form';
import Grading from './Grading';
import { IAnswersProps, IAnswer } from '../../types/api/assessment';
import { FormItemWrapperCol, TotalScoreQuestion, AnswerScore, AnswerWrapper } from './styles';

const CheckBoxType: React.FC<IAnswersProps> = ({ question, i, setAllScore, allScore }) => {
  const { title, answers, required, score, userEarnedScore, assessedScore } = question;

  const [grading, setGrading] = useState<boolean>(false);
  const [earnedScore, setEarnedScore] = useState<number>(userEarnedScore);

  return (
        <FormItemWrapperCol>
            <TotalScoreQuestion>Total Score: {assessedScore ?? earnedScore}/{score}</TotalScoreQuestion>
            <AsnForm.Item
                label={`${i + 1}. ${title} ${required ? '*' : ''}`}
                style={{ fontWeight: 'var(--font-semibold)' }}
            >
                <Space direction="vertical" style={{ paddingTop: '17px', width: '100%' }} >
                    {answers.map((answer: IAnswer) => (
                        <AnswerWrapper
                            key={answer.id}
                            className={answer.score > 0 ? 'isTrue' : 'isFalse'}
                        >
                            {assessedScore === undefined && <AnswerScore>{answer.score > 0 ? `(${answer.score})` : ''}</AnswerScore>}
                            <AssessMentFormCheckBox
                                disabled
                                key={answer.id}
                                style={{ fontWeight: 'var(--font-normal)' }}
                                defaultChecked={answer.checked}
                                value={answer.score}
                            >
                                {answer.title}
                            </AssessMentFormCheckBox>
                        </AnswerWrapper>
                    ))}
                </Space>
            </AsnForm.Item>
            {assessedScore === undefined &&
                <Grading
                    grading={grading}
                    earnedScore={earnedScore}
                    score={score}
                    setEarnedScore={setEarnedScore}
                    setGrading={setGrading}
                    userEarnedScore={userEarnedScore}
                    i={i}
                    setAllScore={setAllScore}
                    allScore={allScore}
                />}
        </FormItemWrapperCol>
  );
};

export default CheckBoxType;
