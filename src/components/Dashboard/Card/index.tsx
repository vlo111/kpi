import { Col, Row, Typography } from 'antd';
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
`;

const AnalyticsCard: React.FC<any> = ({ borderLeft }) => {
  return (
    <CardContainer borderLeft={borderLeft} justify="space-around" align="center">
      <Col span={24}>
        <TitleContainer>The number of Users</TitleContainer>
      </Col>
      <Col span={4}>
        <ApplicantsPWDIcon />
      </Col>
      <Col span={20}>
        <TitleContent> 5000</TitleContent>
      </Col>
    </CardContainer>
  );
};
export default AnalyticsCard;
