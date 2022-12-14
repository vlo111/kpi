import React from 'react';
import { Breadcrumb } from 'antd';

const AsnBreadcrumb: React.FC = () => {
  return (
        <Breadcrumb separator={'>'}>
        <Breadcrumb.Item>Ant Design</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="">Component</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item >
          <a href="">General</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Button</Breadcrumb.Item>
      </Breadcrumb>
  );
};

export default AsnBreadcrumb;
