import { useMutation } from '@tanstack/react-query';
import { CreateAssessmentFormByCourseId, CreateAssessmentFormData } from '../../types/api/assessment';
import client from '../client';

export const url = 'api/assessment-form/course';

const CreateAssessmentFormDataByCourseId: CreateAssessmentFormByCourseId = (options = {}) =>
  useMutation(
    async (params: CreateAssessmentFormData) => {
      if (params.courseId !== undefined) {
        return await client.post(`${url}/${params.courseId}`, params.data);
      }
    },
    options
  );
export default CreateAssessmentFormDataByCourseId;
