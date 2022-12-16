import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AsnModal } from '../Forms/Modal';
import { AsnButton } from '../Forms/Button';
import { AsnForm } from '../Forms/Form';
import { AsnInput, AsnTextArea } from '../Forms/Input';
import { ICreateTemplateModal, AddManagerHandle } from '../../types/project';
import { PATHS, VALIDATE_MESSAGES } from '../../helpers/constants';

const CreateTemplateContainer = styled.div`
  .buttonContainer {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;

const CreateTemplate: React.FC<ICreateTemplateModal> = ({
  isOpenCreateActivityModal,
  setIsOpenCreateActivityModal
}) => {
  const [form] = AsnForm.useForm();
  const navigate = useNavigate();

  const onCancelClick: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false);
    form.resetFields();
  };

  const handleCancel: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false);
  };

  const onFinish: any = (values: any) => {
    console.log({ ...values, category: 'Courses' }, 'failed');
    navigate(`/${PATHS.ACTIVITYTEMPLATE}`);
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
          validateMessages={VALIDATE_MESSAGES}
          onFinish={onFinish}
          autoComplete="off"
        >
          <AsnForm.Item>
            <AsnInput value={'Courses'} disabled={true} />
          </AsnForm.Item>
          <AsnForm.Item
            name="templateName"
            rules={[{ required: true }, { min: 3, max: 128 }]}
          >
            <AsnInput placeholder="One section course " />
          </AsnForm.Item>
          <AsnForm.Item
            name="description"
            rules={[{ required: true }, { min: 3, max: 128 }]}
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
