import React from 'react';
import styled from 'styled-components';
import { Col } from 'antd';
import { TitleContainer } from '../dashboardStyle';
import AnalyticsCard from '../Card';
import { ReactComponent as SubmittedApplicants } from '../../../assets/icons/submitted_applicants.svg';
import { ReactComponent as TrainedApplicants } from '../../../assets/icons/trained_learners.svg';
import { ReactComponent as CurrentlyEnrolledApplicantsCourses } from '../../../assets/icons/currently_enrolled_learners_courses.svg';
import { ReactComponent as DroppedApplicants } from '../../../assets/icons/dropped_learners.svg';
import { ReactComponent as NotEnrolledApplicants } from '../../../assets/icons/not-enrolled_learners.svg';
import { ReactComponent as ApplicantsPWDIcon } from '../../../assets/icons/applicants_PWD.svg';
import { ReactComponent as TrainedApplicantsDisability } from '../../../assets/icons/trained_PWD.svg';

const SubmittedApplicationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const cardsIcon = [
  {
    icon: <SubmittedApplicants />
  },
  {
    icon: <TrainedApplicants />
  },
  {
    icon: <CurrentlyEnrolledApplicantsCourses />
  },
  {
    icon: <DroppedApplicants />
  },
  {
    icon: <NotEnrolledApplicants />
  },
  {
    icon: <ApplicantsPWDIcon />
  },
  {
    icon: <TrainedApplicantsDisability />
  }
];
const SubmittedApplications: React.FC<any> = ({ submittedData }) => {
  const submittedIconData: any = submittedData?.map(
    (item: any, index: number) => {
      return {
        title: item.title,
        count: item.count,
        trained_applicants_percent: item.trained_applicants_percent,
        icon: cardsIcon[index]
      };
    }
  );

  return (
    <SubmittedApplicationsContainer>
      <TitleContainer>Submitted Applications</TitleContainer>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '2rem'
      }} >
        {submittedIconData?.map((item: any) => (
          <Col
            key={item.title}
            style={{
              width: '20%'
            }}
          >
            <AnalyticsCard
              borderLeftProp={'0px solid var(--secondary-light-orage)'}
              cardData={item}
            />
          </Col>
        ))}
      </div>
    </SubmittedApplicationsContainer>
  );
};
export default SubmittedApplications;
