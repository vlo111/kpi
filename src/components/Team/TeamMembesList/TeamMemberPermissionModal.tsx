import React from 'react';
import { Breadcrumb, Col, Row } from 'antd';

import { ShowPermissionModalTypes } from '../../../types/teams';
import useGetSingleUserPermissions from '../../../api/Teams/useGetSingleUserPermissions';
import { useProject } from '../../../hooks/useProject';
import { PermissionInfoModal } from '../Styles';

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
