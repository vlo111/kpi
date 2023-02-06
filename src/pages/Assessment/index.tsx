import { Row } from 'antd';
import React from 'react';
import CreateAssessmentFormDataByCourseId from '../../api/AssessmentForm/useCreateAssessmentFormCourseId';
import getAssessmentFormByCourseId from '../../api/AssessmentForm/useGetAssessmentFormCourseId';

const CreateAssessmentForm: React.FC = () => {
  const { data } = getAssessmentFormByCourseId('aa', { type: 'POST_ASSESSMENT' });
  const { mutate: CreateForm } = CreateAssessmentFormDataByCourseId({
    onSuccess: () => {
      console.log('aaaa');
    }
  });

  console.log(data);

  const createForm = (): void => {
    CreateForm({
      courseId: 'c96edc3f-3843-4caf-8f32-0f94ce2ba78e',
      data: {
        title: 'test post_ass',
        onlineSignature: true,
        passingScore: 3,
        maximumScore: 3,
        type: 'PRE_ASSESSMENT',
        questions: [
          {
            title: 'Select Item',
            required: false,
            score: 2,
            answerType: 'OPTION',
            answers: [
              {
                title: 'How old are you',
                score: 1,
                type: 'OPTION'
              },
              {
                title: 'How old are you 22',
                score: 1,
                type: 'OPTION'
              },
              {
                title: 'How old are you 333',
                score: 1,
                type: 'OPTION'
              }
            ]
          }
        ]
      }
    });
  };

  return (
        <>
        <Row justify='center' align='middle' >
         <button onClick={createForm}>Create Assessment By CourseId</button>
         </Row>
        </>
  );
};

export default CreateAssessmentForm;
