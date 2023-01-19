import React from 'react';
import { Col, Row, Space, Typography } from 'antd';

import { AsnButton } from '../../../../Forms/Button';
import FormWrapper from '../../SubActivityWrapper';
import AsnAvatar from '../../../../Forms/Avatar';
import { IManagerType } from '../../../../../types/api/activity/subActivity';

const SubActivityUsersInfo: React.FC<IManagerType> = ({ manager, color }) => {
  const { Title } = Typography;
  return (
    <FormWrapper className="users_list" color={color}>
      <Title level={4} style={{ marginBottom: '2.4vh' }}>
        Assigned People
      </Title>
      <Space direction="vertical" style={{ width: '100%', height: '100%' }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ borderBottom: '1px solid var(--dark-border-ultramarine)' }}
        >
          <Col span={12} style={{ display: 'flex', alignItems: 'center', marginBottom: '2px' }}>
             <AsnAvatar letter={`${manager?.firstName?.charAt(0)}${manager?.lastName?.charAt(0)}`} />
             <Title level={4} style={{ marginLeft: '10px' }}>
              {manager?.firstName} {manager?.lastName}
             </Title>
          </Col>
          <Col span={12} style={{ justifyContent: 'end', display: 'flex' }}>
            Sub-Activity manager
          </Col>
        </Row>
        <Row justify="center">
          <AsnButton className="primary" type="primary" disabled>
            Manage users
          </AsnButton>
        </Row>
      </Space>
    </FormWrapper>
  );
};

export default SubActivityUsersInfo;