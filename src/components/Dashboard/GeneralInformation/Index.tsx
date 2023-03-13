import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import AnalyticsCard from '../Card';

const CardContainer = styled.div<any>`
  display: flex;
  flex-direction: row;
`;

const GeneralInformation: React.FC = () => {
  return (
    <CardContainer className="dddddd">
      <Row gutter={[32, 32]}>
        {[1, 2, 3, 4].map((item) => (
          <Col
            key={item}
            style={{
              width: '22%'
            }}
          >
            <AnalyticsCard borderLeft="6px solid var(--secondary-light-orage)" />
          </Col>
        ))}
      </Row>
    </CardContainer>
  );
};
export default GeneralInformation;
