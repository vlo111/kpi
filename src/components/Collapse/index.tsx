import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { IPanelIsActive } from '../../types/project';
import { AsnCollapseStyle } from '../Forms/Collapse';

export const AsnCollapse: React.FC<{
  id: string
  activeKey?: string
  children: React.ReactNode
}> = ({ id, activeKey, children }) => {
  const getPropsData: any = {
    defaultActiveKey: [id],
    expandIconPosition: 'end',
    expandIcon: ({ isActive }: IPanelIsActive) => (
      <CaretRightOutlined rotate={isActive ? -90 : 90}/>
    )
  };

  return (
    <AsnCollapseStyle key={id} {...getPropsData}>
      {children}
    </AsnCollapseStyle>
  );
};
