import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
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
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '2rem'

      }} >
        {generalData?.map((item: any) => (
          <Col
            key={item.title}
            style={{
              width: '23%'
            }}
          >
            <AnalyticsCard
              borderLeftProp={'6px solid var(--secondary-light-orage)'}
              cardData={item}
            />
          </Col>
        ))}
      </div>
    </GeneralInformationContainer>
  );
};
export default GeneralInformation;
