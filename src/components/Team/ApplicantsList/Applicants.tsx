// import { Avatar, List } from 'antd'
import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import type { ColumnsType } from 'antd/es/table'

const ApplicantList = styled.div`
    margin-top: 8px;
    .ant-table-tbody>tr>td{
        &:last-child{
            border-right: 0.5px solid #EDF0F4;
        }
        &:first-child {
            border-left: 0.5px solid #EDF0F4;
        }
        border-bottom: 0.5px solid #EDF0F4;

        .user_icon{
            display: flex;
            text-align: center;
            align-items: center;

            img{
                width: 30px;
                height: 30px;
                justify-content: center;
                border-radius: 50%;
            }
            p{
                padding: 0;
                margin: 0;
                margin-left: 7px;
                font-weight: 400;
                font-size: 16px;
                color: #2A5578;
            }
        }
    }
`

interface DataType {
  status: string
  name: string
  email: string
  picture: string
  viewLevel: string
  key: string
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name Surname',
    render: item => {
      return (
        <div className='user_icon'>
          <img src={item.picture} />
          <p>{item.name}</p>
        </div>
      )
    }
  },
  {
    title: 'Email',
    dataIndex: 'email'
  },
  {
    title: 'Access level',
    dataIndex: 'viewLevel'
  },
  {
    title: 'User status',
    dataIndex: 'status'
  }
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    status: 'Pending',
    viewLevel: 'Project',
    email: 'tetst@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '2',
    name: 'John Brown2',
    status: 'Pending',
    viewLevel: 'Template',
    email: 'tetstnewformat@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '3',
    name: 'John Brown3',
    status: 'Registered',
    viewLevel: 'Activity',
    email: 'mailname@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '4',
    name: 'John Brown4',
    status: 'Pending',
    viewLevel: 'Sub-activity',
    email: 'analysed@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '5',
    name: 'John Brown5',
    status: 'Registered',
    viewLevel: 'Project',
    email: 'meetk@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  }
]

const ApplicantsList: React.FC<{}> = () => {
  return (
        <ApplicantList>
           <Table columns={columns} dataSource={data} size="middle" />
        </ApplicantList>
  )
}

export default ApplicantsList
