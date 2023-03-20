import React from 'react';
import { Col, Row } from 'antd';
import { TitleContainer } from '../dashboardStyle';
import AnalyticsCard from '../Card';
// import { ReactComponent as ApplicantsPWDIcon } from '../../../assets/icons/applicants_PWD.svg';
// import { ReactComponent as TrainedApplicants } from '../../../assets/icons/trained_learners.svg';
// import { ReactComponent as CurrentlyEnrolledApplicantsCourses } from '../../../assets/icons/currently_enrolled_learners_courses.svg';
// import { ReactComponent as DroppedApplicants } from '../../../assets/icons/dropped_learners.svg';

const SubmittedApplications: React.FC<any> = ({ submittedData }) => {
  return (
    <Row
      style={{
        marginTop: '2rem'
      }}
    >
      <TitleContainer>Submitted Applications</TitleContainer>
      <Row gutter={[32, 32]}>
        {submittedData?.map((item: any) => (
          <Col
          key={item}
          style={{
            width: '20%'
          }}
          >
            {/* <ApplicantsPWDIcon/> */}
            <AnalyticsCard
              borderLeftProp={'0px solid var(--secondary-light-orage)'}
              cardData={item}
            />
          </Col>
        ))}
      </Row>
    </Row>
  );
};
export default SubmittedApplications;
