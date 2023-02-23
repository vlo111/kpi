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
  files
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
          <SubActivityUsersInfo assignedUsers={assignedUsers} color={color} />
        </Col>
      </Row>
      <Col>
        {(status === 'ACTIVE' || status === 'DONE' || applicants?.length > 0) && <SubActivityUsersFullInfo navigateRouteInfo={navigateRouteInfo} status={status} color={color} applicants={applicants} courseId={courseId} />}
      </Col>
    </Space>
  );
};

export default DefaultContent;
