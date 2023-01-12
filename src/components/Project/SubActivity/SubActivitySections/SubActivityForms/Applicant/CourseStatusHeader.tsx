import React from 'react';
import { Row, Typography } from 'antd';

// import { AsnButton } from '../../../../../Forms/Button';
// import ApplicationFormItem from './ApplicantFormItems';

const CourseHeaderStatus: React.FC<{ title: string, form: any }> = ({
  title,
  form
}) => {
  const { Title } = Typography;
  console.log(form);

  const renderCurrentSelectionTitle = (): any => {
    switch (title) {
      case 'Applicant':
        return <Title level={5}>Application form</Title>;
      case 'Selection':
        return <Title level={5}>Enrollment test interview</Title>;
      case 'Pre-assessment of selected':
        return <Title level={5}>Pre-assessment form</Title>;
      case 'Participant':
        return <Title level={5}>Attendance form</Title>;
      case 'Post-assessment':
        return <Title level={5}>Post-assessment form</Title>;
      case 'Trained':
        return <Title level={5}>Trained form</Title>; ;
      default:
        return null;
    }
  };
  return (
    <>
      <Row justify="center" style={{ marginBottom: '3.2vh' }}>
        {renderCurrentSelectionTitle()}
      </Row>
        <Row justify="center" style={{ width: '100%' }}>
        {/* <AsnButton
          className="primary"
          type="primary"
          // onClick={() => setPublished(true)}
        >
          Publish Application form
        </AsnButton> */}
      </Row>
      <Row
        justify="center"
        style={{ marginBottom: '1.6vh', marginTop: '1.6vh' }}
      >
        <Title level={5}>Or</Title>
      </Row>
    </>
  );
};

export default CourseHeaderStatus;
