import React, { useState } from 'react'
import { TreeSelect } from 'antd'

const { SHOW_PARENT } = TreeSelect

const treeData = [
  {
    title: 'All',
    value: '0-1',
    isLeaf: true,
    children: [
      {
        title: 'Done',
        value: '0-1-0'
      },
      {
        title: 'Active',
        value: '0-1-1'
      },
      {
        title: 'Inactive',
        value: '0-1-2'
      }
    ]
  }
]

export const StatusFilter: React.FC = () => {
  const [value, setValue] = useState([])

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const onChange = (newValue: any) => {
    setValue(newValue)
  }

  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    treeDefaultExpandAll: true,
    style: {
      width: '7vw',
      border: 'none'
    }
  }

  return <TreeSelect {...tProps} />
}
