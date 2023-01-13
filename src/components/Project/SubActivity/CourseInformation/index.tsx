import React from 'react';
import { Row, Col, Space } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import { ReactComponent as DateSvg } from '../../../../assets/icons/date.svg';

const AntCol = styled(Col)`
 font-size: var(--base-font-size);
 width: 210px;
`;

const CourseInfo: React.FC<any> = ({ courseData }) => {
  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Title</AntCol>
          <AntCol span={12}>{courseData?.sectionsData[0]?.title}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Organization</AntCol>
          <AntCol span={12}>{courseData?.organization?.title}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Description</AntCol>
          <AntCol span={12}>{courseData?.sectionsData[0]?.data?.description}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Sub-Activity Manager</AntCol>
          <AntCol span={12}>{courseData?.manager?.firstName} {courseData?.manager?.lastName}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Sector</AntCol>
          <AntCol span={12}>{courseData?.sector?.title}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Region</AntCol>
          <AntCol span={12}>{courseData?.region?.title}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Start Date</AntCol>
          <Col><DateSvg style={{ marginRight: '10px' }} /></Col>
          <AntCol span={12}> {moment(courseData?.sectionsData[0]?.data?.startDate).format('DD/MM/YYYY')}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>End Date</AntCol>
          <Col><DateSvg style={{ marginRight: '10px' }} /></Col>
          <AntCol span={12}>{moment(courseData?.sectionsData[0]?.data?.endDate).format('DD/MM/YYYY')}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Teaching Mode</AntCol>
          <AntCol span={12}>ONLINE</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Partner organization</AntCol>
          <AntCol span={12}>CIVITTA</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Duration</AntCol>
          <AntCol span={12}>36(Technical skills 30 hr/Soft skills 6 hr)</AntCol>
        </Row>
      </Space>
    </>
  );
};

export default CourseInfo;
