import React, { useState } from 'react';
import { Col, Row, Space, Typography } from 'antd';
import styled from 'styled-components';

import { AsnButton } from '../../../../Forms/Button';
// import FormWrapper from '../../SubActivityWrapper';
import { AsnModal } from '../../../../Forms/Modal';
import AsnAvatar from '../../../../Forms/Avatar';
import { IManagerType } from '../../../../../types/api/activity/subActivity';
import AssignUserModal from './AssignUserModal';
import { useParams } from 'react-router-dom';

const AntModal = styled(AsnModal)`
   max-width: 720px;
   .ant-modal-content {
    padding: 32px;
   }
   .ant-modal-close {
     top: 18px;
     right: 12px
   }
`;

const SubActivityUsersInfo: React.FC<IManagerType> = ({
  assignedUsers,
  openUsersModal,
  setOpenUsersModal
}) => {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);

  const { id: subActivityId } = useParams();

  return (
    <AntModal
      footer={false}
      open={openUsersModal}
      width="50vw"
      onCancel={() => setOpenUsersModal(false) }
      centered
    >
      <Title level={4}
      style={{
        color: 'var(--dark-border-ultramarine)',
        fontWeight: 'var(--font-semibold)',
        marginBottom: '24px'
      }}>
        Assigned People
      </Title>
      <Space direction="vertical" style={{ justifyContent: 'space-between', width: '100%' }} >
        <Space direction="vertical" size={12} style={{ width: '100%', maxHeight: '350px', overflowY: 'auto', padding: '10px' }}>
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
                  marginBottom: '5px'
                }}
              >
                <AsnAvatar
                  letter={`${item?.firstname?.charAt(0)}${item?.lastname?.charAt(
                    0
                  )}`}
                  src={item?.photo}
                />
                <Title level={5}
                  style={{
                    color: 'var(--dark-border-ultramarine)',
                    fontWeight: 'var(--font-semibold)',
                    margin: 0,
                    marginLeft: '10px'
                  }}
                >
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
    </AntModal>
  );
};

export default SubActivityUsersInfo;
