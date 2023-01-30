import React from 'react';
import { Row, Col } from 'antd';
import { ReactComponent as NoResult } from '../UploadImg/noResult.svg';

const NoAttachments: React.FC = () => {
  return (
        <Row align="middle" justify="center" style={{ height: 'calc(100vh - 21vh)' }}>
        <Col>
          <Col>
            <NoResult />
          </Col>
          <Col>No attachments to show.</Col>
        </Col>
      </Row>
  );
};

export default NoAttachments;
