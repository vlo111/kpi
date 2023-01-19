import React from 'react';
import { Row, Typography } from 'antd';

import { AsnButton } from '../../../../../Forms/Button';
import ApplicationFormItem from './ApplicantFormItems';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../../../../../../helpers/constants';
import { ICourseStatusInfo } from '../../../../../../types/api/activity/subActivity';
import useStartSubActivityCourse from '../../../../../../api/Activity/SubActivity/useStartSubActivityCourse';

const CourseHeaderStatus: React.FC<ICourseStatusInfo> = ({ title, form, applicationForm, courseId, refetchSingleStatus, courseStatus }) => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const { id: SubActivityId } = useParams();

  const { mutate: StartCourse } = useStartSubActivityCourse({
    onSuccess: () => {
      navigate(`/${PATHS.APPLICATIONFORM.replace(':id', courseId)}`, { state: { SubActivityId } });
    },
    onError: () => {
      console.log('aaa');
    }
  });

  const publicCourse = (): void => {
    if (courseId !== undefined && courseStatus === 'INACTIVE') {
      StartCourse({ id: courseId });
    } else {
      navigate(`/${PATHS.APPLICATIONFORM.replace(':id', courseId)}`, { state: { SubActivityId } });
    }
  };

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
                      <AsnButton className="primary" type="primary" onClick={publicCourse}>
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
              <ApplicationFormItem form={form} refetchSingleStatus={refetchSingleStatus} />
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
              <ApplicationFormItem form={form} refetchSingleStatus={refetchSingleStatus} />
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
              <ApplicationFormItem form={form} refetchSingleStatus={refetchSingleStatus} />
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
