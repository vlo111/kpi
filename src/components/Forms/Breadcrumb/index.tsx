import React from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { IBreadcrumb } from '../../../types/global';
import { IOutletContext } from '../../../types/project';
import { ReactComponent as ArrowLeftSvg } from '../../../assets/icons/arrow-left.svg';

const AsnBreadcrumb: React.FC<{ routes: IBreadcrumb[] }> = ({ routes }) => {
  const {
    projectOverview: {
      areaOrder,
      resultAreaTitle
    }, setProjectOverview
  } = useOutletContext<IOutletContext>();

  const navigate = useNavigate();
  const itemRender = (route: IBreadcrumb): React.ReactNode => {
    const last = routes.indexOf(route) === routes.length - 1;
    const first = routes.indexOf(route) === 0;
    const lastIndex = routes.length - 1;

    const handleBackSvg = (): void => {
      navigate(routes[lastIndex - 1].path);
    };
    const handleNavigate = (): void => {
      if (resultAreaTitle === route.breadcrumbName) {
        setProjectOverview({
          activityId: undefined,
          areaOrder
        });
      }
    };

    return last
      ? (
      <span>{route.breadcrumbName}</span>
        )
      : first
        ? (
        <>
          <ArrowLeftSvg onClick={() => handleBackSvg()} style={{ alignSelf: 'center', marginRight: '8px', cursor: 'pointer' }} />
          <Link to={route.path} onClick={() => handleNavigate()}>{route.breadcrumbName}</Link>
        </>
          )
        : (
        <Link to={route.path} onClick={() => handleNavigate()}>{route.breadcrumbName}</Link>
          );
  };

  return (
  <Breadcrumb
    separator={'>'}
    style={{ fontSize: 'var(--base-font-size)', marginBottom: '32px' }}
    routes={routes} itemRender={itemRender}
  />
  );
};

export default AsnBreadcrumb;
