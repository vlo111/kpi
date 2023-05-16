import { Avatar, Tooltip } from 'antd';
import React from 'react';
import AsnAvatar from '../../Forms/Avatar';
import {
  IAssignees,
  IAssigneesProps
} from '../../../types/api/subActivityTable';

const AvatarComponent: React.FC<IAssigneesProps> = ({ record }) => {
  return (
    <Avatar.Group maxCount={4}>
      {record?.map((i: IAssignees) => {
        return (
          <Tooltip
            key={i?.id}
            placement="top"
            title={`${i?.firstName} ${i?.lastName}`}
          >
            <AsnAvatar
              letter={`${i?.firstName?.charAt(0)}${i?.lastName?.charAt(0)}`}
              src={i.photo}
            />
          </Tooltip>
        );
      })}
    </Avatar.Group>
  );
};

export default AvatarComponent;
