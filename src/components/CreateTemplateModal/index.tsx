import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AsnModal } from '../Forms/Modal';
import { AsnButton } from '../Forms/Button';
import { AsnForm } from '../Forms/Form';
import { AsnInput, AsnTextArea } from '../Forms/Input';
import { ICreateTemplateModal, AddManagerHandle } from '../../types/project';
import { PATHS } from '../../helpers/constants';
import { ICreateTemplateResponse } from '../../types/api/activity/template';
import useCreateActivityTemplate from '../../api/Activity/Template/useCreateActivityTemplate';

const CreateTemplateContainer = styled.div`
  .buttonContainer {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;

const CreateTemplate: React.FC<ICreateTemplateModal> = ({
  isOpenCreateActivityModal,
  setIsOpenCreateActivityModal,
  activityId
}) => {
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();
  const { mutate: createTemplateFn } = useCreateActivityTemplate({
    onSuccess: (options: ICreateTemplateResponse) => {
      const {
        data
      } = options;
      if ((data.result.id ?? '').length > 0) {
        navigate(`/${PATHS.ACTIVITYTEMPLATE.replace(':id', data.result.id)}`);
      }
    }
  });

  const onCancelClick: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false);
    form.resetFields();
  };

  const handleCancel: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false);
  };

  const onFinish: any = (values: any) => {
    createTemplateFn({
      id: activityId,
      data: {
        category: 'COURSES',
        title: values.templateName,
        description: values.description
      }
    });
  };

  useEffect(() => {
    form.setFieldsValue({
      category: 'Courses'
    });
  }, []);

  return (
    <AsnModal
      footer={false}
      open={isOpenCreateActivityModal}
      title="Create activity Template"
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
          <AsnForm.Item>
            <AsnInput value={'Courses'} disabled={true} />
          </AsnForm.Item>
          <AsnForm.Item
            name="templateName"
            rules={[{ required: true, message: 'Please enter Template Name' }, { min: 2, max: 128, message: 'The field is required. Must be between 2 and 128 characters.' }]}
          >
            <AsnInput placeholder="One section course " />
          </AsnForm.Item>
          <AsnForm.Item
            name="description"
            rules={[{ max: 256, message: 'Maximum 256 characters.' }]}
          >
            <AsnTextArea placeholder="Activity Template for long-term courses. The course has one section." />
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
    </AsnModal>
  );
};

export default CreateTemplate;
