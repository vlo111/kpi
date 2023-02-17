import React from 'react';
import { Row, Col, Space } from 'antd';

import { AsnInputNumber } from '../../components/Forms/Input';
import { AsnForm } from '../../components/Forms/Form';
import { AsnSwitch } from '../../components/Forms/Switch';
import { IGradingAssessmentForm } from '../../types/api/assessment';
import { AsnParagraph } from './styles';

const Grading: React.FC<IGradingAssessmentForm> = ({ grading, earnedScore, score, setEarnedScore, i, setGrading, userEarnedScore }) => {
  const form = AsnForm.useFormInstance();

  const handleGrading = (e: boolean): void => {
    if (grading) {
      setEarnedScore(userEarnedScore);
      form.setFieldValue(['assess', i, 'score'], userEarnedScore);
    }
    setGrading(e);
  };

  return (
        <Row justify='end'>
            <Col>
                {grading &&
                    <AsnForm.Item name={[i, 'score']}>
                        <AsnInputNumber
                            className='primary'
                            value={earnedScore}
                            style={{ float: 'right' }}
                            max={score}
                            min={0}
                            onChange={(e) => setEarnedScore(e as number)}
                        />
                    </AsnForm.Item>
                }
                <Space direction='horizontal' align='center'>
                    <AsnParagraph className='main' disabled={grading}>Auto-grading</AsnParagraph>
                    <AsnSwitch style={{ backgroundColor: 'var(--secondary-green)' }} onChange={(e) => handleGrading(e)} />
                    <AsnParagraph className='main' disabled={!grading}>Manual grading</AsnParagraph>
                </Space>
            </Col>
        </Row>
  );
};

export default Grading;
