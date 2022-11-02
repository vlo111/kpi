import React from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import { IPanelIsActive } from '../../types/project'
import { AnsCollapseStyle } from '../Forms/AnsCollapse'

export const AnsCollapse: React.FC<{
  id: string
  activeKey?: string
  children: React.ReactNode
}> = ({ id, activeKey, children }) => {
  const getPropsData: any = {
    defaultActiveKey: [id],
    expandIconPosition: 'end',
    expandIcon: ({ isActive }: IPanelIsActive) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0}/>
    )
  }

  return (
        <AnsCollapseStyle key={id} {...getPropsData}>
            {children}
        </AnsCollapseStyle>
  )
}