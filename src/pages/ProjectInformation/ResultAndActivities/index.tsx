import React from 'react';
import { Row, Col, Divider } from 'antd';
import styled from 'styled-components';

import { IProjectExpectedResults } from '../../../types/project';

const DividerAnt = styled(Divider)`
    border-left: 1px solid var(--dark-1);
    height: 100%;
    width: 0;
    margin: 0;
    vertical-align: baseline;
    top: 0;
`;

const AntCol = styled(Col)`
  font-size: var(--base-font-size);
`;

const ResultAndActivities: React.FC<IProjectExpectedResults> = ({ code, statement, target, divider }) => {
  return (
        <Row gutter={[16, 0]}>
          <Col style={{ padding: '0' }} offset={1}>{(Boolean(divider)) && <DividerAnt type='vertical' />}</Col>
            <AntCol sm={{ offset: 1 }} md={{ offset: 4 }} style={ { width: '110px' } }>{code}</AntCol>
            <AntCol span={12} style={{ paddingBottom: '16px' }} >{statement}</AntCol>
            <AntCol span={2}>{target}</AntCol>
        </Row>
  );
};

export default ResultAndActivities;
