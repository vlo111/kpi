import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';

import { FormProject } from '.';
import { FormFinish, Void } from '../../types/global';
import { AsnForm } from '../../components/Forms/Form';
import { useGetProjectById } from '../../api/Project/useGetProject';
import { ProjectErrorResponse } from '../../types/project';
import useEditProject from '../../api/Project/useEditProject';
import { notification } from 'antd';

export const EditProject: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [form] = AsnForm.useForm();

  const [error, setError] = useState<string>('');

  const { project, isLoading } = useGetProjectById(id) ?? { project: null };

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
    if (id !== undefined) navigate(`../overview/${id}`, { replace: true });
  };

  const { mutate: updateProject } = useEditProject({
    onSuccess,
    onError
  });

  const onFinish: FormFinish = useCallback(
    (values) => {
      updateProject({
        id: id ?? '',
        data: {
          ...values,
          startDate: new Date(values.startDate).toJSON(),
          endDate: new Date(values.endDate).toJSON()
        }
      });
    },
    [form]
  );

  useEffect(() => {
    if (project !== undefined) {
      form.setFieldsValue({
        ...project,
        startDate: moment(project?.startDate),
        endDate: moment(project?.endDate)
      });
    }
  }, [id, project]);

  return (
    <FormProject
      form={form}
      onFinish={onFinish}
      isLoading={isLoading}
      error={error}
    />
  );
};
