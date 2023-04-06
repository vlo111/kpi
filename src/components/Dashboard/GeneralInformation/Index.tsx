import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
import AnalyticsCard from '../Card';
import { InfoCardsContainer, TitleContainer } from '../dashboardStyle';
import {
  IGeneralInformation,
  IGeneralInformationProps
} from '../../../types/api/dashboard';

const GeneralInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;
const GeneralInformation: React.FC<IGeneralInformationProps> = ({
  generalData
}) => {
  return (
    <GeneralInformationContainer>
      <TitleContainer>General Information</TitleContainer>
      <InfoCardsContainer>
        {generalData?.map((item: IGeneralInformation) => (
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
      </InfoCardsContainer>
    </GeneralInformationContainer>
  );
};
export default GeneralInformation;
