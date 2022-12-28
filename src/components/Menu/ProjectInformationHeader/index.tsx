import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Badge, Divider, Typography } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import AsnBreadcrumb from '../../Forms/Breadcrumb';
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
const { Text } = Typography;
const ProjectInformationHeader: React.FC<IInfoHeader> = ({
  overview,
  project,
  padding,
  activity
}) => {
  console.log(activity?.sectionsData[0]?.title);
  const navigate = useNavigate();
  console.log(overview === true);

  return (
    <Row style={{ padding }}>
      <Col span={24}>
        {overview === false && (
          <AsnBreadcrumb
            routes={[
              {
                path: '/project/sub-activity/:id1',
                breadcrumbName: 'Activity 1'
              },
              {
                path: '/project/sub-activity/:id2',
                breadcrumbName: 'Activity 1.3'
              },
              {
                path: '',
                breadcrumbName: activity?.sectionsData[0]?.title
              }
            ]}
          />
        )}
        <Row gutter={[16, 0]}>
            <Col
              span={4}
              style={{
                color: 'var(--dark-border-ultramarine)',
                fontSize: 'var(--headline-font-size)'
              }}
            >
              {project?.title ?? activity?.sectionsData[0]?.title}
            </Col>
          <Col span={14} offset={1} style={{ color: 'var(--dark-1)' }}>
            { project?.description ?? activity?.sectionsData[0]?.data?.description}
            <Row align="middle" style={{ marginTop: '20px' }}>
              <Col>
                <AntBadge color="var(--secondary-green)" text="Active" />
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
                    {moment(activity?.sectionsData[0]?.data?.startDate).format(
                      'DD/MM/YYYY'
                    )}{' '}
                    -{' '}
                    {moment(activity?.sectionsData[0]?.data?.endDate).format(
                      'DD/MM/YYYY'
                    )}
                    <AntDivider type="vertical" />
                  </Col>
                  <Col style={{ marginRight: '8px' }}>
                    {activity?.region?.title}
                  </Col>
                  <Col>
                    <AntIcon
                      component={WarningSvg}
                      onClick={() =>
                        navigate(
                          `/${PATHS.COURSEINFORMATION}`.replace(
                            ':id',
                            activity?.id
                          )
                        )
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
