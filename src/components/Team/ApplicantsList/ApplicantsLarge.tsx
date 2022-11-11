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
import { ConfirmModal } from '../../Forms/Modal/ConfirmModal'
import ApplicantPermissionInfoModal from './AppllicantPermissionModal'

const ApplicantList = styled.div`
    margin-top: 8px;
    height: calc(100% - 75px);

    .ant-table-tbody>tr>td{
       padding: 9px 8px !important;
       border-bottom: 0.5px solid var(--light-border);
       
        &:last-child{
            border-right: 0.5px solid var(--light-border);
        }
        &:first-child {
            border-left: 0.5px solid var(--light-border);
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
                font-weight: var(--font-normal);
                font-size: var(--base-font-size);
                color: var(--dark-border-ultramarine);
            }
        }
        .user_role{
          display: flex;
          align-items:center;
          text-align: center;

          &:hover{
            cursor: pointer;
          }

          svg {
            margin-right: 8px;
          }
        }
        h3 {
          font-weight: var(--font-bold);
          font-size: var(--font-size-semismall);
          color: var(--dark-border-ultramarine);
          margin: 0;
        }
        h2 {
          color: var(--dark-2);
          font-size: var(--base-font-size);
          margin: 0;
        }
        .user_status_pending,
        .user_status_resolved {
          padding: 4px 4px;
          font-weight: var(--font-bold);
          font-size: var(--font-size-semismall);
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
          color: var(--secondary-light-orage);
        }
        .user_status_resolved{
          color: var(--secondary-green);
        }
        .users_edit_icons{
          display: flex;
          justify-content: center;
          align-items:center;

          &:hover{
            cursor: pointer;
          }

          svg {
            &:last-child{
              margin-left: 13px;
            }
          }
        }
    }
    .ant-table-thead>tr>th{
      font-weight: var(--font-normal) !important;
      font-size: var(--font-size-small) !important;
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
     font-weight: var(--font-semibold);
     background: var(--white);
     border-radius: 50%;
     border: none;
     background: rgba(0, 0, 0, 0.09);
    }
    .ant-pagination-next,
    .ant-pagination-prev{
      &:hover{
        svg> path{
          fill: var(--dark-1) !important;
        }
      }
    }
    .ant-table-pagination.ant-pagination {
     margin: 3px 0;
    }
`

const ApplicantsList: React.FC<{ }> = () => {
  const [openApplicantDeleteModal, setOpenApplicantDeleteModal] = useState(false)
  const [showModal, setShowModal] = useState('')
  const [openApplicantPermissionModal, setOpenApplicantPermissionModal] = useState(false)
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
         <Preview onClick={() => setOpenApplicantPermissionModal(true)}/>
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
            <EditSvg onClick={() => setShowModal('update')}/>
            <TrashSvg onClick={() => setOpenApplicantDeleteModal(true)}/>
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
               defaultPageSize: 5,
               onChange: pageNum => {
                 setCurrentPage(pageNum)
               },
               current: currentPage
             }
             }
            />
            <AddApplicantModal showModal={showModal} setShowModal={setShowModal}/>
            <ConfirmModal
              styles={{ gap: '80px' }}
              yes="Delete"
              no="Cancel"
              open={openApplicantDeleteModal}
              title="Are you sure you want to delete this user?"
              onCancel={() => setOpenApplicantDeleteModal(!openApplicantDeleteModal)}
              onSubmit={function (): void {
                throw new Error('Function not implemented.')
              } } />
              <ApplicantPermissionInfoModal
                showPermissionModal={openApplicantPermissionModal}
                setShowPermissionModal={setOpenApplicantPermissionModal}
              />
        </ApplicantList>
  )
}

export default ApplicantsList
