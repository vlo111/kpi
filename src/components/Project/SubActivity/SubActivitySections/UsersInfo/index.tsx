import React from 'react';
import { Avatar, Col, Image, Row, Space, Typography } from 'antd';

import { AsnButton } from '../../../../Forms/Button';
import FormWrapper from '../../../../Forms/SubActivityWrapper';

const SubActivityUsersInfo: React.FC = () => {
  const { Title } = Typography;
  return (
    <FormWrapper className="users_list">
      <Title level={4} style={{ marginBottom: '2.4vh' }}>
        Assigned People
      </Title>
      <Space direction="vertical" style={{ width: '100%', height: '100%' }}>
        <Row
          justify="space-between"
          align="middle"
          style={{ borderBottom: '1px solid var(--dark-border-ultramarine)' }}
        >
          <Col span={12}>
            <Avatar
              style={{ width: '100%', display: 'flex', alignItems: 'center' }}
              src={
                <Image
                  preview={false}
                  src="https://joeschmoe.io/api/v1/random"
                  style={{ width: 26, height: 26, borderRadius: '50%' }}
                />
              }
            />
          </Col>
          <Col span={12} style={{ justifyContent: 'end', display: 'flex' }}>
            Sub-Activity manager
          </Col>
        </Row>
        <Row justify="center">
          <AsnButton className="primary" type="primary">
            Manage users
          </AsnButton>
        </Row>
      </Space>
    </FormWrapper>
  );
};

export default SubActivityUsersInfo;
