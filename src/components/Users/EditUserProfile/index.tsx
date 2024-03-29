import React, { useState } from 'react';
import { Space, message } from 'antd';
import styled from 'styled-components';

import { AsnInput } from '../../Forms/Input';
import { AsnAlert } from '../../Forms/Alert';
import { AsnModal } from '../../Forms/Modal';
import { AsnButton } from '../../Forms/Button';
import { AsnForm } from '../../Forms/Form';
import { phoneRegExp, VALIDATE_MESSAGES, phoneErrorMesage } from '../../../helpers/constants';
import { IUser } from '../../../types/auth';
import { ICreateTemplate } from '../../../types/project';
import { TVoid } from '../../../types/global';
import useEditUser from '../../../api/UserProfile/useEditUser';
import { useProject } from '../../../hooks/useProject';

const UserModal = styled(AsnModal)`
    padding: 4.3vh 1.3vw 4.5vh 4.3vh !important;
    background: var(--white);
    border-radius: 20px;
    top: 10vh;

    .ant-modal-body{
      max-height: 62.5vh;
      overflow-y: scroll;
      overflow-x: hidden;
      padding-right: 1.8vw;
    }
    .ant-modal-close{
      top: -25px;
      right: -14px;
    }
    .ant-modal-content{
      box-shadow: none !important;
      position: inherit !important;
      padding: 0;
    }
    .ant-modal-title {
      font-size: var(--headline-font-size);
    }
`;

const EditProfile: React.FC<ICreateTemplate> = ({
  isOpenCreateActivityModal,
  setIsOpenCreateActivityModal,
  user
}) => {
  const [error, setError] = useState<string>('');
  const { projectId } = useProject();
  const { mutate: saveChanges, isLoading }: any = useEditUser(
    {
      onSuccess: () => {
        void message.success('successfully saved', 2);
        setIsOpenCreateActivityModal(!isOpenCreateActivityModal);
        if (error.length > 0) {
          setError('');
        };
      },
      onError: ({ response }: any) => { setError(response.data.message); }
    }
  );
  const [form] = AsnForm.useForm();
  const onFinish: TVoid = (values: IUser) => {
    try {
      saveChanges({ userData: values, projectId });
    } catch (error: any) {
      void message.error(error, 2);
    }
  };
  const handleCancel: TVoid = () => {
    setIsOpenCreateActivityModal(false);
    form.resetFields();
    if (error.length > 0) {
      setError('');
    }
  };

  const onCancelClick: TVoid = () => {
    setIsOpenCreateActivityModal(false);
    form.resetFields();
    if (error.length > 0) {
      setError('');
    }
  };

  return (
    <UserModal
      footer={false}
      open={isOpenCreateActivityModal}
      title="User Profile"
      onCancel={handleCancel}
    >
       {(error.length > 0) && <AsnAlert type="error" message={error} />}
        <AsnForm
          validateMessages={VALIDATE_MESSAGES}
          id="create-template-form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <AsnForm.Item
          name='firstName'
          label='First Name'
          initialValue={user?.firstName}
          rules={[{ required: true }, { min: 3, max: 128 }]}
          >
            <AsnInput placeholder="First Name"/>
          </AsnForm.Item>
          <AsnForm.Item
           name='lastName'
           label='Last Name'
           initialValue={user?.lastName}
           rules={[{ required: true }, { min: 3, max: 128 }]}
           >
            <AsnInput placeholder="Last Name" />
          </AsnForm.Item>
          <AsnForm.Item
           name='phone'
           label='Phone'
           initialValue={user?.phone}
           rules={[{ pattern: phoneRegExp, message: phoneErrorMesage }]}
           >
            <AsnInput placeholder='+(374) XXXXXX' />
          </AsnForm.Item>
          <AsnForm.Item
           name='organization'
           label='Organization'
            initialValue={user?.organization}
            rules={[{ min: 2 }]}
          >
            <AsnInput placeholder="Organization" />
          </AsnForm.Item>
          <AsnForm.Item
           name='position'
           label='Position'
           initialValue={user?.position}
           >
            <AsnInput placeholder="Position" />
          </AsnForm.Item>
        <Space style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <AsnButton onClick={onCancelClick} className="default">Cancel</AsnButton>
          <AsnButton className="primary" htmlType="submit" loading={isLoading}>
          Save changes
          </AsnButton>
        </Space>
      </AsnForm>
    </UserModal>
  );
};

export default EditProfile;
