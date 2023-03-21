import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

const CardContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 7.5rem;
  background-color: var(--white);
  box-shadow: var(--base-box-shadow);
  padding: 0.5rem 0.5rem 1rem;
  border-left: ${(props) => props.borderLeftProp};
  border-radius: 10px;
`;

const TitleContainer = styled(Title)`
  color: var(--dark-4) !important;
  font-size: var(--base-font-size) !important;
  font-weight: var(--font-normal) !important;
`;

const TitleContent = styled(Title)`
  color: var(--dark-2) !important;
  font-size: 36px !important;
  margin-bottom: 0rem !important;
`;

const AnalyticsCard: React.FC<any> = ({ borderLeftProp, cardData }) => {
  return (
    <CardContainer borderLeftProp={borderLeftProp}>
      <TitleContainer>{cardData.title}</TitleContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px'
        }}
      >
        {cardData.icon !== undefined ? cardData.icon.icon : null}
        <TitleContent>{cardData.count}</TitleContent>
      </div>
    </CardContainer>
  );
};
export default AnalyticsCard;
