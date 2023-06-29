import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import styled from 'styled-components';

import AsnSpin from '../Forms/Spin';
import { AsnModal } from '../Forms/Modal';
import { AsnButton } from '../Forms/Button';
import { AsnForm } from '../Forms/Form';
import { AsnInput, AsnTextArea } from '../Forms/Input';
import { ICreateTemplateModal, AddManagerHandle } from '../../types/project';
import { PATHS } from '../../helpers/constants';
import {
  ICreateTemplateResponse,
  IUpdateTemplateMessage,
  IUpdateTemplateErrorMessage
} from '../../types/api/activity/template';
import getSingleTemplate from '../../api/Activity/Template/useGetSingleActivityTemplate';
import useCreateActivityTemplate from '../../api/Activity/Template/useCreateActivityTemplate';
import useUpdateActivityTemplate from '../../api/Activity/Template/useUpdateActivityTemplate';
import { FormFinish } from '../../types/global';

const CreateTemplateContainer = styled.div`
  .buttonContainer {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 2.8rem;
  }
`;

const TemplateAsnModal = styled(AsnModal)`
  .ant-modal-content {
    padding: 5rem 4rem 3rem;
  }
`;

const CreateTemplate: React.FC<ICreateTemplateModal> = ({
  isOpenCreateActivityModal,
  setIsOpenCreateActivityModal,
  activityId,
  edit,
  templateId
}) => {
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();

  const { mutate: createTemplateFn } = useCreateActivityTemplate({
    onSuccess: (options: ICreateTemplateResponse) => {
      const { data } = options;
      if ((data.result.id ?? '').length > 0) {
        navigate(`/${PATHS.ACTIVITYTEMPLATE.replace(':id', data.result.id)}`);
      }
    },
    onError: () => {
      void message.error('Something went wrong !!', 2);
    }
  });

  const { mutate: updateTemplate } = useUpdateActivityTemplate({
    onSuccess: ({
      data: {
        result: { successMessage }
      }
    }: IUpdateTemplateMessage) => {
      void message.success(successMessage, 2);
      navigate(
        `/${PATHS.ACTIVITYTEMPLATE.replace(':id', templateId as string)}`
      );
    },
    onError: ({
      response: {
        data: { message: errorMessage }
      }
    }: IUpdateTemplateErrorMessage) => {
      void message.error(errorMessage, 2);
    }
  });

  const { data, isFetching } = getSingleTemplate(templateId, {
    enabled: Boolean(templateId)
  });

  const onCancelClick: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false);
    form.resetFields();
  };

  const handleCancel: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false);
  };

  const onFinish: FormFinish = (values) => {
    if (edit !== true) {
      createTemplateFn({
        id: activityId,
        data: {
          category: 'COURSES',
          title: values.templateName,
          description: values.description
        }
      });
    }
    if (edit === true) {
      updateTemplate({
        id: templateId as string,
        data: {
          title: values.templateName,
          description: values.description
        }
      });
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      category: 'Courses'
    });
  }, []);

  if (isFetching === true) {
    return <AsnSpin />;
  }

  return (
    <TemplateAsnModal
      footer={false}
      open={isOpenCreateActivityModal}
      title={
        edit !== undefined
          ? 'Edit activity Template'
          : 'Create activity Template'
      }
      onCancel={handleCancel}
    >
      <CreateTemplateContainer>
        <AsnForm
          id="create-template-AsnForm"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <AsnForm.Item label="Category">
            <AsnInput value={'Courses'} disabled={true} />
          </AsnForm.Item>
          <AsnForm.Item
            name="templateName"
            label="Template Name"
            rules={[
              { required: true, message: 'Please enter Template Name' },
              {
                min: 2,
                max: 128,
                message:
                  'The field is required. Must be between 2 and 128 characters.'
              }
            ]}
            initialValue={data?.title ?? ''}
          >
            <AsnInput placeholder="One phase course " />
          </AsnForm.Item>
          <AsnForm.Item
            name="description"
            label="Description"
            rules={[{ max: 256, message: 'Maximum 256 characters.' }]}
            initialValue={data?.description ?? ''}
          >
            <AsnTextArea placeholder="Activity Template for long-term courses. The course has one phase." />
          </AsnForm.Item>
          <div className="buttonContainer">
            <AsnButton onClick={onCancelClick} className="default">
              Cancel
            </AsnButton>
            <AsnButton className="primary" htmlType="submit">
              Next
            </AsnButton>
          </div>
        </AsnForm>
      </CreateTemplateContainer>
    </TemplateAsnModal>
  );
};

export default CreateTemplate;
