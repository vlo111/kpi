import { Col, Row } from 'antd';
import React from 'react';
// import styled from 'styled-components';
import AnalyticsCard from '../Card';

// const CardContainer = styled.div<any>`
//   display: flex;
//   flex-direction: row;
//   gap: 2rem;
// `;

const GeneralInformation: React.FC = () => {
  return (
    <Row gutter={[32, 32]}>
      {[1, 2, 3, 4].map((item) => (
        <Col key={item}
        >
          <AnalyticsCard
            borderLeft="6px solid var(--secondary-light-orage)"
          />
        </Col>
      ))}
    </Row>
  );
};
export default GeneralInformation;
