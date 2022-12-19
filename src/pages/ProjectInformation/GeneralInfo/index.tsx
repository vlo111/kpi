import React from 'react';
import { Row, Col, Space } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import { IGeneralInfoProps } from '../../../types/project';
import { ReactComponent as DateSvg } from '../../../assets/icons/date.svg';

const AntCol = styled(Col)`
 font-size: var(--base-font-size);
  width: 110px;
`;

const GeneralInfo: React.FC<IGeneralInfoProps> = ({ title, description, startDate, endDate }) => {
  return (
    <>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Title</AntCol>
          <AntCol span={12}>{title}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Description</AntCol>
          <AntCol span={12}>{description}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>Start Date</AntCol>
          <Col><DateSvg style={{ marginRight: '10px' }} /></Col>
          <AntCol span={12}> {moment(startDate).format('DD/MM/YYYY')}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>End Date</AntCol>
          <Col><DateSvg style={{ marginRight: '10px' }} /></Col>
          <AntCol span={12}>{moment(endDate).format('DD/MM/YYYY')}</AntCol>
        </Row>
      </Space>
    </>
  );
};

export default GeneralInfo;
