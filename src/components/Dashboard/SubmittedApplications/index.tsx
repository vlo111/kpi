import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
import { InfoCardsContainer, TitleContainer } from '../dashboardStyle';
import AnalyticsCard from '../Card';
import { dashboardCardsIcon } from '../../../helpers/constants';
import {
  ISubmittedApplications,
  ISubmittedApplicationsProps
} from '../../../types/api/dashboard';

const SubmittedApplicationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const SubmittedApplications: React.FC<ISubmittedApplicationsProps> = ({
  submittedData
}) => {
  const [submittedIconData, setSubmittedIconData] = useState<
  ISubmittedApplications[]
  >([]);
  useEffect(() => {
    setSubmittedIconData(
      submittedData?.map((item: ISubmittedApplications, index: number) => {
        return {
          title: item.title,
          count: item.count,
          trained_applicants_percent: item.trained_applicants_percent,
          icon: dashboardCardsIcon[index]
        };
      })
    );
  }, [submittedData]);

  return (
    <SubmittedApplicationsContainer>
      <TitleContainer>Submitted Applications</TitleContainer>
      <InfoCardsContainer>
        {submittedIconData?.map((item: ISubmittedApplications) => (
          <Col
            key={item.title}
            style={{
              width: '17%'
            }}
          >
            <AnalyticsCard
              borderLeftProp={'0px solid var(--secondary-light-orage)'}
              cardData={item}
            />
          </Col>
        ))}
      </InfoCardsContainer>
    </SubmittedApplicationsContainer>
  );
};
export default SubmittedApplications;
