import React from 'react';
import { Space, Typography } from 'antd';

import { AsnCard } from '../../components/Forms/Card';
import CardTitle from '../ProjectInformation/CardTitle';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
import styled from 'styled-components';

const CourseInfoWrapper = styled.div`
  padding: 40px 32px 60px 32px;
`;

const CourseInformation: React.FC<{}> = () => {
  const { Title } = Typography;
  return (
    <CourseInfoWrapper>
      <AsnBreadcrumb
        routes={[
          {
            path: '/project/sub-activity/:id',
            breadcrumbName: 'Activity 1.3'
          },
          {
            path: '/project/sub-activity/:id',
            breadcrumbName: 'Activity 1.3'
          },
          {
            path: '/project/sub-activity/:id',
            breadcrumbName: 'PYTHON COURSE'
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
          <CardTitle title={'General Info'} id={'0dc9242a-7091-4b64-993b-aca6440c03cb'} />
          {/* <GeneralInfo
            title={project?.title}
            description={project?.description}
            startDate={project?.startDate}
            endDate={project?.endDate}
          /> */}
        </Space>
      </AsnCard>
    </CourseInfoWrapper>
  );
};

export default CourseInformation;
