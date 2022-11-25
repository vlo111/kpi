// import React, { useState } from 'react'
// import { TreeSelect } from 'antd'

// const { SHOW_PARENT } = TreeSelect

// const treeData = [

//   {
//     value: 'root',
//     title: 'All',
//     isLeaf: true,
//     children: [
//       {
//         title: 'Done',
//         value: '0-1-0'
//       },
//       {
//         title: 'Active',
//         value: '0-1-1'
//       },
//       {
//         title: 'Inactive',
//         value: '0-1-2'
//       }
//     ]

//   }
// ]

// export const AssingnesFilter: React.FC = () => {
//   const [value, setValue] = useState([])

//   const onChange = (newValue: any): void => {
//     setValue(newValue)
//   }

//   const tProps = {
//     treeData,
//     value,
//     onChange,
//     treeCheckable: true,
//     showCheckedStrategy: SHOW_PARENT,
//     placeholder: 'Search and select',
//     treeDefaultExpandAll: true,
//     style: {
//       width: '7vw'
//     }
//   }

//   return <TreeSelect {...tProps} showSearch />
// }
