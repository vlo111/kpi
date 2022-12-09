import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useCallback, useState } from 'react';

import { FormProject } from '.';
import { FormFinish, Void } from '../../types/global';
import { AsnForm } from '../../components/Forms/Form';
import {
  ProjectErrorResponse,
  ProjectSuccessResponse
} from '../../types/project';
import useCreateProject from '../../api/Project/useCreateProject';
import { ConfirmModal } from '../../components/Forms/Modal/Confirm';
import { ICreateProjectData } from '../../types/api/project/get-project';

export const CreateProject: React.FC = () => {
  const navigate = useNavigate();

  const [form] = AsnForm.useForm<ICreateProjectData>();

  const [openDeleteModal, setOpenDeleteModal] = useState<string>('');

  const [error, setError] = useState<string>('');

  const onSuccess: ProjectSuccessResponse = (response) => {
    notification.success({
      bottom: 50,
      placement: 'topRight',
      message: 'The project saved successfully',
      duration: 3
    });
    setOpenDeleteModal(response?.data?.id);
  };

  const onError: ProjectErrorResponse = ({ response }) => {
    if (response.status === 409) {
      setError('A project with the same name already exists');
    } else {
      setError(response.data.message);
    }
    setOpenDeleteModal('');
  };

  const { mutate: createProject, isLoading } = useCreateProject({
    onSuccess,
    onError
  });

  const onFinish: FormFinish = useCallback(
    (values) => {
      createProject({
        ...values,
        startDate: new Date(values.startDate).toJSON(),
        endDate: new Date(values.endDate).toJSON()
      });
    },
    [form]
  );

  const onRedirectToUser: Void = () => {
    navigate('/teams');
  };

  const onSkipUser: Void = () => {
    if (openDeleteModal !== '') {
      // navigate(`../overview/${openDeleteModal}`, { replace: true });
      // navigate(`../${openDeleteModal}/steps/${ProjectSteps.First}`, { replace: true });
      navigate(`../overview/${openDeleteModal}`, { replace: true });
    }
  };

  return (
    <>
      <FormProject
        form={form}
        onFinish={onFinish}
        isLoading={isLoading}
        error={error}
      />
      <ConfirmModal
        styles={{ gap: '3rem' }}
        yes="Add"
        no="Skip"
        open={openDeleteModal !== ''}
        title="Do you want to add users?"
        onSubmit={onRedirectToUser}
        onCancel={onSkipUser}
      />
    </>
  );
};
