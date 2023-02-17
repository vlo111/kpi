import React from 'react';
import { useParams } from 'react-router-dom';
import AsnBreadcrumb from '../../components/Forms/Breadcrumb';
// import changeStatusAssessmentFormDataById from '../../api/AssessmentForm/useChangeStatusAssessmentFormById';
// import CreateAssessmentFormDataByCourseId from '../../api/AssessmentForm/useCreateAssessmentFormCourseId';
// import useDeleteAssessmentFormDataById from '../../api/AssessmentForm/useDeleteAssessmentFormById';
// import getAssessmentFormByCourseId from '../../api/AssessmentForm/useGetAssessmentFormCourseId';

const CreateAssessmentForm: React.FC = () => {
  // const { data } = getAssessmentFormByCourseId('aa', { type: 'POST_ASSESSMENT' });
  // const { mutate: CreateForm } = CreateAssessmentFormDataByCourseId({
  //   onSuccess: () => {
  //     console.log('aaaa');
  //   }
  // });

  const { id: courseId } = useParams();

  // console.log(data);

  // const { mutate: updateStatus } = changeStatusAssessmentFormDataById({
  //   onSuccess: () => {
  //     console.log('aaaa');
  //   }
  // });

  // const { mutate: deleteForm } = useDeleteAssessmentFormDataById({
  //   onSuccess: () => {
  //     console.log('aaaa');
  //   }
  // });

  // const updateStatusById = (): void => {
  //   updateStatus({
  //     id: 'ce14133a-0951-4f30-b15a-aecd561fbeed'
  //   });
  // };

  // const deleteFormById = (): void => {
  //   deleteForm({ id: 'd5a63e39-d6d8-40de-9afa-e80a3d77a6cc' });
  // };

  // const createForm = (): void => {
  //   CreateForm({
  //     courseId: '111c6625-fe59-4582-af58-56a603e7b7ec',
  //     data: {
  //       title: 'test post_ass_original',
  //       onlineSignature: true,
  //       passingScore: 1,
  //       maximumScore: 2,
  //       type: 'POST_ASSESSMENT',
  //       questions: [
  //         {
  //           title: 'Select Item',
  //           required: false,
  //           score: 1,
  //           answerType: 'OPTION',
  //           answers: [
  //             {
  //               title: 'How old are you',
  //               score: 1,
  //               type: 'OPTION'
  //             },
  //             {
  //               title: 'How old are you 22',
  //               score: 0,
  //               type: 'OPTION'
  //             },
  //             {
  //               title: 'How old are you 333',
  //               score: 0,
  //               type: 'OPTION'
  //             }
  //           ]
  //         },
  //         {
  //           title: 'Select Item 2',
  //           required: false,
  //           score: 1,
  //           answerType: 'OPTION',
  //           answers: [
  //             {
  //               title: 'How old are you',
  //               score: 1,
  //               type: 'OPTION'
  //             },
  //             {
  //               title: 'How old are you 22',
  //               score: 0,
  //               type: 'OPTION'
  //             },
  //             {
  //               title: 'How old are you 333',
  //               score: 0,
  //               type: 'OPTION'
  //             }
  //           ]
  //         }
  //       ]
  //     }
  //   });
  // };

  return (
    <>
      {Boolean(courseId) && courseId !== undefined && (
        <AsnBreadcrumb
          routes={[
            {
              path: `/project/overview/${courseId}`,
              breadcrumbName: 'Result Area 1'
            },
            {
              path: `/project/overview/${courseId}`,
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
    </>
  );
};

export default CreateAssessmentForm;
