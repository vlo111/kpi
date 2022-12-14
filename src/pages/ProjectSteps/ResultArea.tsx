import _ from 'lodash';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { FormFinish, Void } from '../../types/global';
import { AsnForm } from '../../components/Forms/Form';
import { AsnButton } from '../../components/Forms/Button';
import InputResult from '../../components/Project/ResultArea';
import { useGetResultArea } from '../../api/Project/ResultArea/useGetResultArea';
import useCreateResultArea from '../../api/Project/ResultArea/useCreateResultArea';
import {
  ProjectErrorResponse,
  SetResultArea,
  SetTitleColor
} from '../../types/project';
import useUpdateResultArea from '../../api/Project/ResultArea/useUpdateResultArea';
import { PATHS } from '../../helpers/constants';
import { Spin } from 'antd';
import { AsnInput } from '../../components/Forms/Input';

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

export const ResultArea: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  // @ts-expect-error
  const { resultAreas, isLoading } = useGetResultArea(id);

  const [form] = AsnForm.useForm();

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

  const onFinish: FormFinish = (values) => {
    if (id !== undefined) {
      if (resultAreas?.length != null) {
        updateResultArea({
          id,
          data: values
        });
      } else {
        createResultArea({
          id,
          data: values
        });
      }
    }
  };

  const onFinishFailed: FormFinish = (values: FormData) => {
    console.log(values, 'failed');

    setError(values);
  };

  useEffect(() => {
    if (resultAreas !== undefined && resultAreas.length !== 0) {
      form.setFieldsValue({ resultAreas });
    } else {
      form.setFieldsValue({
        resultAreas: [
          {
            title: '',
            expectedResults: [{ measurement: 'NUMBER' }],
            inputActivities: [
              { title: '', milestones: [{ measurement: 'NUMBER' }] }
            ]
          }
        ]
      });
    }
  }, [resultAreas]);

  return (
    <Spin spinning={isLoading}>
      <ProjectInputForm
        form={form}
        layout="vertical"
        validateMessages={VALIDATE_MESSAGES_PROJECT_INPUT}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <InputResult form={form} />
        <AsnForm.Item className='deleteItem' name='deletedResultAreaIds'>
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item className='deleteItem' name='deletedExpectedResultIds'>
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item className='deleteItem' name='deletedInputActivityIds'>
          <AsnInput />
        </AsnForm.Item>
        <AsnForm.Item className='deleteItem' name='deletedMilestoneIds'>
          <AsnInput />
        </AsnForm.Item>
        <div className="footer">
          <AsnButton
            className="default"
            onClick={() => {
              // prevCurrent();
            }}
          >
            Cancel
          </AsnButton>
          <AsnButton className="default">Save as Draft</AsnButton>
          <AsnButton className="primary" htmlType="submit">
            Next
          </AsnButton>
        </div>
      </ProjectInputForm>
    </Spin>
  );
};
