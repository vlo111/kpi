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

import { useAuth } from '../../hooks/useAuth';
import { clearLocalStorage } from '../../hooks/useLocalStorage';
import { TVoid } from '../../types/global';
import { IUser } from '../../types/auth';
import { ReactComponent as Notification } from '../../assets/icons/notification.svg';
import { ReactComponent as Setting } from '../../assets/icons/setting.svg';
import { CaretDownOutlined } from '@ant-design/icons';
import ManagerIcon from '../ManagerIcon';

import styled from 'styled-components';
import DropdownMenu from '../Menu/DropdownMenu';

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
        <Button onClick={() => navigate('/user-profile')} type="text">
          Profile
        </Button>
      ),
      key: 0
    },
    {
      label: (
        <Button onClick={() => logout()} type="text">
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
                    <ManagerIcon letter={`${firstName[0]}${lastName[0]}`} color="var(--secondary-light-amber)" />
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
