import React from 'react';
import { Row, Typography } from 'antd';

import { AsnButton } from '../../../../../Forms/Button';
import ApplicationFormItem from './ApplicantFormItems';

const CourseHeaderStatus: React.FC<{
  title: string
  applicationForm: string[]
  form: Array<{ id: string, title: string }>
}> = ({ title, form, applicationForm }) => {
  const { Title } = Typography;

  const renderCurrentSelectionTitle = (): any => {
    switch (title) {
      case 'Applicant':
        return (
          <>
            <Row justify="center" style={{ marginBottom: '3.2vh' }}>
              <Title level={5}>Application form</Title>
            </Row>
            {form?.length === 0
              ? (
              <>
                {applicationForm.includes('APPLICATION') && (
                  <>
                    <Row justify="center" style={{ width: '100%' }}>
                      <AsnButton className="primary" type="primary">
                        Publish Application form
                      </AsnButton>
                    </Row>
                    <Row
                      justify="center"
                      style={{ marginBottom: '1.6vh', marginTop: '1.6vh' }}
                    >
                      <Title level={5}>Or</Title>
                    </Row>
                  </>
                )}
              </>
                )
              : (
              <ApplicationFormItem items={form} />
                )}
          </>
        );
      case 'Selection':
        return (
          <Row justify="center" style={{ marginBottom: '3.2vh' }}>
            <Title level={5}>Enrollment test interview</Title>
          </Row>
        );
      case 'Pre-assessment of selected':
        return (
          <>
            <Row justify="center" style={{ marginBottom: '3.2vh' }}>
              <Title level={5}>Pre-assessment form</Title>
            </Row>
            {form?.length === 0 || form === undefined
              ? (
              <>
                {applicationForm.includes('ASSESSMENT') && (
                  <>
                    <Row justify="center" style={{ width: '100%' }}>
                      <AsnButton className="primary" type="primary">
                        Publish Pre-assessment form
                      </AsnButton>
                    </Row>
                    <Row
                      justify="center"
                      style={{ marginBottom: '1.6vh', marginTop: '1.6vh' }}
                    >
                      <Title level={5}>Or</Title>
                    </Row>
                  </>
                )}
              </>
                )
              : (
              <ApplicationFormItem items={form} />
                )}
          </>
        );
      case 'Participant':
        return (
          <Row justify="center" style={{ marginBottom: '3.2vh' }}>
            <Title level={5}>Attendance form</Title>
          </Row>
        );
      case 'Post-assessment':
        return (
          <>
            <Row justify="center" style={{ marginBottom: '3.2vh' }}>
              <Title level={5}>Post-assessment form</Title>
            </Row>
            {form?.length === 0 || form === undefined
              ? (
              <>
                {applicationForm.includes('ASSESSMENT') && (
                  <>
                    <Row justify="center" style={{ width: '100%' }}>
                      <AsnButton className="primary" type="primary">
                        Publish Post-assessment form
                      </AsnButton>
                    </Row>
                    <Row
                      justify="center"
                      style={{ marginBottom: '1.6vh', marginTop: '1.6vh' }}
                    >
                      <Title level={5}>Or</Title>
                    </Row>
                  </>
                )}
              </>
                )
              : (
              <ApplicationFormItem items={form} />
                )}
          </>
        );
      case 'Trained':
        return (
          <Row justify="center" style={{ marginBottom: '3.2vh' }}>
            <Title level={5}>Trained form</Title>
          </Row>
        );
      default:
        return null;
    }
  };
  return <>{renderCurrentSelectionTitle()}</>;
};

export default CourseHeaderStatus;
