import React, { useState } from 'react';
import { Row, Typography, message } from 'antd';

import { AsnButton } from '../../../../../Forms/Button';
import ApplicationFormItem from './ApplicantFormItems';
import { useNavigate, useParams } from 'react-router-dom';
import { PATHS } from '../../../../../../helpers/constants';
import { ICourseStatusInfo, IErrorMessageCurse } from '../../../../../../types/api/activity/subActivity';
import useStartSubActivityCourse from '../../../../../../api/Activity/SubActivity/useStartSubActivityCourse';
import {
  EnumAssessmentFormTypes,
  IAssessments
} from '../../../../../../types/api/assessment';
import { useProject } from '../../../../../../hooks/useProject';
import CreateAssessmentInfoModal from '../../../../../AssessmentForm/CreateAssessmentInfoModal/AssessmentCreateInfoModal';
import PreviewAssessmentModal from '../../../../../AssessmentForm/PreviewAssessmentModal';

const CourseHeaderStatus: React.FC<ICourseStatusInfo> = ({
  navigateRouteInfo,
  title,
  form,
  applicationForm,
  courseId,
  refetchSingleStatus,
  courseStatus
}) => {
  const { Title } = Typography;
  const { projectId } = useProject();
  const [openModal, setOpenModal] = useState(false);
  const [openPreviewAssessmentModal, setOpenPreviewAssessmentModal] =
    useState(false);
  const [footerButtons, setFooterButtons] = useState<IAssessments | undefined>(
    undefined
  );
  const [enumTypes, setEnumTypes] =
    useState<EnumAssessmentFormTypes>('PRE_ASSESSMENT');
  const navigate = useNavigate();
  const { id: SubActivityId } = useParams();

  const { mutate: StartCourse } = useStartSubActivityCourse({
    onSuccess: () => {
      navigate(`/${PATHS.APPLICATIONFORM.replace(':id', courseId)}`, {
        state: { SubActivityId }
      });
    },
    onError: ({ response: { data: { message: errorMessage } } }: IErrorMessageCurse) => {
      void message.error(errorMessage, 2);
    }
  });

  const publicCourse = (): void => {
    if (courseId !== undefined && courseStatus === 'INACTIVE') {
      StartCourse({ id: courseId });
    } else {
      navigate(`/${PATHS.APPLICATIONFORM.replace(':id', courseId)}`, {
        state: { SubActivityId }
      });
    }
  };

  const createAssessmentForm = (type: EnumAssessmentFormTypes): void => {
    if (type === 'APPLICATION') {
      navigate(`/${PATHS.APPLICATIONFORM.replace(':id', courseId)}`, {
        state: { SubActivityId }
      });
    } else {
      setEnumTypes(type);
      setOpenModal(true);
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
                      <AsnButton
                        className="primary"
                        type="primary"
                        onClick={publicCourse}
                      >
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
              <ApplicationFormItem
                createAssessmentForm={createAssessmentForm}
                formType="APPLICATION"
                form={form}
                courseId={courseId}
                refetchSingleStatus={refetchSingleStatus}
                navigateRouteInfo={navigateRouteInfo}
              />
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
                      <AsnButton
                        className="primary"
                        type="primary"
                        onClick={() => createAssessmentForm('PRE_ASSESSMENT')}
                      >
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
              <ApplicationFormItem
                createAssessmentForm={createAssessmentForm}
                formType="PRE_ASSESSMENT"
                form={form}
                navigateRouteInfo={navigateRouteInfo}
                courseId={courseId}
                refetchSingleStatus={refetchSingleStatus}
              />
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
                      <AsnButton
                        className="primary"
                        type="primary"
                        onClick={() => createAssessmentForm('POST_ASSESSMENT')}
                      >
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
              <ApplicationFormItem
                createAssessmentForm={createAssessmentForm}
                navigateRouteInfo={navigateRouteInfo}
                courseId={courseId}
                formType="POST_ASSESSMENT"
                form={form}
                refetchSingleStatus={refetchSingleStatus}
              />
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
  return (
    <>
      {renderCurrentSelectionTitle()}
      {openModal && (
        <CreateAssessmentInfoModal
          navigateRouteInfo={navigateRouteInfo}
          courseId={courseId}
          type={enumTypes}
          projectId={projectId}
          open={openModal}
          setOpen={setOpenModal}
          setOpenPreviewAssessmentModal={setOpenPreviewAssessmentModal}
          footerButtons={footerButtons}
          setFooterButtons={setFooterButtons}
        />
      )}
      <PreviewAssessmentModal
        openPreviewAssessmentModal={openPreviewAssessmentModal}
        setOpenPreviewAssessmentModal={setOpenPreviewAssessmentModal}
        setOpenModal={setOpenModal}
        footerButtons={footerButtons}
        courseId={courseId}
        navigateRouteInfo={navigateRouteInfo}
        type={enumTypes}
        projectId={projectId}
      />
    </>
  );
};

export default CourseHeaderStatus;
