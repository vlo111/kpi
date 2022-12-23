import React from 'react';
import { Badge, Breadcrumb, Col, Space, Typography } from 'antd';
import styled from 'styled-components';

import { ReactComponent as WarningSvg } from '../../../../assets/icons/project-warning.svg';
import AsnBreadcrumb from '../../../Forms/Breadcrumb';

const HeaderWrapper = styled(Col)`
  .ant-badge-status-dot {
    width: 10px;
    height: 10px;
  }
  .info_icon {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .active_badge {
    .ant-badge-status-text {
      color: var(--dark-1);
      font-size: var(--base-font-size) !important;
    }
  }
`;

const SubActivityHeader: React.FC = () => {
  const { Paragraph, Title } = Typography;

  return (
    <HeaderWrapper>
      <AsnBreadcrumb
        routes={[
          {
            path: 'Objective 1',
            breadcrumbName: 'Activity 1.3'
          },
          {
            path: '',
            breadcrumbName: 'Activity 1.3'
          },
          {
            path: '',
            breadcrumbName: 'PYTHON COURSE'
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
          PYTHON COURSE
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
            <Breadcrumb.Item>10/05/2022 - 10/05/2022</Breadcrumb.Item>
            <Breadcrumb.Item>Shirak marz</Breadcrumb.Item>
            <Breadcrumb.Item className="info_icon">
              <WarningSvg />
            </Breadcrumb.Item>
          </Breadcrumb>
        </Space>
      </Space>
    </HeaderWrapper>
  );
};

export default SubActivityHeader;
