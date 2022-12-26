import React from 'react';
import { Col, Row, Space } from 'antd';

import SubActivityDocuments from '../DocumentsContent';
import SubActivityUsersInfo from '../UsersInfo';
import SubActivityUsersFullInfo from '../ApplicantFullInfo';

const DefaultContent: React.FC<any> = ({ manager, status }) => {
  return (
    <Space direction="vertical" style={{ width: '100%' }} size={[0, 32]}>
      <Row gutter={32}>
        <Col span={12}>
          <SubActivityDocuments />
        </Col>
        <Col span={12}>
          <SubActivityUsersInfo manager={manager} />
        </Col>
      </Row>
      <Col>
        {status === 'ACTIVE' && <SubActivityUsersFullInfo />}
      </Col>
    </Space>
  );
};

export default DefaultContent;
