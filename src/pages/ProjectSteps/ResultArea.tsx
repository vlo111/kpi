import _ from 'lodash';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { FormFinish, Void } from '../../types/global';
import { AsnForm } from '../../components/Forms/Form';
import { AsnButton } from '../../components/Forms/Button';
import InputResult from '../../components/Project/ResultArea';
import useGetResultArea from '../../api/ResultArea/useGetResultArea';
import useCreateResultArea from '../../api/ResultArea/useCreateResultArea';
import {
  ProjectErrorResponse,
  SetResultArea,
  SetTitleColor
} from '../../types/project';
import useUpdateResultArea from '../../api/ResultArea/useUpdateResultArea';
import { PATHS } from '../../helpers/constants';
import { ConfirmSave } from '../../components/Project/ResultArea/Modal';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 100, color: 'var(--dark-border-ultramarine)' }} spin />;

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

const setTitleColor: SetTitleColor = (element, color) => {
  const titleElement = element.firstChild as HTMLElement;

  const pathElement = element.lastChild?.firstChild as HTMLElement;

  titleElement.style.color = color;

  pathElement.style.fill = color;
};

const setError: SetResultArea = (values) => {
  // @ts-expect-error
  const errorsIndex = [...new Set(values.errorFields.map((r) => r.name[1]))];

  const resultAreaElement: (id: string) => void = (id) => {
    const resultAreaElement = document.getElementById(
      `ans-title-${id}`
    ) as HTMLElement;

    setTitleColor(resultAreaElement, 'var(--error)');
  };

  const resultAreaElements: HTMLCollectionOf<HTMLElement> =
    document.getElementsByClassName(
      'result_area_title'
    ) as HTMLCollectionOf<HTMLElement>;

  if (!_.isEmpty(resultAreaElements)) {
    Array.from(resultAreaElements).forEach((element) => {
      setTitleColor(element, 'var(--dark-2)');
    });
  }

  errorsIndex.map((i) => resultAreaElement(i));
};

const initialResulArea = {
  resultAreas: [
    {
      title: '',
      order: 1,
      expectedResults: [{ measurement: 'NUMBER' }],
      inputActivities: [
        { title: '', order: 1.1, milestones: [{ measurement: 'NUMBER' }] }
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

export const ResultArea: React.FC = () => {
  const { id } = useParams();

  const [form] = AsnForm.useForm();

  const navigate = useNavigate();

  // @ts-expect-error
  const { resultAreas, isLoading } = useGetResultArea(id);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const onSuccess: Void = () => {
    const path = `/project/${PATHS.STEPS}`
      .replace(':id', id ?? '')
      .replace(':index', '1');

    navigate(path);
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
    setError(values);
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
      const isUpdate = resultAreas?.length != null;

      const requestData = {
        id,
        data: form.getFieldValue([])
      };

      if (isUpdate) {
        updateResultArea({ ...requestData });
      } else {
        createResultArea({ ...requestData });
      }
    }
  };

  const onSaveModal: Void = () => {
    createOrUpdate();

    if (id !== undefined) {
      const path = `/project/${PATHS.OVERVIEW}`
        .replace(':id', id);

      navigate(path);
    }
  };

  const onCancelModal: Void = () => {
    setOpenConfirmModal(false);
  };

  const onNotSaveModal: Void = () => {
    if (id !== undefined) {
      const path = `/project/${PATHS.OVERVIEW}`
        .replace(':id', id);

      navigate(path);
    }
  };

  const onRedirectOverview: Void = () => {
    if (id !== undefined) {
      if (resultAreas.length === 0 || _.isEqual(resultAreas, form.getFieldsValue().resultAreas)) {
        const path = `/project/${PATHS.OVERVIEW}`
          .replace(':id', id);

        navigate(path);
      } else {
        setOpenConfirmModal(true);
      }
    }
  };

  if (isLoading === true) {
    return <Spin indicator={antIcon} />;
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
        <InputResult />
        <ConfirmSave
          open={openConfirmModal}
          onSave={onSaveModal}
          onCancel={onCancelModal}
          onNotSave={onNotSaveModal}
        />
        <div className="footer">
          <AsnButton
            onClick={onRedirectOverview}
            className="default"
          >
            Cancel
          </AsnButton>
          {/* <AsnButton className="default" onClick={onRedirectOverview}>Save as Draft</AsnButton> */}
          <AsnButton className="primary" htmlType="submit">
            Next
          </AsnButton>
        </div>
      </ProjectInputForm>
  );
};
