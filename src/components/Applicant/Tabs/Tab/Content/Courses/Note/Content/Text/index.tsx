import React from 'react';
import { Col, Row } from 'antd';

export const Text: React.FC<{
  text: string
}> = ({ text }) => {
  return (
    <Row>
      <Col span={4}>Note:</Col>
      <Col>{text}</Col>
    </Row>
  );
};
