import React from 'react';
import { Space, Typography } from 'antd';
import { AsnForm } from '../../Forms/Form';
import {
  CardContainer,
  MaxScores,
  ScoreInputNumber,
  Scores
} from '../assessmentStyle';
import { AsnSwitch } from '../../Forms/Switch';

const { Title } = Typography;

const BottomCard: React.FC<{ allScore: number }> = ({ allScore }) => {
  return (
    <CardContainer
      marginTop={'2rem'}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '2rem 1rem '
      }}
    >
      <Space>
        <Scores>
          <Title level={5} style={{ fontWeight: '400' }}>
            Maximum Score
          </Title>
          <MaxScores>{allScore}</MaxScores>
        </Scores>
        <Scores>
          <Title level={5} style={{ fontWeight: '400' }}>
            Passing Score
          </Title>
          <AsnForm.Item name="passingScore">
            <ScoreInputNumber className="primary" min={0} max={allScore} />
          </AsnForm.Item>
        </Scores>
      </Space>
      <Scores>
        <Title level={5} style={{ fontWeight: '400' }}>
          Online signature
        </Title>
        <AsnForm.Item name="onlineSignature" valuePropName="checked">
          <AsnSwitch />
        </AsnForm.Item>
      </Scores>
    </CardContainer>
  );
};

export default BottomCard;
