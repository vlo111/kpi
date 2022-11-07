import React from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import type { ColumnsType } from 'antd/es/table'
import { ReactComponent as Eyeview } from '../../../assets/icons/eye.svg'
import { ReactComponent as TrashSvg } from '../../../assets/icons/trash.svg'
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg'

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
        .user_role{
          display: flex;
          align-items:center;
          text-align: center;

          svg {
            margin-right: 8px;
          }
        }
        h3 {
          font-weight: 700;
          font-size: 14px;
          color: #2A5578;
          margin: 0;
        }
        h2 {
          color: #263238;
          font-size: 16px;
          margin: 0;
        }
        .user_status_pending,
        .user_status_resolved {
          padding: 4px 4px;
          font-weight: 700;
          font-size: 14px;
          background: rgba(104, 163, 149, 0.2);
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items:  center;
          text-align: center;
          margin: 0;
          max-width: 107px;
        }
        .user_status_pending {
          background: rgba(246, 151, 109, 0.2) !important;
          color: #F6976D;
        }
        .users_edit_icons{
          display: flex;
          justify-content: center;
          align-items:center;

          svg {
            &:last-child{
              margin-left: 13px;
            }
          }
        }
    }
    .ant-table-thead>tr>th{
      font-weight: 400 !important;
      font-size: 12px !important;
      background: var(--background) !important;
      color: var(--dark-4);
      border-top: 0.5px solid #EBEBEB;

      &::before{
        content: none !important;
      }
      &:last-child{
        border-right: 0.5px solid #EBEBEB;
      }
      &:first-child{
        border-left: 0.5px solid #EBEBEB;
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
    dataIndex: 'email',
    render: item => {
      return <h2>{item}</h2>
    }
  },
  {
    title: 'Access level',
    dataIndex: 'viewLevel',
    render: item => {
      return (
      <div className='user_role'>
       <Eyeview />
       <h3>{item}</h3>
      </div>
      )
    }
  },
  {
    title: 'User status',
    dataIndex: 'status',
    render: item => {
      return (
        <p className={`${item === 'Pending' ? 'user_status_pending' : 'user_status_resolved'}`}>{item}</p>
      )
    }
  },
  {
    render: () => {
      return (
        <div className='users_edit_icons'>
          <EditSvg />
          <TrashSvg />
        </div>
      )
    }
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
