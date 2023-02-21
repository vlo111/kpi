import React, { useState } from 'react';
import { Space } from 'antd';

import { AsnRadio } from '../../components/Forms/Radio';
import { AsnForm } from '../../components/Forms/Form';
import Grading from './Grading';
import { IAnswersProps, IAnswer } from '../../types/api/assessment';
import { FormItemWrapperCol, TotalScoreQuestion, AnswerScore, AnswerWrapper, AsnParagraph } from './styles';

const OptionType: React.FC<IAnswersProps> = ({ question, i, setAllScore, allScore }) => {
  const { title, answers, required, score, userEarnedScore, assessedScore } = question;
  const [grading, setGrading] = useState<boolean>(false);
  const [earnedScore, setEarnedScore] = useState<number>(userEarnedScore);

  const sortedAnswers = answers?.sort((a, b) => (a.type < b.type) ? -1 : (a.type > b.type) ? 1 : 0);

  const otherField = sortedAnswers[sortedAnswers.length - 1];

  return (
    <FormItemWrapperCol span={24}>
      <TotalScoreQuestion> Total Score: {assessedScore ?? earnedScore}/{score}</TotalScoreQuestion>
      <AsnForm.Item
        label={`${i + 1}. ${title} ${required ? '*' : ''}`}
        style={{ fontWeight: 'var(--font-semibold)' }}
      >
        <Space direction="vertical" style={{ paddingTop: '17px', width: '100%' }}>
          {sortedAnswers.map((answer: IAnswer) => (
            <AnswerWrapper
              key={answer.id}
              className={answer.score > 0 ? 'isTrue' : 'isFalse'}
            >
              {(assessedScore === undefined) && <AnswerScore>{answer.score > 0 ? `(${answer.score})` : ''}</AnswerScore>}
              <AsnRadio
                disabled
                value={answer.score}
                defaultChecked={answer.checked}
                style={{ fontWeight: 'var(--font-normal)' }}
              >
                {answer.title}
                {answer.type === 'SHORT_TEXT' &&
                  <AsnForm.Item
                    style={{ margin: '-32px 0px 0px 65px', width: '90%' }}
                  >
                    <AsnParagraph className='textAnswer' underline>
                      {answer.text}
                    </AsnParagraph>
                  </AsnForm.Item>}
              </AsnRadio>
            </AnswerWrapper>
          ))}
        </Space>
      </AsnForm.Item>
      {
        otherField.type === 'SHORT_TEXT' && otherField.checked && assessedScore === undefined &&
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
        />
      }
    </FormItemWrapperCol >
  );
};

export default OptionType;
