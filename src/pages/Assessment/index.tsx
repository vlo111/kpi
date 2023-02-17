import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AssessmentForms from '../../components/AssessmentForm/DynamicAssessmentForm';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
import { INavigateRoteInfoTypes } from '../../types/api/assessment';

const AssessmentFormWrapper = styled.div`
  padding: 3vh;
`;

const CreateAssessmentForm: React.FC = () => {
  const location = useLocation();
  const {
    courseId,
    courseTitle,
    inputActivityTitle,
    projectId,
    resultAreaTitle
  }: INavigateRoteInfoTypes = location.state.navigateRouteInfo;

  return (
    <>
      <AssessmentFormWrapper>
        {Boolean(courseId) && courseId !== undefined && (
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
                breadcrumbName: 'Assessment Form'
              }
            ]}
          />
        )}
      </AssessmentFormWrapper>
      <AssessmentForms />
    </>
  );
};

export default CreateAssessmentForm;
