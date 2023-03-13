import { Row, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ApplicantsPWDIcon } from '../../../assets/icons/applicants_PWD.svg';

const { Title } = Typography;

const CardContainer = styled(Row)<any>`
  background-color: var(--white);
  box-shadow: var(--base-box-shadow);
  padding: 0.5rem 0.5rem 1rem;
  border-left: ${(props) =>
    props.borderLeft !== null ? props.borderLeft : '0px solid var(--white)'};
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

const AnalyticsCard: React.FC<any> = ({ borderLeft }) => {
  return (
    <CardContainer borderLeft={borderLeft}>
      <TitleContainer>The number of Users</TitleContainer>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '16px',
        marginTop: '2rem'
      }}>
        <ApplicantsPWDIcon />
        <TitleContent> 5000</TitleContent>
      </div>
    </CardContainer>
  );
};
export default AnalyticsCard;
