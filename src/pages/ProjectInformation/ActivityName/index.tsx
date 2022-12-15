import React from 'react';
import { Row, Col, Divider } from 'antd';
import styled from 'styled-components';
// import { ActivityNameProps } from '../../../../../types/project';

const DividerAnt = styled(Divider)`
    border-left: 1px solid var(--dark-1);
    border-top: 1px solid var(--dark-1);
    height: 100%;
    width: 24px;
    margin: 0;
    padding: 0;
    top: 0;
`;
const isDivider = {
  marginBottom: '16px',
  fontSize: 'var(--base-font-size)'
};
const noDivider = {
  marginBottom: '16px',
  paddingLeft: '32px',
  fontSize: 'var(--base-font-size)'
};
const ActivityName: React.FC<{ activityName: string, divider: boolean, count: boolean }> = ({ activityName, divider, count }) => {
  return (
    <Row gutter={[16, 0]}>
      <Col style={{ padding: '0' }} offset={1}>{divider && <DividerAnt type='vertical' style={count ? { borderLeft: 'none' } : {}} />}</Col>
      <Col offset={1} style={!divider ? { ...noDivider } : { ...isDivider }}>
        {activityName}
      </Col>
    </Row>
  );
};

export default ActivityName;
