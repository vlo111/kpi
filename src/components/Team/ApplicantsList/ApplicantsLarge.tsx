import React, { useState } from 'react'
import { Table } from 'antd'
import styled from 'styled-components'
import type { ColumnsType } from 'antd/es/table'
import { ReactComponent as Preview } from '../../../assets/icons/eye.svg'
import { ReactComponent as TrashSvg } from '../../../assets/icons/trash.svg'
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg'
import { TemUsersType } from '../../../types/teams'
import { TeamList } from '../../../helpers/fakeData'
import AddApplicantModal from './CreateApplicantsModal'

const ApplicantList = styled.div`
    margin-top: 8px;
    height: calc(100% - 75px);

    .ant-table-tbody>tr>td{
       padding: 9px 8px !important;
       border-bottom: 0.5px solid #EDF0F4;
       
        &:last-child{
            border-right: 0.5px solid #EDF0F4;
        }
        &:first-child {
            border-left: 0.5px solid #EDF0F4;
        }

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
      padding: 14px 8px !important;

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
    .ant-table-pagination-right {
      justify-content: center;
    }
    
    .ant-spin-container {
     position: relative;
     transition: opacity .3s;
     height: 100%;
     display: flex;
     flex-direction: column;
     justify-content: space-between;
    }
    .ant-table-wrapper,
    .ant-spin-nested-loading{
      height: 100%;
    }
    .ant-pagination.ant-pagination-mini .ant-pagination-item {
     min-width: 32px;
     height: 32px;
     margin: 0;
     line-height: 22px;
     align-items: center;
     display: flex;
     justify-content: center;
      a{
        color: rgba(0, 0, 0, 0.87);
      }
    }
    .ant-pagination-item-active {
     font-weight: 500;
     background: #fff;
     border-radius: 50%;
     border: none;
     background: rgba(0, 0, 0, 0.09);
    }
    .ant-pagination-next,
    .ant-pagination-prev{
      &:hover{
        svg> path{
          fill: black !important;
        }
      }
    }
    .ant-table-pagination.ant-pagination {
     margin: 3px 0;
    }
`

const ApplicantsList: React.FC<{ showModal: any, setShowModal: any }> = ({ showModal, setShowModal }) => {
  const columns: ColumnsType<TemUsersType> = [
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
         <Preview />
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
            <EditSvg onClick={() => setShowModal('create')}/>
            <TrashSvg />
          </div>
        )
      }
    }
  ]
  const [currentPage, setCurrentPage] = useState(1)
  return (
        <ApplicantList>
           <Table
             columns={columns}
             dataSource={TeamList()}
             size="middle"
             pagination={{
               defaultPageSize: 3,
               onChange: pageNum => {
                 setCurrentPage(pageNum)
               },
               current: currentPage
             }
             }
            />
            <AddApplicantModal showModal={showModal} setShowModal={setShowModal}/>
        </ApplicantList>
  )
}

export default ApplicantsList
