import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Button, Upload, Typography } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { DeleteOutlined } from '@ant-design/icons';

import useCurrentUser from '../../api/UserProfile/useCurrentUser';
import { PATHS } from '../../helpers/constants';
import { TVoid } from '../../types/global';
import { IUploadProps, IUser, IUserUpload } from '../../types/auth';
import AsnAvatar from '../../components/Forms/Avatar';
import { CreateTemplateContainer } from '../../components/Profile';
import { AsnButton } from '../../components/Forms/Button';
import EditProfile from '../../components/Users/EditUserProfile';
import { ReactComponent as UploadUser } from '../../assets/icons/upload.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import useEditUser from '../../api/UserProfile/useEditUser';
import userImageUpload from '../../api/UserProfile/userImageUpload';

const { Title } = Typography;

const UserProfile: React.FC = () => {
  const { data: user }: { data: IUser } = useCurrentUser();
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] =
    useState<boolean>(false);

  const onEditedPublishProject: TVoid = () => {
    setIsOpenCreateActivityModal(true);
  };

  const { mutate: saveChanges } = useEditUser(
    {
      onSuccess: () => {},
      onError: () => {}
    }
  );

  const { mutate: imageUpload } = userImageUpload({
    onSuccess: (options: IUserUpload) => {
      const { data: { result } } = options;
      setPhoto(result[0]);
    }
  });

  useEffect(() => {
    if (photo !== '') {
      saveChanges({ photo });
    }
  }, [photo]);

  const props: IUploadProps = {
    customRequest: (options: { file: string | Blob | RcFile }) => {
      const { file } = options;
      imageUpload(file);
    },
    name: 'photo',
    accept: '.jpg,.png,.heic,.webp',
    showUploadList: false
  };

  const onRemove: TVoid = () => {
    saveChanges({ photo: '' });
    setPhoto('');
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
          <Upload
          {...props}
          >
            <AsnAvatar
              size={128}
              letter={`${user?.firstName?.charAt(0)}${user?.lastName?.charAt(0)}`}
              src={photo.length > 0 ? photo : user.photo}
            />
            {(photo.length < 0 || (user.photo === '' || user.photo === null)) &&
              <Button icon={<UploadUser />}></Button>}
          </Upload>
          {(photo.length > 0 || (user.photo !== '')) &&
            <Button onClick={onRemove} icon={<DeleteOutlined />}></Button>
            }
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
          </Row>
        </Col>
        <Col span={24}>
          {' '}
          <AsnButton
            className="primary"
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
