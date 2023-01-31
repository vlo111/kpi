import React from 'react';
import { Row, Col, Space, Tabs } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import { ReactComponent as DateSvg } from '../../../../assets/icons/date.svg';

const AntCol = styled(Col)`
  font-size: var(--base-font-size);
  width: 210px;
`;

const WrapperSpace = styled(Space)`
  width: 100%;
  .course_tabs {
    .ant-tabs-nav {
      margin-left: 20.8%;
    }
    .ant-tabs-tab {
      background: var(--dark-6);
      border: 1px solid #f0f0f0;
      border-radius: 6px !important;
      font-size: var(--base-font-size);
      font-weight: var(--font-normal);
      color: var(--dark-2);
    }
    .ant-tabs-tab-active {
      background: var(--white);
      border-top: 1px solid var(--dark-border-ultramarine);

      .ant-tabs-tab-btn {
        color: var(--dark-border-ultramarine) !important;
        &:focus {
          color: var(--dark-border-ultramarine) !important;
        }
      }
    }
  }
`;

const CourseInfo: React.FC<any> = ({ courseData, onChange }) => {
  return (
    <>
      <WrapperSpace direction="vertical">
        {courseData?.sectionsData.length === 1 && (
          <Row>
            <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
              Title
            </AntCol>
            <AntCol span={12}>{courseData?.sectionsData[0]?.title}</AntCol>
          </Row>
        )}
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
            Organization
          </AntCol>
          <AntCol span={12}>{courseData?.organization?.title}</AntCol>
        </Row>
        {courseData?.sectionsData.length === 1 && (
          <Row>
            <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
              Description
            </AntCol>
            <AntCol span={12}>
              {courseData?.sectionsData[0]?.data?.description}
            </AntCol>
          </Row>
        )}
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
            Sub-Activity Manager
          </AntCol>
          <AntCol span={12}>
            {courseData?.manager?.firstName} {courseData?.manager?.lastName}
          </AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
            Sector
          </AntCol>
          <AntCol span={12}>{courseData?.sector?.title}</AntCol>
        </Row>
        <Row>
          <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
            Region
          </AntCol>
          <AntCol span={12}>{courseData?.region?.title}</AntCol>
        </Row>
        {courseData?.sectionsData.length > 1
          ? (
          <Tabs
            type="card"
            size="middle"
            onChange={onChange}
            className="course_tabs"
          >
            {courseData?.sectionsData.map((course: any) => (
              <Tabs.TabPane key={course.title} tab={<>{course.title}</>}>
                <Row style={{ marginBottom: '1.2vh' }}>
                  <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                    Title
                  </AntCol>
                  <AntCol span={12}>{course?.title}</AntCol>
                </Row>
                <Row style={{ marginBottom: '1.2vh' }}>
                  <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                    Description
                  </AntCol>
                  <AntCol span={12}>{course?.data?.description}</AntCol>
                </Row>
                <Row style={{ marginBottom: '1.2vh' }}>
                  <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                    Start Date
                  </AntCol>
                  <Col>
                    <DateSvg style={{ marginRight: '10px' }} />
                  </Col>
                  <AntCol span={12}>
                    {' '}
                    {moment(course?.data?.startDate).format('DD/MM/YYYY')}
                  </AntCol>
                </Row>
                <Row style={{ marginBottom: '1.2vh' }}>
                  <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                    End Date
                  </AntCol>
                  <Col>
                    <DateSvg style={{ marginRight: '10px' }} />
                  </Col>
                  <AntCol span={12}>
                    {moment(course?.data?.endDate).format('DD/MM/YYYY')}
                  </AntCol>
                </Row>
                <Row style={{ marginBottom: '1.2vh' }}>
                  <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                    Teaching Mode
                  </AntCol>
                  <AntCol span={12}>{course?.data.teachingMode}</AntCol>
                </Row>
                <Row style={{ marginBottom: '1.2vh' }}>
                  <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                    Duration
                  </AntCol>
                  <AntCol span={12}>
                    {course?.data?.durationInfo?.duration}
                    (Technical skills{' '}
                    {
                      course?.data?.durationInfo
                        ?.duration_technical_number
                    }{' '}
                    hr/ Soft skills{' '}
                    {
                      course?.data?.durationInfo
                        ?.duration_soft_number
                    }{' '}
                    hr)
                  </AntCol>
                </Row>
                {course?.data?.customInputs.map((inputs: any) => (
                  <Row
                    key={inputs.setting.id}
                    style={{ marginBottom: '1.2vh' }}
                  >
                    <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                      {inputs.setting.title}
                    </AntCol>
                    <AntCol span={12}>
                      {inputs?.SHORT_TEXT ??
                        inputs?.partner_organization ??
                        inputs?.NUMBER ??
                        inputs?.DROPDOWN}
                    </AntCol>
                  </Row>
                ))}
              </Tabs.TabPane>
            ))}
          </Tabs>
            )
          : (
          <>
            <Row>
              <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                Start Date
              </AntCol>
              <Col>
                <DateSvg style={{ marginRight: '10px' }} />
              </Col>
              <AntCol span={12}>
                {' '}
                {moment(courseData?.sectionsData[0]?.data?.startDate).format(
                  'DD/MM/YYYY'
                )}
              </AntCol>
            </Row>
            <Row>
              <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                End Date
              </AntCol>
              <Col>
                <DateSvg style={{ marginRight: '10px' }} />
              </Col>
              <AntCol span={12}>
                {moment(courseData?.sectionsData[0]?.data?.endDate).format(
                  'DD/MM/YYYY'
                )}
              </AntCol>
            </Row>
            <Row>
              <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                Teaching Mode
              </AntCol>
              <AntCol span={12}>ONLINE</AntCol>
            </Row>
            <Row>
              <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                Duration
              </AntCol>
              <AntCol span={12}>
                {courseData?.sectionsData[0]?.data?.durationInfo?.duration}
                (Technical skills{' '}
                {
                  courseData?.sectionsData[0]?.data?.durationInfo
                    ?.duration_technical_number
                }{' '}
                hr/ Soft skills{' '}
                {
                  courseData?.sectionsData[0]?.data?.durationInfo
                    ?.duration_soft_number
                }{' '}
                hr)
              </AntCol>
            </Row>
            {courseData?.sectionsData?.map((item: any) => (
              <div key={item?.id}>
                {item?.data?.customInputs?.map((inputs: any) => (
                  <Row
                    key={inputs?.setting.id}
                    style={{ marginBottom: '1.2vh' }}
                  >
                    <AntCol sm={{ offset: 2 }} md={{ offset: 5 }}>
                      {inputs.setting.title}
                    </AntCol>
                    <AntCol span={12}>
                      {inputs?.SHORT_TEXT ??
                        inputs?.partner_organization ??
                        inputs?.NUMBER ??
                        inputs?.DROPDOWN}
                    </AntCol>
                  </Row>
                ))}
              </div>
            ))}
          </>
            )}
      </WrapperSpace>
    </>
  );
};

export default CourseInfo;
