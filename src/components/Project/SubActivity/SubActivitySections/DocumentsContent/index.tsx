import React from 'react';
import { Col, Row, Space } from 'antd';

import FormWrapper from '../../../../Forms/SubActivityWrapper';
import DraggerForm from '../SubActivityForms/Dragger';

const SubActivityDocuments: React.FC = () => {
  return (
    <FormWrapper className="documents_info">
      <DraggerForm text="File/Documents" />
      <Space
        direction="vertical"
        style={{
          width: '100%',
          borderBottom: '0.5px solid var(--dark-border-ultramarine)',
          padding: '16px 0'
        }}
      >
        <Row
          align="middle"
          justify="space-between"
          style={{ fontSize: 'var(--base-font-size)', color: 'var(--dark-2)' }}
        >
          <Col style={{ textAlign: 'start' }} span={8}>
            Required documents
          </Col>
          <Col style={{ textAlign: 'center' }} span={8}>
            Number
          </Col>
          <Col style={{ textAlign: 'end' }} span={8}>
            Downloaded
          </Col>
        </Row>
        <Row
          align="middle"
          justify="space-between"
          style={{ color: 'var(--dark-4)' }}
        >
          <Col style={{ textAlign: 'start' }} span={8}>
            Annual Report
          </Col>
          <Col style={{ textAlign: 'center' }} span={8}>
            2
          </Col>
          <Col style={{ textAlign: 'center' }} span={8}>
            0
          </Col>
        </Row>
        <Row
          align="middle"
          justify="space-between"
          style={{ color: 'var(--dark-4)' }}
        >
          <Col style={{ textAlign: 'start' }} span={8}>
            Photos
          </Col>
          <Col style={{ textAlign: 'center' }} span={8}>
            1
          </Col>
          <Col style={{ textAlign: 'center' }} span={8}>
            0
          </Col>
        </Row>
      </Space>
    </FormWrapper>
  );
};

export default SubActivityDocuments;
