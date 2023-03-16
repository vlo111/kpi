import React from 'react';
import { Col, Row } from 'antd';
import { TitleContainer } from '../dashboardStyle';
import AnalyticsCard from '../Card';

const SubmittedApplications: React.FC = () => {
  return (
    <Row
      style={{
        marginTop: '2rem'
      }}
    >
      <TitleContainer>Submitted Applications</TitleContainer>
      <Row gutter={[32, 32]}>
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Col
            key={item}
            style={{
              width: '20%'
            }}
          >
            <AnalyticsCard
              borderLeftProp={'0px solid var(--secondary-light-orage)'}
            />
          </Col>
        ))}
      </Row>
    </Row>
  );
};
export default SubmittedApplications;
