import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Badge, Breadcrumb, Col, Space, Typography } from 'antd';
import styled from 'styled-components';

import { ReactComponent as WarningSvg } from '../../../../assets/icons/project-warning.svg';
import AsnBreadcrumb from '../../../Forms/Breadcrumb';
import { PATHS } from '../../../../helpers/constants';
import moment from 'moment';

const HeaderWrapper = styled(Col)`
  .ant-badge-status-dot {
    width: 10px;
    height: 10px;
  }
  .info_icon {
    display: flex;
    align-items: center;
    height: 100%;
    &:hover {
      cursor: pointer;
    }
  }
  .active_badge {
    .ant-badge-status-text {
      color: var(--dark-1);
      font-size: var(--base-font-size) !important;
    }
  }
`;

const SubActivityHeader: React.FC<any> = ({ activity }) => {
  const { Paragraph, Title } = Typography;

  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <AsnBreadcrumb
        routes={[
          {
            path: '',
            breadcrumbName: 'Activity 1'
          },
          {
            path: '',
            breadcrumbName: 'Activity 1.3'
          },
          {
            path: '',
            breadcrumbName: 'It'
          }
        ]}
      />
      <Space direction="horizontal" align="baseline">
        <Title
          level={4}
          style={{
            color: 'var(--dark-border-ultramarine)',
            fontWeight: 'var(--font-normal)',
            marginRight: '8vw'
          }}
        >
          {activity?.sector?.title}
        </Title>
        <Space direction="vertical">
          <Paragraph
            ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}
            style={{ color: 'var(--dark-1)', maxWidth: '44vw' }}
          >
            Includes procedural and data abstractions, program design,
            debugging, testing, and documentation. Covers data types, control
            structures, functions, parameter passing, library functions, arrays,
            inheritance and object oriented design. Laboratory exercises in
            Python.
          </Paragraph>
          <Breadcrumb
            separator="|"
            style={{
              color: 'var(--dark-1)',
              fontSize: 'var(--base-font-size)'
            }}
          >
            <Breadcrumb.Item className="active_badge">
              <Badge color="var(--secondary-green)" text="Active" />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {moment(activity?.sectionsData[0].data?.startDate).format(
                'DD/MM/YYYY'
              )}{' '}
              -{' '}
              {moment(activity?.sectionsData[0].data?.endDate).format(
                'DD/MM/YYYY'
              )}
            </Breadcrumb.Item>
            <Breadcrumb.Item>{activity?.region?.title}</Breadcrumb.Item>
            <Breadcrumb.Item
              className="info_icon"
              onClick={() =>
                navigate(
                  `/${PATHS.COURSEINFORMATION}`.replace(':id', 'testId123344')
                )
              }
            >
              <WarningSvg />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Space>
      </Space>
    </HeaderWrapper>
  );
};

export default SubActivityHeader;
