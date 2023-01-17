import React from 'react';
import { Col, Row, Space } from 'antd';

import SubActivityDocuments from '../DocumentsContent';
import SubActivityUsersInfo from '../UsersInfo';
import SubActivityUsersFullInfo from '../ApplicantFullInfo';

const DefaultContent: React.FC<any> = ({
  manager,
  status,
  requIredDocs,
  color,
  applicants
}) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 32]}>
      <Row gutter={32}>
        <Col span={12}>
          <SubActivityDocuments
            requIredDocs={requIredDocs}
            color={color}
            status={status}
          />
        </Col>
        <Col span={12}>
          <SubActivityUsersInfo manager={manager} color={color} />
        </Col>
      </Row>
      <Col>
        {status === 'ACTIVE' && <SubActivityUsersFullInfo color={color} applicants={applicants}/>}
      </Col>
    </Space>
  );
};

export default DefaultContent;
