import React from 'react';
import { Col, Row, Space } from 'antd';

import SubActivityDocuments from '../DocumentsContent';
import SubActivityUsersInfo from '../UsersInfo';
import SubActivityUsersFullInfo from '../ApplicantFullInfo';

const DefaultContent: React.FC<any> = ({
  assignedUsers,
  status,
  requIredDocs,
  color,
  applicants,
  courseId,
  navigateRouteInfo,
  files,
  setOffset,
  offset,
  applicantCounts,
  isLoading,
  setSearch,
  search
}) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 32]}>
      <Row gutter={32}>
        <Col span={12}>
          <SubActivityDocuments
            requIredDocs={requIredDocs}
            color={color}
            courseId={courseId}
            status={status}
            files={files}
          />
        </Col>
        <Col span={12}>
          <SubActivityUsersInfo assignedUsers={assignedUsers} color={color} requIredDocs={requIredDocs.length >= 1} />
        </Col>
      </Row>
      <Col>
        {(status === 'ACTIVE' || status === 'DONE' || applicants?.length > 0) && <SubActivityUsersFullInfo
          setOffset={setOffset}
          navigateRouteInfo={navigateRouteInfo}
          status={status}
          color={color}
          applicants={applicants}
          courseId={courseId}
          offset={offset}
          applicantCounts={applicantCounts}
          isLoading={isLoading}
          setSearch={setSearch}
          search={search}
        />}
      </Col>
    </Space>
  );
};

export default DefaultContent;
