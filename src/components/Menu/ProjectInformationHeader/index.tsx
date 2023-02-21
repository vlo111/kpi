import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Badge, Divider, Typography } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import { PATHS } from '../../../helpers/constants';
import { IInfoHeader } from '../../../types/global';
import { ReactComponent as WarningSvg } from '../../../assets/icons/project-warning.svg';
import { ReactComponent as PeopleSvg } from '../../../assets/icons/people.svg';
import Icon from '@ant-design/icons';

const AntBadge = styled(Badge)`
  .ant-badge-status-text {
    font-size: var(--base-font-size);
  }
  .ant-badge-status-dot {
    width: 10px;
    height: 10px;
  }
`;

const AntDivider = styled(Divider)`
  &.ant-divider-vertical {
    border-left: 2px solid var(--dark-border-ultramarine);
    height: 20px;
    top: 0;
  }
`;

const AntIcon = styled(Icon)`
  &.anticon {
    vertical-align: -0.225em;
    font-size: var(--font-size-base-medium);
  }
`;
const AntCol = styled(Col)`
  color: var(--dark-border-ultramarine);
  font-size : var(--headline-font-size);
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const { Text } = Typography;
const ProjectInformationHeader: React.FC<IInfoHeader> = ({
  overview,
  project,
  padding,
  activity,
  region,
  inputActivityId
}) => {
  const navigate = useNavigate();

  return (
    <Row style={{ padding }}>
      <Col span={24}>
        <Row gutter={[16, 0]}>
          <AntCol
            span={4}
          >
            {project?.title ?? activity?.title}
          </AntCol>
          <Col span={14} offset={1} style={{ color: 'var(--dark-1)' }}>
            {project?.description ?? activity?.data?.description}
            <Row align="middle" style={{ marginTop: '20px' }}>
              <Col>
                <AntBadge
                  color={activity?.status === 'INACTIVE'
                    ? 'var(--dark-4)'
                    : activity?.status === 'ACTIVE'
                      ? 'var(--primary-light-orange)'
                      : 'var(--secondary-green)'
                  }
                  text={activity?.status ?? 'Active'}
                />
                <AntDivider type="vertical" />
              </Col>
              {overview === true
                ? (
                  <>
                    <Col style={{ fontSize: 'var(--base-font-size)' }}>
                      {moment(project?.startDate).format('DD/MM/YYYY')} -
                      {moment(project?.endDate).format('DD/MM/YYYY')}
                      <AntDivider type="vertical" />
                    </Col>
                    <Col>
                      <AntIcon component={PeopleSvg} />
                      <Text
                        underline={true}
                        style={{
                          fontSize: 'var(--base-font-size)',
                          marginLeft: '8px'
                        }}
                      >
                        1
                      </Text>
                      <AntDivider type="vertical" />
                    </Col>
                    {project?.status !== 'DRAFT' && project?.id != null && (
                      <Col>
                        <AntIcon
                          component={WarningSvg}
                          onClick={() =>
                            navigate(
                              `/${PATHS.PROJECTINFORMATION}`.replace(
                                ':id',
                                project?.id
                              )
                            )
                          }
                        />
                      </Col>
                    )}
                  </>
                  )
                : (
                  <>
                    <Col style={{ fontSize: 'var(--base-font-size)' }}>
                      {moment(activity.data?.startDate).format(
                        'DD/MM/YYYY'
                      )}{' '}
                      -{' '}
                      {moment(activity?.data?.endDate).format(
                        'DD/MM/YYYY'
                      )}
                      <AntDivider type="vertical" />
                    </Col>
                    <Col style={{ marginRight: '8px' }}>
                      {region?.title}
                    </Col>
                    <Col>
                      <AntIcon
                        component={WarningSvg}
                        onClick={() => {
                          if (inputActivityId != null) {
                            navigate(
                              `/${PATHS.COURSEINFORMATION}`.replace(
                                ':id',
                                inputActivityId
                              )
                            );
                          }
                        }
                        }
                      />
                    </Col>
                  </>
                  )}
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
export default ProjectInformationHeader;
