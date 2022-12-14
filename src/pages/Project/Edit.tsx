import moment from 'moment';
import { notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useState } from 'react';

import { FormProject } from '.';
import { FormFinish, Void } from '../../types/global';
import { AsnForm } from '../../components/Forms/Form';
import { ProjectErrorResponse } from '../../types/project';
import useEditProject from '../../api/Project/useEditProject';
import useGetProjectById from '../../api/Project/useGetProject';

export const EditProject: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [form] = AsnForm.useForm();

  const [error, setError] = useState<string>('');

  const { data: project, isLoading } = useGetProjectById(id, {
    enabled: !(id === null),
    onSuccess: ({ ...data }) => {
      form.setFieldsValue({
        ...data.result,
        startDate: moment(data.result?.startDate),
        endDate: moment(data.result?.endDate)
      });
    }
  });

  const onSuccess: Void = () => {
    console.log('success');
    notification.success({
      bottom: 50,
      placement: 'topRight',
      message: 'The project saved successfully',
      duration: 3
    });
    if (id !== undefined) {
      navigate(`../overview/${id}`, { replace: true });
    }
  };

  const onError: ProjectErrorResponse = ({ response }) => {
    console.log(response);
    if (response.status === 409) {
      setError('A project with the same name already exists');
    } else {
      setError(response.data.message);
    }
  };

  const { mutate: updateProject } = useEditProject(
    { id },
    {
      onSuccess,
      onError
    }
  );

  const onFinish: FormFinish = useCallback(
    (values) => {
      updateProject({
        ...values,
        startDate: moment(values?.startDate),
        endDate: moment(values?.endDate)
      });
    },
    [updateProject]
  );

  return (
    <FormProject
      form={form}
      onFinish={onFinish}
      isLoading={isLoading}
      error={error}
    />
  );
};
