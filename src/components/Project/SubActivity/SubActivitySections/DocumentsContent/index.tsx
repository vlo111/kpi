import React from 'react';
import { Col, Row, Space } from 'antd';

import DraggerForm from '../SubActivityForms/Dragger';
import FormWrapper from '../../SubActivityWrapper';

const SubActivityDocuments: React.FC<any> = ({
  requIredDocs,
  color,
  status
}) => {
  return (
    <FormWrapper className="documents_info" color={color}>
      <DraggerForm text="File/Documents" disabled={status === 'INACTIVE'} />
      {requIredDocs.length >= 1 && (
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
            style={{
              fontSize: 'var(--base-font-size)',
              color: 'var(--dark-2)'
            }}
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
          {requIredDocs?.map((doc: { title: string, count: number }) => (
            <Row
              align="middle"
              justify="space-between"
              style={{ color: 'var(--dark-4)' }}
              key={doc.title}
            >
              <Col style={{ textAlign: 'start' }} span={8}>
                {doc.title}
              </Col>
              <Col style={{ textAlign: 'center' }} span={8}>
                {doc.count}
              </Col>
              <Col style={{ textAlign: 'center' }} span={8}>
                0
              </Col>
            </Row>
          ))}
        </Space>
      )}
      {requIredDocs.length === 0 &&
        <Space direction='vertical' style={{ width: '100%' }}>
          <Col style={{ width: '100%' }}>

          </Col>
          <Col style={{ width: '100%' }}>
            No files attached
          </Col>
        </Space>
      }
    </FormWrapper>
  );
};

export default SubActivityDocuments;
