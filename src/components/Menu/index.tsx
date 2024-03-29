import React, { useEffect, useState } from 'react';
import { Layout, Menu as AntMenu } from 'antd';
import { ReactComponent as DashboardSvg } from '../../assets/icons/dashboard.svg';
import { ReactComponent as ProjectSvg } from '../../assets/icons/project.svg';
import { ReactComponent as TeamSvg } from '../../assets/icons/team.svg';
import { ReactComponent as ApplicantsSvg } from '../../assets/icons/aplicants.svg';
import { ReactComponent as ProductGuideSvg } from '../../assets/icons/product-guide.svg';
import { ReactComponent as SubActivitiesListSvg } from '../../assets/icons/sub-activities.svg';
import { ReactComponent as ShortcutsSvg } from '../../assets/icons/shortcuts.svg';
import { ReactComponent as LogoSvg } from '../../assets/icons/menu-logo.svg';
import { ReactComponent as FolderSvg } from '../../assets/icons/folder.svg';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuItems, menuItemsNavigate, PATHS } from '../../helpers/constants';
import { MenuInfo } from 'rc-menu/lib/interface';
import { useProject } from '../../hooks/useProject';

const MenuLayout = styled(Layout)`
  height: 100vh;
  background: var(--white);
  box-shadow: var(--manu-box-shadow);
  max-width: 250px;

  .ant-menu {
    border-right: 1px solid var(--white) !important;
    display: flex;
    flex-direction: column;
    margin-top: 2.3rem;
    height: 100%;

    &-title-content {
      margin-left: 0;
    }

    &-item {
      margin-bottom: 0 !important;

      &:active {
        background: none;
      }

      &-icon {
        min-width: 18px;
      }
    }

    &-item:not(:last-child):not(:nth-last-child(2)) {
      height: 70px;
      display: flex;
      align-items: center;
      cursor: pointer;
      gap: 14px;
      color: var(--dark-border-ultramarine);

      &:hover {
        background: var(--primary-light-3);
      }
    }

    &-item-selected:not(:last-child):not(:nth-last-child(2)) {
      background: var(--primary-light-1) !important;

      &:after {
        border-right: 3px solid var(--dark-border-ultramarine);
      }
    }

    &-item:nth-last-child(1),
    &-item:nth-last-child(2) {
      &:after {
        border: none;
      }

      span {
        color: var(--dark-border-ultramarine);
        font-size: var(--font-size-semismall);
      }
    }

    &-item:nth-last-child(1) {
      margin-bottom: 2rem !important;
    }

    &-item:nth-last-child(2) {
      margin-top: auto;
    }
  }
`;

const Header = styled(MenuLayout.Header)`
  background: var(--white);
  margin: 0 auto;
  padding: 12px 0 0;
  cursor: pointer;
`;

export const Menu: React.FC = () => {
  const navigate = useNavigate();

  const { projectId } = useProject();

  const { pathname } = useLocation();

  const [currentItem, setCurrentItem] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    let currenPath = [`${menuItemsNavigate.indexOf(pathname.includes('project') ? menuItemsNavigate[0] : pathname) + 1}`];
    if (pathname.includes('files')) {
      currenPath = ['5'];
    }
    if (pathname.includes('sub-activities')) {
      currenPath = ['2'];
    }
    if (pathname.includes('dashboard')) {
      currenPath = ['6'];
    }
    setCurrentItem(currenPath ?? ['1']);
  }, [pathname]);

  const onNavigateHandle: (ev: MenuInfo) => void = (ev) => {
    menuItemsNavigate.forEach((item, i) => {
      if (+ev.key === i + 1) {
        if (projectId !== null && item === menuItemsNavigate[5]) {
          navigate(`${PATHS.DASHBOARD}`.replace(':id', projectId));
        }
        if (projectId !== null && item === menuItemsNavigate[0]) {
          navigate(`/project/${PATHS.OVERVIEW}`.replace(':id', projectId));
        }
        if (projectId !== null && item === menuItemsNavigate[4]) {
          navigate(`/project/${PATHS.FILES}`.replace(':id', projectId));
        }
        if (projectId !== null && item === menuItemsNavigate[1]) {
          navigate(`/sub-activities/${PATHS.SUBACTIVITIES}`.replace(':id', projectId));
        }
        if (projectId !== null && item === menuItemsNavigate[2]) {
          navigate(`${PATHS.TEAMS}`.replace(':id', projectId));
        }
        if (projectId !== null && item === menuItemsNavigate[3]) {
          navigate(`${PATHS.APPLICANTS}`.replace(':id', projectId));
        }
        if (projectId !== null && item === menuItemsNavigate[6]) {
          navigate(`${PATHS.ROOT}`.replace(':id', projectId));
        }
      }
    });
  };

  return (
    <MenuLayout>
      <Header onClick={() => navigate(`/project/${PATHS.OVERVIEW}`.replace(':id', projectId))}>
        <LogoSvg />
      </Header>
      <AntMenu
        mode="inline"
        inlineIndent={45}
        onClick={onNavigateHandle}
        selectedKeys={currentItem}
        items={[
          ProjectSvg,
          SubActivitiesListSvg,
          TeamSvg,
          ApplicantsSvg,
          FolderSvg,
          DashboardSvg,
          ProductGuideSvg,
          ShortcutsSvg
        ].map((icon, index) => ({
          key: String(index + 1),
          icon: React.createElement(icon),
          label: MenuItems[index]
        }))}
      />
    </MenuLayout>
  );
};
