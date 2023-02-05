import React, { useEffect, useState } from 'react';
import { Space, Typography } from 'antd';

import { AsnCard } from '../../components/Forms/Card';
import CardTitle from '../ProjectInformation/CardTitle';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import GetSingleSubActivity from '../../api/Activity/SubActivity/useGetSingleSubActivity';
import CourseInfo from '../../components/Project/SubActivity/CourseInformation';

const CourseInfoWrapper = styled.div`
  padding: 40px 32px 60px 32px;
`;

const CourseInformation: React.FC<{}> = () => {
  const { Title } = Typography;
  const { id: subActivityId } = useParams<{ id: string }>();
  const { data, refetch } = GetSingleSubActivity(subActivityId, { courseInfo: true }, {});
  const [courseTitle, setCourseTitle] = useState('');
  const [activityTitle, setActivityTitle] = useState('');
  const [resultAreaTitle, setResultAreaTitle] = useState('');
  const [projectId, setProjectId] = useState('');

  const onChange = (key: string): void => {
    setCourseTitle(key);
  };

  useEffect(() => {
    setCourseTitle(data?.sectionsData[0]?.title);
    setActivityTitle(data?.inputActivity?.title);
    setResultAreaTitle(data?.inputActivity?.resultArea?.title);
    setProjectId(data?.inputActivity?.resultArea?.project?.id);
  }, [data]);

  return (
    <CourseInfoWrapper>
      {Boolean(projectId) && subActivityId !== undefined &&
      <AsnBreadcrumb
        routes={[
          {
            path: `/project/overview/${projectId}`,
            breadcrumbName: resultAreaTitle
          },
          {
            path: `/project/overview/${projectId}`,
            breadcrumbName: activityTitle
          },
          {
            path: `/project/sub-activity/${subActivityId}`,
            breadcrumbName: courseTitle
          },
          {
            path: '',
            breadcrumbName: 'COURSE INFORMATION'
          }
        ]}
      />}
      <Title
        level={2}
        style={{
          textAlign: 'center',
          fontSize: 'var(--large-hedline-font-size)',
          fontWeight: 'var(--font-bold)'
        }}
      >
        Course Information
      </Title>
      <AsnCard>
        <Space direction={'vertical'} size={[0, 16]} style={{ width: '100%' }}>
          <CardTitle title={'Course General Info'} id={projectId} refetch={refetch} />
          <CourseInfo courseData={data} onChange={onChange}/>
        </Space>
      </AsnCard>
    </CourseInfoWrapper>
  );
};

export default CourseInformation;
