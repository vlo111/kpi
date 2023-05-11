import React, { useState } from 'react';
import { Row, Space } from 'antd';

import { AsnInputNumber } from '../../components/Forms/Input';
import { AsnForm } from '../../components/Forms/Form';
import { IAnswersProps } from '../../types/api/assessment';
import { FormItemWrapperCol, TotalScoreQuestion, AsnParagraph } from './styles';

const ShortTextType: React.FC<IAnswersProps> = ({ question, i, activateSave }) => {
  const { title, required, score, answers, userEarnedScore, assessedScore } = question;
  const [earnedScore, setEarnedScore] = useState<number>(userEarnedScore);

  return (
    <FormItemWrapperCol>
      <TotalScoreQuestion> Total Score: {assessedScore ?? earnedScore}/{score}</TotalScoreQuestion>
      <AsnForm.Item
        label={`${i + 1}. ${title} ${required ? '*' : ''}`}
        style={{ fontWeight: 'var(--font-semibold)', margin: 0 }}
      >
        <Space direction='horizontal' style={{ justifyContent: 'space-between', width: '100%' }} size={30}>
          <AsnParagraph
            className='textAnswer'
            underline
            style={{ paddingTop: '15px' }}
          >
            {answers[0].text}
          </AsnParagraph>
          {
            assessedScore === undefined && !activateSave &&
            <Row justify='end'>
              <AsnForm.Item style={{ margin: 0 }} name={[i, 'score']}>
                <AsnInputNumber
                  className='primary'
                  defaultValue={userEarnedScore}
                  max={score}
                  min={0}
                  onChange={(e) => setEarnedScore(e as number)}
                  style={{ float: 'right' }}
                  onPressEnter={(e) => e.preventDefault()}
                />
              </AsnForm.Item>
            </Row>
          }
        </Space>
      </AsnForm.Item>
    </FormItemWrapperCol>
  );
};

export default ShortTextType;
