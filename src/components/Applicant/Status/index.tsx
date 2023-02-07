import React from 'react';

import Courses from './Courses';
import { AsnTabs } from '../../Forms/Tabs';
import ResultAreasTitles from '../../../pages/ProjectOverview/ResultAreasTitles';
import { IApplicantTabs, StatusItems } from '../../../types/applicant';

const ApplicantTabs: React.FC<IApplicantTabs> = ({ courses, applicant }) => {
  const items: StatusItems = courses?.map((course, i) => ({
    key: course.title,
    label: <ResultAreasTitles title={course.title} index={i} setActive={() => true} active={1} projectItems={2} />,
    children: <Courses histories={course.history ?? []} applicant={applicant} />
  }));

  return (
    <AsnTabs
      type="card"
      defaultActiveKey="1"
      items={items}
      onChange={() => {}}
    />
  );
};

export default ApplicantTabs;
