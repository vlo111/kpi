import React from 'react';
import { Row, Col } from 'antd';
// import { GeneralInfoProps } from '../../../../../types/project';
// import { ReactComponent as DateSvg } from './../../assets/icons/date.svg';

const GeneralInfo: React.FC = () => {
  return (
        <Row>
          <Col xl={2} lg={3} xs={4} offset={5} style={{ fontSize: 'var(--base-font-size)' }}>title</Col>
          {/* {title.includes('Date') && <Col><DateSvg style={{ marginRight: '10px' }} /></Col>} */}
          <Col span={12} style={{ fontSize: 'var(--base-font-size)' }}>
          description
          </Col>
        </Row>
  );
};

export default GeneralInfo;
