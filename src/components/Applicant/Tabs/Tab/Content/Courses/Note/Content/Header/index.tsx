import React from 'react';
import styled from 'styled-components';
import { Col, Row as AntRow, Typography } from 'antd';
import { ReactComponent as CloseIcon } from '../../../../../../../../../assets/icons/closeIcon.svg';

const { Title } = Typography;

const Row = styled(AntRow)`
  width: 300px;

  .title {
    font-weight: var(--font-normal);
    color: var(--dark-border-ultramarine);
  }
`;

export const Header: React.FC<{ onClose: (close: boolean) => void }> = ({ onClose }) => {
  return (
    <Row style={{ justifyContent: 'space-between' }}>
      <Col span={22}>
        <Title level={4} className="title">
          Notes
        </Title>
      </Col>
      <Col>
        <a onClick={() => onClose(false)}>
          <CloseIcon />
        </a>
      </Col>
    </Row>
  );
};
