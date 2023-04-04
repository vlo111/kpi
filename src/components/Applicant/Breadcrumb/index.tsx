import React from 'react';
import { Col, Row as AntRow } from 'antd';
import styled from 'styled-components';
import { ApplicantRow } from '../../../types/applicant';
import AsnBreadcrumb from '../../Forms/Breadcrumb';

interface IBreadcrumb {
  projectId: string
  state: {
    navigateRouteInfo: {
      resultAreaTitle: string
      inputActivityTitle: string
      courseId: string
      courseTitle: string
    }
  }
  applicantName: string
}

const Row = styled(AntRow)<ApplicantRow>`
  height: auto;
  width: 100%;
  min-height: 2.5rem;
`;

const InfoRow = styled(Row)`
  text-align: center;

  .title {
    color: var(--dark-border-ultramarine);
    font-size: 20px;
  }

  .content {
    color: var(--dark-2);
    font-size: 16px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  > .ant-col {
    margin: 5px;
  }

  .path {
    display: flex;

    &:first-child {
      color: #717986;
    }
  }
`;

const Applicant: React.FC<IBreadcrumb> = ({
  projectId,
  state,
  applicantName
}) => {
  const {
    navigateRouteInfo: {
      resultAreaTitle,
      inputActivityTitle,
      courseId,
      courseTitle
    }
  } = state;
  return (
    <Row>
      <Col>
        <InfoRow>
          <Col className="path">
            <p>
              <AsnBreadcrumb
                routes={[
                  {
                    path: `/project/overview/${projectId}`,
                    breadcrumbName: resultAreaTitle
                  },
                  {
                    path: `/project/overview/${projectId}`,
                    breadcrumbName: inputActivityTitle
                  },
                  {
                    path: `/project/sub-activity/${courseId}`,
                    breadcrumbName: courseTitle
                  },
                  {
                    path: '',
                    breadcrumbName: applicantName
                  }
                ]}
              />
            </p>
          </Col>
        </InfoRow>
      </Col>
    </Row>
  );
};

export default Applicant;
