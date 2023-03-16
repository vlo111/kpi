import React, { useState } from 'react';
import { Col, Row, Space, Typography } from 'antd';

import { AsnButton } from '../../../../Forms/Button';
import FormWrapper from '../../SubActivityWrapper';
import AsnAvatar from '../../../../Forms/Avatar';
import { IManagerType } from '../../../../../types/api/activity/subActivity';
import AssignUserModal from './AssignUserModal';
import { useParams } from 'react-router-dom';

const SubActivityUsersInfo: React.FC<IManagerType> = ({
  assignedUsers,
  color,
  requIredDocs
}) => {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);

  const { id: subActivityId } = useParams();
  return (
    <FormWrapper className={requIredDocs ? 'users_reqDoc' : 'users_list'} color={color}>
      <Title level={4} style={{ marginBottom: '2.4vh' }}>
        Assigned People
      </Title>
      <Space direction="vertical" style={ { justifyContent: 'space-between', height: '250px', width: '100%', overflowY: 'auto' } } >
      <Space direction="vertical" size={0} className="users_content">
        {assignedUsers?.map((item) => (
          <Row
            justify="space-between"
            align="middle"
            key={item?.id}
            className="assigned_list_item"
            style={{ borderBottom: '1px solid var(--dark-border-ultramarine)' }}
          >
            <Col
              span={12}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '2px'
              }}
            >
              <AsnAvatar
                letter={`${item?.firstname?.charAt(0)}${item?.lastname?.charAt(
                  0
                )}`}
                src={item?.photo}
              />
              <Title level={4} style={{ marginLeft: '10px' }}>
                {item?.firstname} {item?.lastname}
              </Title>
            </Col>
            <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
              {item?.creator ? 'Sub-Activity manager' : 'Trainer'}
            </Col>
          </Row>
        ))}
      </Space>
      <Row justify="center">
        <AsnButton
          className="primary"
          type="primary"
          onClick={() => setOpen(true)}
        >
          Manage users
        </AsnButton>
      </Row>
      </Space>
      {open && (
        <AssignUserModal
          subActivityId={subActivityId}
          open={open}
          setOpen={setOpen}
        />
      )}
    </FormWrapper>
  );
};

export default SubActivityUsersInfo;
