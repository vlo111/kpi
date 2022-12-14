import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';
// import { ReactComponent as EditSvg } from '../../../../../assets/icons/edit.svg';

const Title = styled.div`
  font-weight:var(--font-normal);
  font-size: var(--headline-font-size);
  line-height: 25px;
  color: var(--dark-border-ultramarine);
`;

const CardTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
        <Row align='bottom' gutter={[10, 0]} style={{ marginBottom: '32px' }}>
        <Col>
          <Title>{title}</Title>
        </Col>
        <Col>
          {/* <EditSvg style={ { cursor: 'pointer' }} /> */}
        </Col>
      </Row>
  );
};

export default CardTitle;
