import React, { useEffect, useState } from 'react';
import {
  Col,
  Divider as AntDivider,
  Row as AntRow,
  Typography
} from 'antd';
import styled from 'styled-components';
import AsnAvatar from '../../components/Forms/Avatar';
import ApplicantTabs from './Status';
import { IApplicant } from '../../types/applicant';

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

const setValue: (key: string, value: string) => JSX.Element = (key, value) => (
  <AntRow>
    <Col span={10}>
      <strong>{key}:</strong>
    </Col>
    <Col span={10}>
      <p>{value}</p>
    </Col>
  </AntRow>
);

const Applicant: React.FC = () => {
  const [applicant, setApplicant] = useState<IApplicant>();

  useEffect(() => {
    setApplicant({
      id: '123456',
      fullName: 'Volodya Vardanyan',
      phone: '+374 95888888',
      email: 'volodya.vardanyan.93i@gmail.com',
      dob: 'string',
      region: 'Shirak',
      community: 'string',
      gender: 'male',
      student: 'yes',
      studyType: 'string',
      educationLevel: 'string',
      profession: 'string',
      position: 'developer',
      income: 'string',
      workOrganization: 'analysed',
      vulnerabilities: 'string',
      informedAboutUs: 'course training'
    });
  }, []);

  return (
    <Row height={100} style={{ padding: '2rem 4rem' }} gutter={[0, 32]}>
      <Row>
        <Col>
          <InfoRow>
            <Col className="path">
              <p>
                {'Objective 1 > Activity 1.3 > Python Course > Applicants >'}
              </p>
              <p>{` ${applicant?.fullName ?? ''}`}</p>
            </Col>
          </InfoRow>
        </Col>
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
            <Col span={12}>
              <AntTitle level={4}>Personal details/Անձնական տվյալներ</AntTitle>
              {setValue('Birthdate', '26.05.95')}
              {setValue('Region', 'Shirak')}
              {setValue('Community', 'Դրախտիկ/input area')}
              {setValue('Gender', 'Female')}
              <AntTitle level={4}>
                Education & Work/Կրթություն և աշխատանք
              </AntTitle>
              {setValue('Student', 'Nonstudent')}
              {setValue('Education level', 'Middle school')}
              {setValue('Paid job', 'No')}
              {setValue('Work Organisation', '-')}
              <AntTitle level={4}>
                Other information / Այլ տեղեկություն
              </AntTitle>
              {setValue('Vulnerability type', '-')}
              {setValue('Course Source', 'Facebook')}
            </Col>
          </Row>
        </ApplicantProfile>
      </Row>
      <Row>
        <Col span={24}>
          <ApplicantTabs />
        </Col>
      </Row>
    </Row>
  );
};

export default Applicant;
