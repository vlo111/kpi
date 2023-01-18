import React from 'react';
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
  const { id: subActivityId } = useParams<{ id: any }>();
  const { data } = GetSingleSubActivity(subActivityId, { courseInfo: true }, {});

  return (
    <CourseInfoWrapper>
      <AsnBreadcrumb
        routes={[
          {
            path: '/project/sub-activity/:id1',
            breadcrumbName: 'Activity 1.3'
          },
          {
            path: '/project/sub-activity/:id2',
            breadcrumbName: 'Activity 1.3'
          },
          {

            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            path: `/project/sub-activity/${data?.sectionsData[0]?.id}`,
            breadcrumbName: data?.sectionsData[0]?.title
          },
          {
            path: '',
            breadcrumbName: 'COURSE INFORMATION'
          }
        ]}
      />
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
          <CardTitle title={'General Info'} id={data?.sectionsData[0]?.id} />
          <CourseInfo courseData={data}/>
        </Space>
      </AsnCard>
    </CourseInfoWrapper>
  );
};

export default CourseInformation;
