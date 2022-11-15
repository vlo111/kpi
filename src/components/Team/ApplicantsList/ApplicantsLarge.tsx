import React, { useState } from 'react'
import { Space } from 'antd'
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
import { AsnTable } from '../../Forms/Table'

const ApplicantList = styled.div`
    margin-top: 8px;
    height: calc(100% - 75px);
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
          <Space direction='horizontal'>
            <Space align='start'>
              <img style={{ borderRadius: '50%' }} src={item.picture} width={30} height={30} />
            </Space>
            <Space align='end' style={{ color: 'var(--dark-border-ultramarine)' }}>
               {item.name}
            </Space>
          </Space>
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
        <Space direction='horizontal'>
          <Space align='start'>
            <Preview onClick={() => setOpenApplicantPermissionModal(true)}/>
          </Space>
          <Space align='end'>
             <h3>{item}</h3>
          </Space>
        </Space>
        )
      }
    },
    {
      title: 'User status',
      dataIndex: 'status',
      render: item => {
        return (
          <Space
            className={`${item === 'Pending' ? 'user_status_pending' : 'user_status_resolved'}`}
            style={{ width: '100%', justifyContent: 'center' }}
            direction='horizontal'
            >
            <Space align='center'>{item}</Space>
          </Space>
        )
      }
    },
    {
      render: () => {
        return (
          <Space direction='horizontal'>
            <Space align='start' style={{ cursor: 'pointer' }}>
              <EditSvg onClick={() => setShowModal('update')}/>
            </Space>
            <Space align='end' style={{ cursor: 'pointer' }}>
              <TrashSvg onClick={() => setOpenApplicantDeleteModal(true)} />
            </Space>
          </Space>
        )
      }
    }
  ]
  const [currentPage, setCurrentPage] = useState(1)
  return (
        <ApplicantList>
            <AsnTable
             columns={columns}
             dataSource={TeamList()}
             size="middle"
            //  scroll={{ y: 'calc(100vh - 30em)' }}
             pagination={{
               defaultPageSize: 5,
               onChange: pageNum => {
                 setCurrentPage(pageNum)
               },
               current: currentPage
             }
             }
             />
            {showModal === 'del' && <AddApplicantModal setShowModal={setShowModal}/>}
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
