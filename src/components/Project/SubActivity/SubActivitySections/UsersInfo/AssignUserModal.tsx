import React, { useState } from 'react';
import { notification, Row, Space } from 'antd';

import {
  EligibleUsersTypes,
  IAssignUserModalTypes
} from '../../../../../types/api/activity/subActivity';
import { AsnButton } from '../../../../Forms/Button';
import { AsnModal } from '../../../../Forms/Modal';
import useGetEligibleUsersListBySubActivityId from '../../../../../api/Activity/SubActivity/useGetEligibleUsersList';
import AsnAvatar from '../../../../Forms/Avatar';
import styled from 'styled-components';
import useAssignUserInCoresById from '../../../../../api/Activity/SubActivity/useAssigneUserCourse';

const AssignModal = styled(AsnModal)`
  .ant-modal-content {
    padding: 48px;
  }

  .ant-modal-header {
    text-align: start;
    padding-bottom: 1vh;

    .ant-modal-title {
      color: var(--dark-border-ultramarine) !important;
    }
  }

  .active {
    background-color: var(--primary-light-1);
  }

  .users_list_content {
    width: 100%;
    box-shadow: 4px 4px 4px rgb(42 85 120 / 20%),
      -4px -4px 4px rgb(42 85 120 / 10%);
    padding: 16px;
    min-height: 226px;
    overflow-y: auto;
    max-height: 226px;
  }

  .ant-row {
    font-size: var(--base-font-size);
    color: var(--dark-2);
    &:hover {
      cursor: pointer;
    }
  }
`;

const AssignUserModal: React.FC<IAssignUserModalTypes> = ({
  open,
  setOpen,
  subActivityId
}) => {
  const [selectUser, setSelectUser] = useState('');

  const { data } = useGetEligibleUsersListBySubActivityId(subActivityId, {
    enabled: Boolean(subActivityId)
  });

  const { mutate: assignUserSubActivityById } = useAssignUserInCoresById({
    onSuccess: () => {
      notification.success({
        bottom: 50,
        placement: 'topRight',
        message: 'The User assigned successfully',
        duration: 3
      });
      setOpen(false);
    }
  });

  const selectItem = (user: EligibleUsersTypes): void => {
    setSelectUser(user.id);
  };

  const assignUser = (): void => {
    assignUserSubActivityById({ subActivityId, userId: selectUser });
  };
  return (
    <AssignModal
      footer={false}
      open={open}
      width={'400px'}
      onCancel={() => setOpen(false)}
      title="Assignees"
    >
      <Space direction="vertical" className="users_list_content">
        {Boolean(data) &&
          data?.map((item) => (
            <Space
              key={item.id}
              onClick={() => selectItem(item)}
              className={selectUser === item.id ? 'active' : undefined}
              style={{ width: '100%', padding: '1px 8px' }}
            >
              <AsnAvatar
                letter={`${item?.firstName.charAt(0)}${item?.lastName?.charAt(
                  0
                )}`}
                src={item?.photo}
              />
              <Row>
                {item.firstName} {item.lastName}
              </Row>
            </Space>
          ))}
      </Space>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '40px'
        }}
      >
        <AsnButton className="default" onClick={() => setOpen(false)}>
          Cancel
        </AsnButton>
        <AsnButton
          className="primary"
          htmlType="submit"
          onClick={() => assignUser()}
          disabled={selectUser.length === 0}
        >
          Save
        </AsnButton>
      </Space>
    </AssignModal>
  );
};

export default AssignUserModal;
