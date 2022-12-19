import React from 'react';
import {
  Col,
  Layout,
  Row,
  Button,
  Dropdown,
  Space,
  Divider
} from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import AsnAvatar from '../Forms/Avatar';
import DropdownMenu from '../Menu/DropdownMenu';
import { TVoid } from '../../types/global';
import { IUser } from '../../types/auth';
import { PATHS } from '../../helpers/constants';
import { clearLocalStorage } from '../../hooks/useLocalStorage';
import { useAuth } from '../../hooks/useAuth';
import { CaretDownOutlined } from '@ant-design/icons';
import { ReactComponent as Notification } from '../../assets/icons/notification.svg';
import { ReactComponent as Setting } from '../../assets/icons/setting.svg';

const HeaderLayout = styled(Layout)`
  background: var(--white);
  box-shadow: var(--header-box-shadow);
  z-index: 1;
  max-height: 60px;
  min-height: 60px;
  .ant-divider-horizontal{
    display: none;
  }
  .ant-row-middle{
    height: 60px;
    grid-gap: 22px;
    padding: 0 50px;
  }
  .ant-btn{
    height: auto;
    padding: 0;
  }
`;

export const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { firstName, lastName }: IUser = user;
  const logout: TVoid = () => {
    clearLocalStorage();
    window.location.reload();
  };
  const data = [
    {
      label: (
        <Button onClick={() => navigate(`/${PATHS.USERPROFILE}`)} type="text" style={{ width: '100%', display: 'flex', background: 'inherit' }}>
          Profile
        </Button>
      ),
      key: 0
    },
    {
      label: (
        <Button onClick={() => logout()} type="text" style={{ width: '100%', display: 'flex', background: 'inherit' }}>
          Sign Out
        </Button>
      ),
      key: 1
    }
    // {
    //   label: (
    //     <Button onClick={() => navigate('/profile_pages')} type="text">
    //       Profile Pages
    //     </Button>
    //   ),
    //   key: 2
    // }
  ];
  const newMenu = <DropdownMenu items={data} />;
  return (
    <HeaderLayout>
          <Row justify="end" align="middle">
            <Col> <Notification /></Col>
            <Col><Setting/></Col>
            <Col>
              <Dropdown overlay={newMenu} trigger={['click']}>
                <Button type="text" onClick={(e) => e.preventDefault()}>
                  <Space>
                    <AsnAvatar letter={`${firstName?.charAt(0)}${lastName?.charAt(0)}`} src={user.photo} />
                   {firstName}{lastName}
                    <CaretDownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Col>
          </Row>
          <Divider />
    </HeaderLayout>
  );
};
