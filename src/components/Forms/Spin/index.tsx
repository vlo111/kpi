import React from 'react';
import { Spin, Row, Col } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 80, color: 'var(--dark-border-ultramarine)' }} spin />;

const AsnSpin: React.FC = () => {
  return (
        <Row align="middle" justify='center' style={{ height: '100%' }}>
            <Col><Spin indicator={antIcon} /></Col>
        </Row>
  );
};

export default AsnSpin;
