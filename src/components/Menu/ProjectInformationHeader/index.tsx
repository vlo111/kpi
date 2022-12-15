import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { Col, Row, Breadcrumb, Badge, Divider, Typography } from 'antd';
import Icon from '@ant-design/icons';

import { IInfoHeader } from '../../../types/global';
import { ReactComponent as WarningSvg } from '../../../assets/icons/project-warning.svg';
import { ReactComponent as PeopleSvg } from '../../../assets/icons/people.svg';

const AntBadge = styled(Badge)`
 .ant-badge-status-text{
  font-size: var(--base-font-size);
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
  font-size:var(--font-size-base-medium);
}
`;
const { Text } = Typography;
const ProjectInformationHeader: React.FC<IInfoHeader> = ({ overview, project }) => {
  return (
    <Row style={{ padding: '40px' }}>
      <Col span={24}>
        {(overview === false) &&
          <Breadcrumb separator=">" style={{ marginBottom: '4vh' }}>
            <Breadcrumb.Item>Objective 1</Breadcrumb.Item>
            <Breadcrumb.Item>Activity 1.3</Breadcrumb.Item>
            <Breadcrumb.Item>PYTHON COURSE</Breadcrumb.Item>
          </Breadcrumb>
        }
        <Row gutter={[16, 0]}>
          <Col span={4} style={{ color: 'var(--dark-border-ultramarine)', fontSize: 'var(--headline-font-size)' }}> {project?.title}</Col>
          <Col span={14} offset={1} style={{ color: 'var(--dark-1)' }}>
            {project?.description}
            <Row align='middle' style={{ marginTop: '20px' }}>
              <Col>
                <AntBadge color="var(--secondary-green)" text="Active" />
                <AntDivider type='vertical' />
              </Col>
              <Col style={{ fontSize: 'var(--base-font-size)' }}>
                {moment(project?.startDate).format('DD/MM/YYYY')} - {moment(project?.endDate).format('DD/MM/YYYY')}
                <AntDivider type='vertical' />
              </Col>
              <Col>
                <AntIcon component={PeopleSvg} />
                <Text underline={true} style={{ fontSize: 'var(--base-font-size)', marginLeft: '8px' }}>1</Text>
                <AntDivider type='vertical' />
              </Col>
              {project?.status !== 'DRAFT' && <Col>
                <AntIcon component={WarningSvg} />
              </Col>}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default ProjectInformationHeader;
