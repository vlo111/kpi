import React, { useMemo } from 'react';
import { AsnTabs } from '../../Forms/Tabs';
import { TabHeader } from './Tab/Header';
import { TabContent } from './Tab/Content';
import { IApplicantTabs, StatusItems } from '../../../types/applicant';
// import useGetSection from '../../../api/Applicant/useGetSection';

const ApplicantTabs: React.FC<IApplicantTabs> = ({ courses, applicant }) => {
  const items: StatusItems = useMemo(
    () =>
      courses?.map((course, i) => {
        return {
          key: `course${i}`,
          label: <TabHeader index={i} title={course.title} />,
          children: <TabContent history={course.history} applicant={applicant} />
        };
      }),
    [courses]
  );

  return (
    <AsnTabs
      type="card"
      defaultActiveKey={`course${courses.findIndex((c) => c.history !== undefined)}`}
      items={items}
    />
  );
};

export default ApplicantTabs;
