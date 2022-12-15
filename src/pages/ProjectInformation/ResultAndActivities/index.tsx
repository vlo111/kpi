import React from 'react';
import { Row, Col, Divider } from 'antd';
import styled from 'styled-components';
// import { ResultAndActivitiesProps } from '../../../../../types/project';

const DividerAnt = styled(Divider)`
    border-left: 1px solid var(--dark-1);
    height: 100%;
    width: 0;
    margin: 0;
    vertical-align: baseline;
    top: 0;
`;

const ResultAndActivities: React.FC<{ code: string, target: string, statement: string, divider: boolean }> = ({ code, statement, target, divider }) => {
  return (
        <Row gutter={[16, 0]}>
          <Col style={{ padding: '0' }} offset={1}>{divider && <DividerAnt type='vertical' />}</Col>
            <Col offset={4} style={ { fontSize: 'var(--base-font-size)', width: '110px' } }>{code}</Col>
            <Col span={12} style={{ paddingBottom: '16px', fontSize: 'var(--base-font-size)' }} >{statement}</Col>
            <Col span={2} style={ { fontSize: 'var(--base-font-size)' } }>{target}</Col>
        </Row>
  );
};

export default ResultAndActivities;
