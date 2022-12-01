import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Typography, Upload, Button } from 'antd';

import useCurrentUser from '../../../api/UserProfile/useCurrentUser';
import { TVoid } from '../../../types/global';
import AsnButton from '../../Forms/Button';
import ManagerIcon from '../../ManagerIcon';
import EditProfile from '../EditUserProfile';
import { CreateTemplateContainer } from '../../Forms/UserProfile';
import { ReactComponent as Edit } from '../../../assets/icons/edit.svg';
import { ReactComponent as UploadUser } from '../../../assets/icons/upload.svg';

const { Title } = Typography;

const UserProfile: React.FC = () => {
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] =
    useState<boolean>(false);
  const { data: user } = useCurrentUser();
  console.log(user);
  const onEditedPublishProject: TVoid = () => {
    setIsOpenCreateActivityModal(true);
  };
  const navigate = useNavigate();
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
        <a onClick={onEditedPublishProject}>
          <Edit style={{ height: '24px', width: '24px' }} />
        </a>
      </Col>
      <Row
        style={{
          marginTop: '9vh',
          paddingLeft: '3.3vw'
        }}
      >
        <Col>
          <Col >
            <Upload>
              <ManagerIcon
                letter="AA"
                color="#F3C262"
                width="120px"
                height="120px"
                marginBottom="8vh"
                fontSize="var(--large-hedline-font-size)"
              />
              <Button icon={<UploadUser />}></Button>
            </Upload>
          </Col>
          <Col style={{ paddingTop: '12vh' }}>
            <AsnButton
              type="primary"
              onClick={() => navigate('/change-password-profile')}
              style={{
                width: 'clamp(13.4rem, 10vw, 21rem)',
                marginBottom: '20vh',
                fontSize: 'var(--headline-font-size)',
                padding: '0'
              }}
            >
              Change Password
            </AsnButton>
          </Col>
        </Col>
        <Col style={{ width: '66%', marginLeft: '-30px' }}>
          <div>
            <Title
              level={5}
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 3rem)',
                color: 'var(--dark-border-ultramarine)',
                fontWeight: 'var(--font-normal)'
              }}
            >
              Anun Azganun
            </Title>
            <EditProfile
              isOpenCreateActivityModal={isOpenCreateActivityModal}
              setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
              user={user}
            />
          </div>
          <Row
            gutter={[100, 10]}
            style={{
              color: 'var(--dark-2)',
              fontSize: 'clamp(1rem, 1.4vw, 9rem)'
            }}
          >
            <div>
              <Col>E-mail:</Col>
              <Col>Phone:</Col>
              <Col>Organization:</Col>
              <Col>Position:</Col>
              <Col>Assign to:</Col>
            </div>
            <div>
              <Col>{user?.firstName}</Col>
              <Col>{user?.phone}</Col>
              <Col>{user?.organization}</Col>
              <Col>{user?.position}</Col>
              <Col>{user?.firstName}</Col>
            </div>
          </Row>
        </Col>
      </Row>
    </CreateTemplateContainer>
  );
};

export default UserProfile;
