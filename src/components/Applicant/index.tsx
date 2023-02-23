import React from 'react';
import {
  Col,
  Divider as AntDivider,
  Row as AntRow,
  Typography,
  Spin
} from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';

import AsnAvatar from '../../components/Forms/Avatar';
import ApplicantTabs from './Status';
import useGetApplicant from '../../api/Applicant/useGetApplicant';
import { ApplicantInfo } from '../../helpers/constants';
import { ApplicantRow, IApplicantProps, SetValue } from '../../types/applicant';
import AsnBreadcrumb from '../Forms/Breadcrumb';
import { INavigateRoteInfoTypes } from '../../types/api/assessment';
import { useProject } from '../../hooks/useProject';

const Row = styled(AntRow)<ApplicantRow>`
  height: auto;
  width: ${(props) => `${props.width ?? 100}%`};
  min-height: 2.5rem;
`;

const ApplicantProfile = styled(Col)`
  background: var(--white);
  border-top: 3px solid var(--dark-border-ultramarine);
  box-shadow: var(--base-box-shadow);
  border-radius: 20px;

  .applicant-text {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`;

const Divider = styled(AntDivider)`
  border-color: var(--dark-border-ultramarine);
  height: auto;
`;

const { Title } = Typography;

const AntTitle = styled(Title)`
  font-weight: var(--font-normal) !important;
  color: var(--dark-border-ultramarine) !important;
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

const setValue: SetValue = (key, value = '') => (
  <AntRow>
    <Col span={10}>
      <strong>{key}:</strong>
    </Col>
    <Col span={10}>
      <p className="applicant-text" title={value}>
        {value}
      </p>
    </Col>
  </AntRow>
);

const Applicant: React.FC<IApplicantProps> = ({ applicantId }) => {
  const { id } = useParams();

  const { projectId }: { projectId: string } = useProject();

  const { state: { navigateRouteInfo } }: { state: { navigateRouteInfo: INavigateRoteInfoTypes } } = useLocation();

  const { applicant, courses, isLoading } =
    useGetApplicant(applicantId ?? id) ?? {};

  const getApplicantInfo = (
    <>
      <AntTitle level={4}>{ApplicantInfo.PersonalTitle}</AntTitle>
      {setValue(
        ApplicantInfo.Birthdate,
        moment(applicant?.dob).format('DD/MM/YYYY')
      )}
      {setValue(ApplicantInfo.Region, applicant?.region)}
      {setValue(ApplicantInfo.Community, applicant?.community)}
      {setValue(ApplicantInfo.Gender, applicant?.gender)}

      <AntTitle level={4}>{ApplicantInfo.EducationTitle}</AntTitle>
      {setValue(ApplicantInfo.Student, applicant?.student)}
      {setValue(ApplicantInfo.EducationLevel, applicant?.educationLevel)}
      {setValue(ApplicantInfo.PaidJob, applicant?.income)}
      {setValue(ApplicantInfo.Position, applicant?.position ?? '-')}
      {setValue(
        ApplicantInfo.WorkOrganisation,
        applicant?.workOrganisation ?? '-'
      )}

      <AntTitle level={4}>{ApplicantInfo.OtherInfoTitle}</AntTitle>
      {setValue(ApplicantInfo.VulnerabilityType, applicant?.vulnerabilities)}
      {setValue(ApplicantInfo.CourseSource, applicant?.informedAboutUs)}
    </>
  );

  const firstName = applicant?.fullName.charAt(0).toUpperCase() ?? '';

  const lastName = applicant?.fullName.split(' ')[1]?.charAt(0)?.toUpperCase() ?? '';

  return (
    <Spin spinning={isLoading}>
      <Row height={100} style={{ padding: '2rem 4rem' }} gutter={[0, 32]}>
        {applicantId === undefined && (
          <Row>
            <Col>
              <InfoRow>
                <Col className="path">
                  <p>
                    <AsnBreadcrumb
                      routes={[
                        {
                          path: `/project/overview/${projectId}`,
                          breadcrumbName: navigateRouteInfo.resultAreaTitle
                        },
                        {
                          path: `/project/overview/${projectId}`,
                          breadcrumbName: navigateRouteInfo.inputActivityTitle
                        },
                        {
                          path: `/project/sub-activity/${navigateRouteInfo.courseId}`,
                          breadcrumbName: navigateRouteInfo.courseTitle
                        },
                        {
                          path: '',
                          breadcrumbName: applicant?.fullName ?? ''
                        }
                      ]}
                    />
                  </p>
                </Col>
              </InfoRow>
            </Col>
          </Row>
        )}
        <Row>
          <ApplicantProfile span={24}>
            <Row gutter={10} style={{ padding: '1rem' }}>
              <Col span={8} style={{ height: '60%' }}>
                <InfoRow>
                  <Col span={24}>
                    <AsnAvatar letter={`${firstName}${lastName}`} />
                  </Col>
                  <Col span={24}>
                    <AntTitle level={4}>{applicant?.fullName}</AntTitle>
                  </Col>
                  <Col className="content" span={24}>
                    {applicant?.email}
                  </Col>
                  <Col className="content" span={24}>
                    {applicant?.phone}
                  </Col>
                </InfoRow>
              </Col>
              <Divider type={'vertical'} />
              <Col span={12}>{getApplicantInfo}</Col>
            </Row>
          </ApplicantProfile>
        </Row>
        <Row>
          <Col span={24}>
            {applicant !== undefined && courses !== undefined && (
              <ApplicantTabs
                applicant={applicant}
                courses={courses}
                applicantId={applicantId}
              />
            )}
          </Col>
        </Row>
      </Row>
    </Spin>
  );
};

export default Applicant;
