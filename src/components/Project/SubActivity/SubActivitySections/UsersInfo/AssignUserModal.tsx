import React from 'react';
import { Space } from 'antd';

import { IAssignUserModalTypes } from '../../../../../types/api/activity/subActivity';
import { AsnButton } from '../../../../Forms/Button';
import { AsnModal } from '../../../../Forms/Modal';
import useGetEligibleUsersListBySubActivityId from '../../../../../api/Activity/SubActivity/useGetEligibleUsersList';

const AssignUserModal: React.FC<IAssignUserModalTypes> = ({ open, setOpen, subActivityId }) => {
  const { data } = useGetEligibleUsersListBySubActivityId(subActivityId, { enabled: Boolean(subActivityId) });
  console.log(data);
  return (
      <AsnModal open={open} onCancel={() => setOpen(false)} title='Assignee User'>
        <Space direction='vertical'>
        {Boolean(data) && data.map((item) => (
         <Space key={item.id}>
           <p>{item.firstName} {item.lastName}</p>
         </Space>
        ))}
        </Space>
        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          <AsnButton className="default" onClick={() => setOpen(false)}>Cancel</AsnButton>
          <AsnButton className="primary" htmlType="submit">
            Add
          </AsnButton>
        </Space>
      </AsnModal>
  );
};

export default AssignUserModal;
