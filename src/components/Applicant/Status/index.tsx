import React from 'react';
import { TabsProps } from 'antd';
import { AsnTabs } from '../../Forms/Tabs';
import ResultAreasTitles from '../../../pages/ProjectOverview/ResultAreasTitles';
import Courses from './Courses';
import { ICourse } from '../../../types/applicant';

type StatusItems = TabsProps['items']

const ApplicantTabs: React.FC<{ courses: ICourse[] | undefined, applicant: string }> = ({ courses, applicant }) => {
  const items: StatusItems = courses?.map((course, i) => ({
    key: course.title,
    label: <ResultAreasTitles title={course.title} index={i} setActive={() => {}} active={1} projectItems={3} />,
    children: <Courses histories={course.history} applicant={applicant} />
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
