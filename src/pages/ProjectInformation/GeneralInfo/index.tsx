import React from 'react';
import { Row, Col, Space } from 'antd';
import moment from 'moment';

import { IGeneralInfoProps } from '../../../types/project';
import { ReactComponent as DateSvg } from '../../../assets/icons/date.svg';

const GeneralInfo: React.FC<IGeneralInfoProps> = ({ title, description, startDate, endDate }) => {
  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Row>
          <Col sm={{ offset: 2 }} md={{ offset: 5 }} style={{ fontSize: 'var(--base-font-size)', width: '110px' }}>Title</Col>
          <Col span={12} style={{ fontSize: 'var(--base-font-size)' }}>{title}</Col>
        </Row>
        <Row>
          <Col sm={{ offset: 2 }} md={{ offset: 5 }} style={{ fontSize: 'var(--base-font-size)', width: '110px' }}>Description</Col>
          <Col span={12} style={{ fontSize: 'var(--base-font-size)' }}>{description}</Col>
        </Row>
        <Row>
          <Col sm={{ offset: 2 }} md={{ offset: 5 }} style={{ fontSize: 'var(--base-font-size)', width: '110px' }}>Start Date</Col>
          <Col><DateSvg style={{ marginRight: '10px' }} /></Col>
          <Col span={12} style={{ fontSize: 'var(--base-font-size)' }}> {moment(startDate).format('DD/MM/YYYY')}</Col>
        </Row>
        <Row>
          <Col sm={{ offset: 2 }} md={{ offset: 5 }} style={{ fontSize: 'var(--base-font-size)', width: '110px' }}>End Date</Col>
          <Col><DateSvg style={{ marginRight: '10px' }} /></Col>
          <Col span={12} style={{ fontSize: 'var(--base-font-size)' }}>{moment(endDate).format('DD/MM/YYYY')}</Col>
        </Row>
      </Space>
    </>
  );
};

export default GeneralInfo;
