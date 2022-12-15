import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { IBreadcrumb } from '../../../types/global';
import { ReactComponent as ArrowLeftSvg } from '../../../assets/icons/arrow-left.svg';

const AsnBreadcrumb: React.FC<{ routes: IBreadcrumb[] }> = ({ routes }) => {
  const navigate = useNavigate();
  const itemRender = (route: IBreadcrumb): React.ReactNode => {
    const last = routes.indexOf(route) === routes.length - 1;
    const first = routes.indexOf(route) === 0;
    const lastIndex = routes.length - 1;
    return last
      ? (
        <span>{route.breadcrumbName}</span>
        )
      : first
        ? (
          <>
            <ArrowLeftSvg onClick={() => navigate(routes[lastIndex - 1].path) } style={{ alignSelf: 'center', marginRight: '8px', cursor: 'pointer' }} />
            <Link to={route.path}>{route.breadcrumbName}</Link>
          </>
          )
        : (
          <Link to={route.path}>{route.breadcrumbName}</Link>
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
