import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Upload, Typography } from 'antd';

import useCurrentUser from '../../../api/UserProfile/useCurrentUser';
import { PATHS } from '../../../helpers/constants';
import { TVoid } from '../../../types/global';
import { IUser } from '../../../types/auth';
import AsnAvatar from '../../Forms/Avatar';
import { CreateTemplateContainer } from '../../Profile';
import { AsnButton } from '../../Forms/Button';
import EditProfile from '../EditUserProfile';
import { ReactComponent as UploadUser } from '../../../assets/icons/upload.svg';
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg';

const { Title } = Typography;
const UserProfile: React.FC = () => {
  const { data: user }: { data: IUser } = useCurrentUser();
  const navigate = useNavigate();
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] =
    useState<boolean>(false);

  const onEditedPublishProject: TVoid = () => {
    setIsOpenCreateActivityModal(true);
  };
  return (
    <CreateTemplateContainer>
      <Col
        style={{
          top: '4vh',
          marginLeft: 'auto',
          padding: '0 4vh',
          display: 'flex',
          justifyContent: 'end'
        }}
      >
        {' '}
        <Button type="link" onClick={onEditedPublishProject}>
          <Edit style={{ height: '24px', width: '24px' }} />
        </Button>
        <EditProfile
          isOpenCreateActivityModal={isOpenCreateActivityModal}
          setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
          user={user}
        />
      </Col>
      <Row gutter={[0, 32]} style={{ padding: '64px 60px' }}>
        <Col md={7} xs={12} span={8}>
          <Upload>
            <AsnAvatar
              letter={`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(
                0
              )}`}
              size={128}
            />
            <Button icon={<UploadUser />}></Button>
          </Upload>
        </Col>
        <Col md={12} xs={24}>
          <Title
            level={5}
            style={{
              fontSize: 'clamp(1rem, 2.2vw, 3rem)',
              color: 'var(--dark-border-ultramarine)',
              fontWeight: 'var(--font-normal)'
            }}
          >
            {user?.firstName} {user?.lastName}
          </Title>
          <Row
            style={{ color: 'var(--dark-2)', fontSize: '20px', gap: '0 30px' }}
          >
            <Col span={10}>E-mail:</Col>
            <Col span={10}>{user?.email}</Col>
            <Col span={10}>Phone:</Col>
            <Col span={10}>{user?.phone}</Col>
            <Col span={10}>Organization:</Col>
            <Col span={10}>{user?.organization}</Col>
            <Col span={10}>Position:</Col>
            <Col span={10}>{user?.position}</Col>
            {/* <Col span={10}>Assign to:</Col>
            <Col span={10}>Project</Col> */}
          </Row>
        </Col>
        <Col span={24}>
          {' '}
          <AsnButton
            type="primary"
            onClick={() => navigate(`/${PATHS.CHANGEPASSWORD}`)}
            style={{
              width: 'clamp(13.4rem, 10vw, 21rem)',
              marginBottom: '1vh',
              fontSize: 'var(--headline-font-size)',
              padding: '0'
            }}
          >
            Change Password
          </AsnButton>
        </Col>
      </Row>
    </CreateTemplateContainer>
  );
};

export default UserProfile;
