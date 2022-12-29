import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { FormFinish, Void } from '../../types/global';
import { AsnForm } from '../../components/Forms/Form';
import useGetResultArea from '../../api/ResultArea/useGetResultArea';
import useCreateResultArea from '../../api/ResultArea/useCreateResultArea';
import {
  IStepsUpdate,
  ProjectErrorResponse
} from '../../types/project';
import useUpdateResultArea from '../../api/ResultArea/useUpdateResultArea';
import { PATHS } from '../../helpers/constants';
import AsnSpin from '../../components/Forms/Spin1';
import { IUseGetResultArea } from '../../types/api/project/get-project';
import { validateResultArea } from '../../helpers/utils';
import { InputResultArea } from '../../components/Project/ResultArea';

const ProjectInputForm = styled(AsnForm)`
  width: clamp(19rem, 73vw, 90rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .ant-collapse-header {
    padding: 20px 40px 20px 1rem;
  }

  .ans-title {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    span {
      font-size: var(--headline-font-size);
      color: var(--dark-2);
    }
  }

  .ant-collapse-content-box {
    padding: 2rem !important;
  }

  .form-footer {
    .ant-btn-default {
      margin: 0 1rem;
    }

    .ant-btn-primary {
      margin-left: 1rem;
    }
  }

  .ant-col {
    align-items: end;
  }

  .form-item-collapse {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 24px;

    .ant-form-item {
      margin-bottom: 0;
      width: 100%;
    }
  }

  .footer {
    display: flex;
    gap: 6rem;
    justify-content: end;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }

  div:not(:last-child) {
    button {
      width: 100%;
      margin: 0 auto;
    }
  }
`;

const VALIDATE_MESSAGES_PROJECT_INPUT = {
  // eslint-disable-next-line no-template-curly-in-string
  required: '',
  string: {
    // eslint-disable-next-line no-template-curly-in-string
    min: '',
    max: '',
    range: '',
    len: ''
  }
};

const initialResulArea = {
  resultAreas: [
    {
      title: '',
      order: 1,
      expectedResults: [{ measurement: 'NUMBER' }],
      inputActivities: [
        { title: '', order: 1, milestones: [{ measurement: 'NUMBER' }] }
      ]
    }
  ]
};

const initialValues = {
  deletedResultAreaIds: [],
  deletedInputActivityIds: [],
  deletedExpectedResultIds: [],
  deletedMilestoneIds: [],
  resultAreas: { ...initialResulArea.resultAreas }
};

export const ResultArea: React.FC<IStepsUpdate> = ({ isUpdate }) => {
  const { id } = useParams();

  const [form] = AsnForm.useForm();

  const navigate = useNavigate();

  // @ts-expect-error
  const { resultAreas, isLoading }: IUseGetResultArea = useGetResultArea(id);

  const onSuccess: Void = () => {
    if (id !== undefined) {
      if (!isUpdate) {
        const path = `/project/${PATHS.STEPS}`
          .replace(':id', id)
          .replace(':index', '1');

        navigate(path);
      } else {
        navigate(`/project/${PATHS.OVERVIEW}`.replace(':id', id));
      }
    }
  };

  const onError: ProjectErrorResponse = ({ response }) => {
    console.log('error', response);
  };

  const { mutate: createResultArea } = useCreateResultArea({
    onSuccess,
    onError
  });

  const { mutate: updateResultArea } = useUpdateResultArea({
    onSuccess,
    onError
  });

  const onFinish: Void = () => {
    createOrUpdate();
  };

  const onFinishFailed: FormFinish = (values: FormData) => {
    validateResultArea(values);
  };

  useEffect(() => {
    if (resultAreas !== undefined && resultAreas.length !== 0) {
      form.setFieldsValue({ resultAreas });
    } else {
      form.setFieldsValue(initialResulArea);
    }
  }, [resultAreas]);

  const createOrUpdate: Void = () => {
    if (id !== undefined) {
      const isUpdate = resultAreas?.length > 0;

      const requestData = {
        id,
        data: form.getFieldValue([])
      };

      if (isUpdate) {
        updateResultArea({ ...requestData });
      } else {
        requestData.data = { resultAreas: form.getFieldValue([]).resultAreas };

        createResultArea({ ...requestData });
      }
    }
  };

  if (isLoading) {
    return <AsnSpin />;
  }

  return (
      <ProjectInputForm
        form={form}
        layout="vertical"
        validateMessages={VALIDATE_MESSAGES_PROJECT_INPUT}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={initialValues}
      >
        <InputResultArea createOrUpdate={createOrUpdate} isUpdate={isUpdate}/>
      </ProjectInputForm>
  );
};
