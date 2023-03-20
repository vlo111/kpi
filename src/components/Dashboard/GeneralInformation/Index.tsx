import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import AnalyticsCard from '../Card';
import { TitleContainer } from '../dashboardStyle';

const GeneralInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;
const GeneralInformation: React.FC<any> = ({ generalData }) => {
  return (
    <GeneralInformationContainer>
      <TitleContainer>General Information</TitleContainer>
      <Row gutter={[32, 32]}>
        {generalData?.map((item: any) => (
          <Col
            key={item.title}
            style={{
              width: '25%'
            }}
          >
            <AnalyticsCard
              borderLeftProp={'6px solid var(--secondary-light-orage)'}
              cardData={item}
            />
          </Col>
        ))}
      </Row>
    </GeneralInformationContainer>
  );
};
export default GeneralInformation;
