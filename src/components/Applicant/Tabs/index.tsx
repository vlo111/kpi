import React, { useMemo } from 'react';
import { AsnTabs } from '../../Forms/Tabs';
import { TabHeader } from './Tab/Header';
import { TabContent } from './Tab/Content';
import { IApplicantTabs, StatusItems } from '../../../types/applicant';

const ApplicantTabs: React.FC<IApplicantTabs> = ({ courses, applicant }) => {
  const items: StatusItems = useMemo(
    () =>
      courses?.map((course, i) => {
        return {
          key: `course${i}`,
          label: <TabHeader index={i} title={course.title} />,
          children: <TabContent histories={course.history} sectionId={course.sectionDataId} applicant={applicant} />
        };
      }),
    [courses]
  );

  return (
    <AsnTabs
      type="card"
      destroyInactiveTabPane={true}
      defaultActiveKey={`course${courses.findIndex((c) => c.history !== undefined)}`}
      items={items}
    />
  );
};

export default ApplicantTabs;
