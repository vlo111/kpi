import React from 'react';
import { TabsProps } from 'antd';
import { AsnTabs } from '../../Forms/Tabs';
import ResultAreasTitles from '../../../pages/ProjectOverview/ResultAreasTitles';
import Courses from './Courses';

type StatusItems = TabsProps['items']

const data = [
  {
    key: '1',
    title: 'JS Basic',
    projectItems: 3,
    index: 1,
    active: 1,
    date: '20.03.22',
    status: 'Applicant',
    files: ['filename.pdf', 'filename.xlsx', 'filename.doc'],
    setActive: () => {}
  },
  {
    key: '2',
    title: 'JS Advanced',
    projectItems: 3,
    index: 2,
    active: 1,
    date: '20.03.22',
    status: 'Applicant',
    files: ['filename.pdf', 'filename.xlsx', 'filename.doc'],
    setActive: () => {}
  },
  {
    key: '3',
    title: 'JS Advanced',
    projectItems: 3,
    index: 2,
    active: 1,
    date: '20.03.22',
    status: 'Applicant',
    files: ['filename.pdf', 'filename.xlsx', 'filename.doc'],
    setActive: () => {}
  },
  {
    key: '4',
    title: 'JS Advanced',
    projectItems: 3,
    index: 4,
    active: 1,
    date: '20.03.22',
    status: 'Applicant',
    files: ['filename.pdf', 'filename.xlsx', 'filename.doc'],
    setActive: () => {}
  },
  {
    key: '5',
    title: 'JS Advanced',
    projectItems: 3,
    index: 5,
    active: 1,
    date: '20.03.22',
    status: 'Applicant',
    files: ['filename.pdf', 'filename.xlsx', 'filename.doc'],
    setActive: () => {}
  }
];

const ApplicantTabs: React.FC = () => {
  const items: StatusItems = data.map((d) => ({
    key: d.key,
    label: <ResultAreasTitles title={d.title} index={d.index} setActive={d.setActive} active={d.active} projectItems={3} />,
    children: <Courses item={d} />
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
