import React, { useState } from 'react';
import { Space, message } from 'antd';
import styled from 'styled-components';
import get from 'lodash/get';

import useEditUser from '../../../api/UserProfile/useEditUser';
import { IUser } from '../../../types/auth';
import { AsnAlert } from '../../Forms/Alert';
import { ICreateTemplate } from '../../../types/project';
import { TVoid } from '../../../types/global';
import { AsnModal } from '../../Forms/Modal';
import AsnButton from '../../Forms/Button';
import AsnForm from '../../Forms/Form';
import AsnInput from '../../Forms/Input';
import { Name } from '../../../helpers/constants';

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
  const { mutate: saveChanges, isLoading }: any = useEditUser(
    {
      onSuccess: () => {
        void message.success('sucess', 2);
        setIsOpenCreateActivityModal(!isOpenCreateActivityModal);
      },
      onError: ({ response }: any) => { setError(response.data.message); }
    }
  );
  const [form] = AsnForm.useForm();
  const onFinish: TVoid = (values: IUser) => {
    try {
      saveChanges({ ...values });
    } catch (error) {
      const errorMessage = get(error, 'error.message', 'Something went wrong!');
      void message.error(errorMessage);
    }
  };
  const handleCancel: TVoid = () => {
    setIsOpenCreateActivityModal(false);
  };

  const onCancelClick: TVoid = () => {
    setIsOpenCreateActivityModal(false);
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
          id="create-template-form"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <AsnForm.Item {...Name('firstName', 'First Name')} initialValue={user?.firstName}>
            <AsnInput placeholder="First Name"/>
          </AsnForm.Item>
          <AsnForm.Item {...Name('lastName', 'Last Name')} initialValue={user?.lastName} >
            <AsnInput placeholder="Last Name" />
          </AsnForm.Item>
          <AsnForm.Item {...Name('phone', 'Phone')} initialValue={user?.phone}>
            <AsnInput placeholder="Phone" />
          </AsnForm.Item>
          <AsnForm.Item {...Name('organization', 'Organization')} initialValue={user?.organization}>
            <AsnInput placeholder="Organization" />
          </AsnForm.Item>
          <AsnForm.Item {...Name('position', 'Position')} initialValue={user?.position}>
            <AsnInput placeholder="Position" />
          </AsnForm.Item>
        <Space style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <AsnButton onClick={onCancelClick}>Cancel</AsnButton>
          <AsnButton type="primary" htmlType="submit" loading={isLoading}>
          Save changes
          </AsnButton>
        </Space>
      </AsnForm>
    </UserModal>
  );
};

export default EditProfile;
