import React from 'react';
import styled from 'styled-components';
import { Breadcrumb, Col, Row } from 'antd';

import { AsnModal } from '../../Forms/Modal';
import { ShowPermissionModalTypes } from '../../../types/teams';
import useGetSingleUserPermissions from '../../../api/Teams/useGetSingleUserPermissons';
import { useProject } from '../../../hooks/useProject';

const PermissionInfoModal = styled(AsnModal)`
  width: 628px !important;
  top: 190px !important;

  .ant-modal-content {
    padding: 32px !important;
  }
  .ant-modal-close-x {
    font-size: 12px;
    svg {
      path {
        fill: var(--dark-1);
      }
    }
  }
`;

const TeamMemberPermissionInfoModal: React.FC<ShowPermissionModalTypes> = ({
  userId,
  setUserId
}) => {
  const { projectId } = useProject();
  const { data } = useGetSingleUserPermissions(userId, projectId, {
    enabled: Boolean(userId) && Boolean(projectId)
  });

  return (
    <PermissionInfoModal
      open={Boolean(userId)}
      footer={false}
      mask={false}
      onCancel={() => setUserId('')}
    >
      <Row gutter={24}>
        <Col span={24} style={{ marginBottom: '24px' }}>
          {Boolean(data) &&
            data.map((item, index) => (
              <Breadcrumb
                key={index}
                separator=">"
                style={{
                  color: 'var(--dark-2)',
                  fontSize: 'var(--base-font-size)'
                }}
              >
                {Boolean(item?.project) && <Breadcrumb.Item>{item?.project}</Breadcrumb.Item>}
                {Boolean(item?.resultArea) && <Breadcrumb.Item>{item?.resultArea}</Breadcrumb.Item>}
                {Boolean(item?.inputActivity) && <Breadcrumb.Item>{item?.inputActivity}</Breadcrumb.Item>}
                {Boolean(item?.activityTemplate) && <Breadcrumb.Item>{item?.activityTemplate}</Breadcrumb.Item>}
              </Breadcrumb>
            ))}
        </Col>
      </Row>
    </PermissionInfoModal>
  );
};

export default TeamMemberPermissionInfoModal;
