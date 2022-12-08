import _ from 'lodash';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { FormFinish, Void } from '../../../types/global';
import { AsnForm } from '../../../components/Forms/Form';
import { AsnButton } from '../../../components/Forms/Button';
import InputResult from '../../../components/Project/ResultArea';
import { useGetResultArea } from '../../../api/Project/ResultArea/useGetResultArea';
import useCreateResultArea from '../../../api/Project/ResultArea/useCreateResultArea';
import { ProjectErrorResponse, SetResultArea, SetTitleColor } from '../../../types/project';

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
    padding: 2rem !important
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
      border: 1px solid var(--dark-5) !important;
      color: var(--dark-2) !important;

      span {
        font-size: var(--base-font-size) !important;
        font-weight: var(--font-normal) !important;
      }
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
    const resultAreaElement = document.getElementById(`ans-title-${id}`) as HTMLElement;

    setTitleColor(resultAreaElement, 'var(--error)');
  };

  const resultAreaElements: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName('result_area_title') as HTMLCollectionOf<HTMLElement>;

  if (!_.isEmpty(resultAreaElements)) {
    Array.from(resultAreaElements).forEach(element => {
      setTitleColor(element, 'var(--dark-2)');
    });
  }

  errorsIndex.map((i) => resultAreaElement(i));
};

export const First: React.FC = () => {
  const { id } = useParams();

  const resultArea = useGetResultArea(id);

  const [form] = AsnForm.useForm();

  const onSuccess: Void = () => {
    console.log('success');
    // notification.success({
    //   bottom: 50,
    //   placement: 'topRight',
    //   message: 'The project saved successfully',
    //   duration: 3
    // });
    // if (id !== undefined) {
    //   navigate(`../overview/${id}`, { replace: true });
    // }
  };

  const onError: ProjectErrorResponse = ({ response }) => {
    console.log('error', response);
    // if (response.status === 409) {
    //   setError('A project with the same name already exists');
    // } else {
    //   setError(response.data.message);
    // }
  };

  const { mutate: createResultArea } = useCreateResultArea({
    onSuccess,
    onError
  });

  const onFinish: FormFinish = (values: FormData) => {
    console.log(values, 'finish');
    // nextCurrent();
    console.log(id, form.getFieldsValue());
    if (id !== undefined) {
      createResultArea({
        id,
        data: form.getFieldsValue()
      });
    }
  };

  const onFinishFailed: FormFinish = (values: FormData) => {
    console.log(values, 'failed');

    setError(values);
  };

  useEffect(() => {
    if (resultArea !== undefined && resultArea.length !== 0) {
      form.setFieldsValue(resultArea);
    } else {
      // form.setFieldsValue({
      //   result: [
      //     {
      //       title: 'qw eqw e',
      //       expectedResults: [{ code: 'asdasd' }],
      //       inputActivities: [{ title: 'zaza ', milestones: [{ measurement: 'ATTACHMENT', statement: 'barev dzez', target: '78' }] }]
      //     }
      //   ]
      // });
      form.setFieldsValue({
        resultAreas: [
          {
            title: '',
            expectedResults: [{}],
            inputActivities: [{ title: '', milestones: [{}] }]
          }
        ]
      });
    }
  }, [resultArea]);

  return (
    <ProjectInputForm
      form={form}
      layout="vertical"
      validateMessages={VALIDATE_MESSAGES_PROJECT_INPUT}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <InputResult />
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
  );
};
