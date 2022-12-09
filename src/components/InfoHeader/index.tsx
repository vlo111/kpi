import React from 'react';
import styled from 'styled-components';
import { Col, Row, Breadcrumb, Badge, Divider, Typography } from 'antd';
import Icon from '@ant-design/icons';

import { IProjectOverview } from '../../types/project';
import { ReactComponent as WarningSvg } from '../../assets/icons/projectWarning.svg';
import { ReactComponent as PeopleSvg } from '../../assets/icons/people.svg';

const AntBadge = styled(Badge)`
 .ant-badge-status-text{
  font-size: 16px;
 }
 .ant-badge-status-dot{
  width: 10px;
  height: 10px;
 }
`;

const AntDivider = styled(Divider)`
  &.ant-divider-vertical{
    border-left: 2px solid var(--dark-border-ultramarine);
    height:20px;
    top: 0;
  }
`;

const AntIcon = styled(Icon)`
&.anticon{
  vertical-align: -0.225em;
 font-size:17px;
}
`;
const { Text } = Typography;
const SubActivityHeader: React.FC<IProjectOverview> = ({ overview }) => {
  return (
    <Row style={{ padding: '20px' }}>
      <Col>
      {(overview === false) &&
      <Breadcrumb separator=">" style={{ marginBottom: '4vh' }}>
          <Breadcrumb.Item>Objective 1</Breadcrumb.Item>
          <Breadcrumb.Item>Activity 1.3</Breadcrumb.Item>
          <Breadcrumb.Item>PYTHON COURSE</Breadcrumb.Item>
        </Breadcrumb>
        }
        <Row gutter={[16, 0]}>
          <Col span={4} style={{ color: 'var(--dark-border-ultramarine)', fontSize: 'var(--headline-font-size)' }}> PYTHON COURSE</Col>
          <Col span={14} offset={1} style={{ color: 'var(--dark-1)' }}>
            Includes procedural and data abstractions, program design,
            debugging, testing, and documentation. Covers data types, control
            structures, functions, parameter passing, library functions, arrays,
            inheritance and object oriented design. Laboratory exercises in
            Python.
            <Row align='middle' style={{ marginTop: '20px' }}>
              <Col>
                <AntBadge color="var(--secondary-green)" text="Active" />
                <AntDivider type='vertical' />
              </Col>
              <Col style={{ fontSize: 'var(--base-font-size)' }}>
                10/05/2022 - 10/05/2022
                <AntDivider type='vertical' />
              </Col>
              <Col>
                <AntIcon component={PeopleSvg} />
                <Text underline={true} style={{ fontSize: 'var(--base-font-size)', marginLeft: '8px' }}>17</Text>
                <AntDivider type='vertical' />
              </Col>
              <Col>
                <AntIcon component={WarningSvg} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default SubActivityHeader;
