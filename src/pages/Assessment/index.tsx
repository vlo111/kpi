import { Space } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AssessmentForms from '../../components/AssessmentForm/DynamicAssessmentForm';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';

const AssessmentFormWrapper = styled(Space)`
width: 100%;
padding: 4.2vh 3.9vw 4.2vh 3.9vw;
`;

const CreateAssessmentForm: React.FC = () => {
  const { id: courseId } = useParams();

  return (
    <AssessmentFormWrapper direction="vertical">
      {Boolean(courseId) && courseId !== undefined && (
        <AsnBreadcrumb
          routes={[
            {
              path: '/project/overview/id1',
              breadcrumbName: 'Result Area 1'
            },
            {
              path: '/project/overview/id2',
              breadcrumbName: 'Activity name'
            },
            {
              path: `/project/sub-activity/${courseId}`,
              breadcrumbName: 'courseTitle'
            },
            {
              path: '',
              breadcrumbName: 'Assessment Form'
            }
          ]}
        />
      )}
      <AssessmentForms />
    </AssessmentFormWrapper>
  );
};

export default CreateAssessmentForm;
