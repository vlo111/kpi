import React from 'react';
import { Col, Divider as AntDivider, Row as AntRow, Typography } from 'antd';
import styled from 'styled-components';
import AsnAvatar from '../../components/Forms/Avatar';
import ApplicantTabs from './Status';
import { useParams } from 'react-router-dom';
import useGetApplicant from '../../api/Applicant/useGetApplicant';
import { ApplicantInfo } from '../../helpers/constants';
import moment from 'moment';

interface ApplicantRow {
  children: React.ReactNode
  width?: number
  height?: number
  style?: any
}

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

const setValue: (key: string, value: string | undefined) => JSX.Element = (
  key,
  value = ''
) => (
  <AntRow>
    <Col span={10}>
      <strong>{key}:</strong>
    </Col>
    <Col span={10}>
      <p>{value}</p>
    </Col>
  </AntRow>
);

const Applicant: React.FC<{ applicantId?: string | undefined }> = ({ applicantId }) => {
  const { id } = useParams();

  const { applicant: { applicant, courses } = {} } = useGetApplicant(id ?? applicantId);

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
      {setValue(ApplicantInfo.PaidJob, '-')}
      {setValue(ApplicantInfo.WorkOrganisation, applicant?.workOrganization)}
      <AntTitle level={4}>{ApplicantInfo.OtherInfoTitle}</AntTitle>
      {setValue(ApplicantInfo.VulnerabilityType, applicant?.vulnerabilities)}
      {setValue(ApplicantInfo.CourseSource, '-')}
    </>
  );

  return (
    <Row height={100} style={{ padding: '2rem 4rem' }} gutter={[0, 32]}>
      <Row>
      {Boolean(id) &&
        <Col>
          <InfoRow>
            <Col className="path">
              <p>
                {'Objective 1 > Activity 1.3 > Python Course > Applicants >'}
              </p>
              <p>{applicant?.fullName}</p>
            </Col>
          </InfoRow>
        </Col>}
      </Row>
      <Row>
        <ApplicantProfile span={24}>
          <Row gutter={10} style={{ padding: '1rem' }}>
            <Col span={8} style={{ height: '60%' }}>
              <InfoRow>
                <Col span={24}>
                  <AsnAvatar size={80} letter={'VV'} />
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
          <ApplicantTabs applicant={applicant?.fullName ?? ''} courses={courses} />
        </Col>
      </Row>
    </Row>
  );
};

export default Applicant;
