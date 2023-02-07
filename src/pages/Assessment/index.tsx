import { Space } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AssessmentForms from '../../components/AssessmentForm';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';

export const aaa = {
  title: 'Assessment Form 1',
  onlineSignature: false,
  passingScore: 30,
  maximumScore: 50,
  duplicate: false,
  type: 'PRE_ASSESSMENT',
  questions: [
    {
      title: 'Full name/ Անուն, Ազգանուն, Հայրանուն1',
      required: true,
      score: 1,
      answerType: 'SHORT_TEXT',
      answers: [
        {
          title: 'How old are you',
          score: 1,
          type: 'LONG_TEXT'
        }
      ]
    },
    {
      title: 'Full name/ Անուն, Ազգանուն, Հայրանուն2',
      required: true,
      score: 1,
      answerType: 'SHORT_TEXT',
      answers: [
        {
          title: 'How old are you',
          score: 1,
          type: 'LONG_TEXT'
        }
      ]
    },
    {
      title: 'Full name/ Անուն, Ազգանուն, Հայրանուն3',
      required: true,
      score: 1,
      answerType: 'OPTION',
      answers: [
        {
          title: 'option1',
          score: 1,
          type: 'OPTION'
        },
        {
          title: 'option2',
          score: 1,
          type: 'OPTION'
        },
        {
          title: 'option3',
          score: 1,
          type: 'OPTION'
        }
      ]
    }

  ]
};

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
