import React from 'react';
import { Col, Row, Space } from 'antd';

export const Rejection: React.FC<{
  reasonsForRejection: string[]
}> = ({ reasonsForRejection }) => {
  return (
    <>
      <Space.Compact
        block
        style={{
          fontSize: '14px',
          color: 'var(--dark-2)',
          fontWeight: 'var(--font-bold)'
        }}
      >
        Reasons for rejection:
      </Space.Compact>
      <Row
        style={{
          width: '300px',
          margin: '0.3rem 1rem',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Col>
          <ul
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem'
            }}
          >
            {reasonsForRejection.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </Col>
      </Row>
    </>
  );
};
